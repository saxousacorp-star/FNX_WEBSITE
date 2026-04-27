/**
 * `assets/logoaba.svg` é só fonte para o favicon (aba em desktop e mobile).
 * Gera ICO + PNG + SVG que os browsers reconhecem (muitos ignoram só SVG ou redirects).
 * Executar: npm run favicon
 */
import { copyFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const src = join(root, "assets/logoaba.svg");
const svgOut = join(root, "app/icon.svg");
const pngOut = join(root, "app/icon.png");
const icoOut = join(root, "app/favicon.ico");

const bg = { r: 245, g: 245, b: 247, alpha: 1 };

copyFileSync(src, svgOut);

await sharp(src)
  .resize(32, 32, { fit: "contain", background: bg })
  .png()
  .toFile(pngOut);

const sizes = [16, 32, 48];
const buffers = await Promise.all(
  sizes.map((s) =>
    sharp(src)
      .resize(s, s, { fit: "contain", background: bg })
      .png()
      .toBuffer(),
  ),
);
const ico = await pngToIco(buffers);
writeFileSync(icoOut, ico);

console.log("Favicon: assets/logoaba.svg → favicon.ico, icon.png, icon.svg");
