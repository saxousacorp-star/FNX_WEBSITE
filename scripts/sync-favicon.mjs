/**
 * `assets/logoaba.svg` → favicon para a aba (desktop + mobile).
 * - `public/favicon.ico` : pedido direto pelo browser (mais fiável que só metadata)
 * - `app/icon.png` : convenção Next + PNG 48px (sem SVG na app — Safari falha com SVGs pesados)
 */
import { existsSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const src = join(root, "assets/logoaba.svg");
const pngOut = join(root, "app/icon.png");
const icoPublic = join(root, "public/favicon.ico");

const bg = { r: 245, g: 245, b: 247, alpha: 1 };

/* Safari / Chrome às vezes ficam com link antigo para estes ficheiros */
for (const legacy of [join(root, "app/icon.svg"), join(root, "app/favicon.ico")]) {
  if (existsSync(legacy)) {
    unlinkSync(legacy);
  }
}

await sharp(src)
  .resize(48, 48, { fit: "contain", background: bg })
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
writeFileSync(icoPublic, ico);

console.log("Favicon: assets/logoaba.svg → public/favicon.ico + app/icon.png");
