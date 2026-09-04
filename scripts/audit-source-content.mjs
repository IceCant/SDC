import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { catalog } from "../src/catalog.js";

const sourceOrigin = "https://sdchotelsupply.com";
const categorySourcePaths = [
  "/en/product/home-product",
  "/en/product/hotel-s-products/luxury-pillow",
  "/en/product/hotel-s-products/7-sdc-item",
  "/en/product/hotel-s-products/mattresses",
  "/en/product/hotel-s-products/bathroom-amenities-dispenser",
  "/en/product/hotel-s-products/bedding-linen",
  "/en/product/hotel-s-products/towel",
  "/en/product/hotel-s-products/bed-divan",
  "/en/product/hotel-s-products/room-s-accessories",
  "/en/product/hotel-s-products/filling-insert",
  "/en/product/hotel-s-products/hotel-s-appliances",
  "/en/product/hotel-s-products/bed-decoration",
  "/en/product/hotel-s-products/housekeeping-cart",
];

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function htmlToLines(markup) {
  return markup
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(?:p|li|ul|ol|h\d)>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => decodeHtml(line).replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .filter((line, index, lines) => line !== lines[index - 1]);
}

function absoluteUrl(path) {
  return new URL(path, sourceOrigin).href;
}

function normalizeProductName(value) {
  return decodeHtml(value).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, " ").trim();
}

function extractProductSource(html, product, sourceSlug) {
  const galleryMarkup = html.match(/<div class="product-img-box[^>]*>([\s\S]*?)<div class="room-thumbs/i)?.[1] ?? "";
  const discoveredGallery = [...galleryMarkup.matchAll(/data-fancybox="images"\s+href="([^"]+)"/gi)]
    .map((match) => absoluteUrl(match[1]));
  const priceMatch = html.match(/Price\s*:\s*\$?\s*<\/span>\s*<p>\s*([^<]*)<\/p>/i);
  const contentMatch = html.match(/<div class="addReadMore[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i);

  return {
    slug: product.slug,
    sourceUrl: absoluteUrl(`/en/product_view/${sourceSlug}`),
    price: priceMatch ? `$${decodeHtml(priceMatch[1]).trim()}` : null,
    lines: contentMatch ? htmlToLines(contentMatch[1]) : [],
    gallery: discoveredGallery.length > 100 ? [] : discoveredGallery,
  };
}

async function fetchSource(path) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(absoluteUrl(path));
      if (!response.ok) throw new Error(`Could not load ${path}: ${response.status}`);
      return response.text();
    } catch (error) {
      if (attempt === 2) throw error;
      await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
    }
  }
  throw new Error(`Could not load ${path}`);
}

async function getProductSourceSlugs() {
  const pages = await Promise.all(categorySourcePaths.map(fetchSource));
  const sourceSlugs = new Map();
  for (const html of pages) {
    for (const match of html.matchAll(/href="[^"]*\/product_view\/([^"/?]+)"[^>]*>([^<]+)<\/a>/gi)) {
      sourceSlugs.set(normalizeProductName(match[2]), match[1]);
    }
  }
  return sourceSlugs;
}

async function main() {
  const productSourceSlugs = await getProductSourceSlugs();
  const products = [];
  const batchSize = 5;
  for (let index = 0; index < catalog.length; index += batchSize) {
    const batch = catalog.slice(index, index + batchSize);
    const batchProducts = await Promise.all(batch.map(async (product) => {
      const sourceSlug = productSourceSlugs.get(normalizeProductName(product.name)) ?? product.slug;
      const html = await fetchSource(`/en/product_view/${sourceSlug}`);
      return extractProductSource(html, product, sourceSlug);
    }));
    products.push(...batchProducts);
    console.log(`Audited ${Math.min(index + batch.length, catalog.length)} of ${catalog.length} products`);
  }

  const homeHtml = await fetchSource("/en");
  const clients = [...homeHtml.matchAll(/src="([^"]*\/files\/clients\/[^"]+)"/gi)]
    .map((match) => absoluteUrl(match[1]));
  const destination = new URL("../src/source-content.json", import.meta.url);
  const appDestination = new URL("../src/source-content-app.json", import.meta.url);
  await writeFile(destination, `${JSON.stringify({ products, clients }, null, 2)}\n`);
  const appContent = {
    clientCount: clients.length,
    products: products.map(({ slug, price, lines, gallery }) => ({ slug, price, lines, galleryCount: gallery.length })),
  };
  await writeFile(appDestination, `${JSON.stringify(appContent, null, 2)}\n`);
  console.log(`Saved ${products.length} products and ${clients.length} client logos to ${fileURLToPath(destination)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
