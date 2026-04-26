/**
 * Studio black → true PNG-32 (legacy raster pipeline). The Small Straight slide
 * now uses `public/nsssf.svg`; re-point `input`/`output` if you process a PNG again.
 * Re-run: npm run mask-fleet
 */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const input = join(__dirname, "../public/fleet-small-straight.png");
const output = join(__dirname, "../public/fleet-small-straight.png");

const WALK_MAX = 24;
const DILATE_MAX = 42;
const DILATE_ROUNDS = 10;

const OFFSETS8 = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
];

function rgbMax(data, i) {
  const o = i * 4;
  return Math.max(data[o], data[o + 1], data[o + 2]);
}

async function main() {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const n = width * height;
  if (channels !== 4) {
    throw new Error(`expected 4 channels, got ${channels}`);
  }

  const walkable = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    if (data[i * 4 + 3] < 8) {
      walkable[i] = 0;
    } else {
      walkable[i] = rgbMax(data, i) <= WALK_MAX ? 1 : 0;
    }
  }

  const outside = new Uint8Array(n);
  const q = new Int32Array(n);
  let tail = 0;

  function tryPush(i) {
    if (i < 0 || i >= n) {
      return;
    }
    if (outside[i] || !walkable[i]) {
      return;
    }
    outside[i] = 1;
    q[tail++] = i;
  }

  for (let i = 0; i < n; i++) {
    if (data[i * 4 + 3] < 8) {
      outside[i] = 1;
    }
  }

  for (let x = 0; x < width; x++) {
    tryPush(x);
    tryPush((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    tryPush(y * width);
    tryPush(y * width + (width - 1));
  }

  let head = 0;
  while (head < tail) {
    const i = q[head++];
    const x = i % width;
    const y = (i / width) | 0;
    for (const [dx, dy] of OFFSETS8) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
        continue;
      }
      const j = ny * width + nx;
      tryPush(j);
    }
  }

  for (let r = 0; r < DILATE_ROUNDS; r++) {
    const next = new Uint8Array(outside);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = y * width + x;
        if (next[i] || rgbMax(data, i) > DILATE_MAX) {
          continue;
        }
        for (const [dx, dy] of OFFSETS8) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
            continue;
          }
          const j = ny * width + nx;
          if (outside[j]) {
            next[i] = 1;
            break;
          }
        }
      }
    }
    for (let i = 0; i < n; i++) {
      outside[i] = next[i];
    }
  }

  const out = Buffer.from(data);
  for (let i = 0; i < n; i++) {
    if (outside[i]) {
      out[i * 4] = 0;
      out[i * 4 + 1] = 0;
      out[i * 4 + 2] = 0;
      out[i * 4 + 3] = 0;
    } else {
      out[i * 4 + 3] = 255;
    }
  }

  await sharp(out, {
    raw: { width, height, channels: 4 },
  })
    .png({
      compressionLevel: 9,
      effort: 10,
      palette: false,
    })
    .toFile(output);

  process.stdout.write(
    `Wrote ${output} (${width}x${height}, walk<=${WALK_MAX}, dilate<=${DILATE_MAX} x${DILATE_ROUNDS})\n`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
