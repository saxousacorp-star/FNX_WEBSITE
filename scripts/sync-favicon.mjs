/**
 * `assets/logoaba.svg` é só fonte para o favicon (aba em desktop e mobile).
 * Não servir esse ficheiro em páginas — só estes outputs entram no site.
 * Executar após alterar o logo: npm run favicon
 */
import { copyFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const src = join(root, "assets/logoaba.svg");
const svgOut = join(root, "app/icon.svg");
const pngOut = join(root, "app/icon.png");

copyFileSync(src, svgOut);
await sharp(src)
  .resize(32, 32, {
    fit: "contain",
    background: { r: 245, g: 245, b: 247, alpha: 1 },
  })
  .png()
  .toFile(pngOut);

console.log("Favicon: assets/logoaba.svg → app/icon.svg + app/icon.png");
