import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  catalog,
  catalogCategories,
  customLogoProjects,
  destinations,
  eventArchive,
} from "../src/catalog.js";

const sourceOrigin = "https://sdchotelsupply.com";
const categorySourcePaths = {
  "home-product": "/en/product/home-product",
  "luxury-pillow": "/en/product/hotel-s-products/luxury-pillow",
  "sdc-signature": "/en/product/hotel-s-products/7-sdc-item",
  mattresses: "/en/product/hotel-s-products/mattresses",
  "bathroom-amenities": "/en/product/hotel-s-products/bathroom-amenities-dispenser",
  "bedding-linen": "/en/product/hotel-s-products/bedding-linen",
  towels: "/en/product/hotel-s-products/towel",
  "bed-divan": "/en/product/hotel-s-products/bed-divan",
  "room-accessories": "/en/product/hotel-s-products/room-s-accessories",
  "filling-insert": "/en/product/hotel-s-products/filling-insert",
  "hotel-appliances": "/en/product/hotel-s-products/hotel-s-appliances",
  "bed-decoration": "/en/product/hotel-s-products/bed-decoration",
  "housekeeping-cart": "/en/product/hotel-s-products/housekeeping-cart",
};

function extractSourceImages(html, folder) {
  return [...html.matchAll(new RegExp(`src=["']([^"']*\\/files\\/${folder}\\/[^"']+)["']`, "gi"))]
    .map((match) => new URL(match[1], sourceOrigin).href);
}

async function fetchText(path) {
  const response = await fetch(new URL(path, sourceOrigin));
  if (!response.ok) throw new Error(`Could not load ${path}: ${response.status}`);
  return response.text();
}

async function saveAsJpeg(sourceUrl, outputPath, temporaryDirectory) {
  const response = await fetch(sourceUrl);
  if (!response.ok) throw new Error(`Could not download ${sourceUrl}: ${response.status}`);

  const rawPath = join(temporaryDirectory, `source-${crypto.randomUUID()}`);
  await writeFile(rawPath, Buffer.from(await response.arrayBuffer()));
  const resolvedOutputPath = outputPath instanceof URL ? fileURLToPath(outputPath) : outputPath;
  const conversion = spawnSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "82", "-Z", "1600", rawPath, "--out", resolvedOutputPath], { encoding: "utf8" });
  if (conversion.status !== 0) throw new Error(`Could not convert ${sourceUrl}: ${conversion.stderr || conversion.stdout}`);
}

async function main() {
  const productDirectory = new URL("../public/assets/products/", import.meta.url);
  const eventDirectory = new URL("../public/assets/events/", import.meta.url);
  const customDirectory = new URL("../public/assets/custom-projects/", import.meta.url);
  const destinationDirectory = new URL("../public/assets/destinations/", import.meta.url);
  const temporaryDirectory = await mkdtemp(join(tmpdir(), "sdc-original-media-"));

  await mkdir(productDirectory, { recursive: true });
  await mkdir(eventDirectory, { recursive: true });
  await mkdir(customDirectory, { recursive: true });
  await mkdir(destinationDirectory, { recursive: true });

  try {
    for (const category of catalogCategories) {
      const sourcePath = categorySourcePaths[category.slug];
      if (!sourcePath) throw new Error(`No source page configured for ${category.slug}`);

      const html = await fetchText(sourcePath);
      const sourceImages = extractSourceImages(html, "products");
      const products = catalog.filter((product) => product.groupSlug === category.slug);
      if (sourceImages.length !== products.length) {
        throw new Error(`${category.name}: expected ${products.length} images, found ${sourceImages.length}`);
      }

      for (const [index, product] of products.entries()) {
        await saveAsJpeg(sourceImages[index], new URL(`${product.id}.jpg`, productDirectory), temporaryDirectory);
      }
      console.log(`Saved ${products.length} original thumbnails for ${category.name}`);
    }

    const eventHtml = await fetchText("/en/event");
    const eventImages = extractSourceImages(eventHtml, "events");
    if (eventImages.length !== eventArchive.length) {
      throw new Error(`Events: expected ${eventArchive.length} images, found ${eventImages.length}`);
    }

    for (const [index, sourceUrl] of eventImages.entries()) {
      await saveAsJpeg(sourceUrl, new URL(`event-${String(index + 1).padStart(2, "0")}.jpg`, eventDirectory), temporaryDirectory);
    }
    console.log(`Saved ${eventImages.length} original event thumbnails`);

    const visualDirectories = [
      {
        label: "custom-logo project",
        sourcePath: "/en/product/customize-hotel-s-logo",
        items: customLogoProjects,
        directory: customDirectory,
        filePrefix: "custom",
      },
      {
        label: "destination",
        sourcePath: "/en/product/cambodia-tourist-destination",
        items: destinations,
        directory: destinationDirectory,
        filePrefix: "destination",
      },
    ];

    for (const visualDirectory of visualDirectories) {
      const html = await fetchText(visualDirectory.sourcePath);
      const sourceImages = extractSourceImages(html, "products");
      if (sourceImages.length !== visualDirectory.items.length) {
        throw new Error(`${visualDirectory.label}: expected ${visualDirectory.items.length} images, found ${sourceImages.length}`);
      }

      for (const [index, sourceUrl] of sourceImages.entries()) {
        const fileNumber = String(index + 1).padStart(2, "0");
        await saveAsJpeg(sourceUrl, new URL(`${visualDirectory.filePrefix}-${fileNumber}.jpg`, visualDirectory.directory), temporaryDirectory);
      }
      console.log(`Saved ${sourceImages.length} original ${visualDirectory.label} thumbnails`);
    }
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
