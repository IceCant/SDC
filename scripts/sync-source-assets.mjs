import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const sourceDataPath = new URL("../src/source-content.json", import.meta.url);
const galleryDirectory = new URL("../public/assets/product-galleries/", import.meta.url);
const clientDirectory = new URL("../public/assets/clients/", import.meta.url);

function convertToJpeg(sourcePath, outputPath, longestEdge, quality) {
  const conversion = spawnSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", quality, "-Z", longestEdge, sourcePath, "--out", outputPath], { encoding: "utf8" });
  if (conversion.status !== 0) throw new Error(`Could not convert image: ${conversion.stderr || conversion.stdout}`);
}

async function saveImage(sourceUrl, imagePath, thumbnailPath, temporaryDirectory) {
  const response = await fetch(sourceUrl);
  if (!response.ok) throw new Error(`Could not download ${sourceUrl}: ${response.status}`);

  const rawPath = join(temporaryDirectory, crypto.randomUUID());
  await writeFile(rawPath, Buffer.from(await response.arrayBuffer()));
  convertToJpeg(rawPath, imagePath, thumbnailPath ? "1280" : "480", thumbnailPath ? "76" : "72");
  if (thumbnailPath) convertToJpeg(rawPath, thumbnailPath, "360", "68");
}

async function assetExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const sourceContent = JSON.parse(await readFile(sourceDataPath, "utf8"));
  const temporaryDirectory = await mkdtemp(join(tmpdir(), "sdc-source-assets-"));
  await mkdir(galleryDirectory, { recursive: true });
  await mkdir(clientDirectory, { recursive: true });

  try {
    const galleryItems = sourceContent.products.flatMap((product) => product.gallery.map((sourceUrl, index) => ({
      sourceUrl,
      imagePath: fileURLToPath(new URL(`${product.slug}-${String(index + 1).padStart(2, "0")}.jpg`, galleryDirectory)),
      thumbnailPath: fileURLToPath(new URL(`${product.slug}-${String(index + 1).padStart(2, "0")}-360.jpg`, galleryDirectory)),
    })));
    const items = [
      ...galleryItems,
      ...sourceContent.clients.map((sourceUrl, index) => ({
        sourceUrl,
        imagePath: fileURLToPath(new URL(`client-${String(index + 1).padStart(3, "0")}.jpg`, clientDirectory)),
        thumbnailPath: null,
      })),
    ];

    for (const [index, item] of items.entries()) {
      const mainImageExists = await assetExists(item.imagePath);
      const thumbnailExists = !item.thumbnailPath || await assetExists(item.thumbnailPath);
      if (mainImageExists && thumbnailExists) continue;
      await saveImage(item.sourceUrl, item.imagePath, item.thumbnailPath, temporaryDirectory);
      console.log(`Synced ${index + 1} of ${items.length}`);
    }
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
