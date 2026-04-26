/**
 * One-off: generates data/us-states-map.json from Census us-atlas (public domain).
 * Run: node scripts/generate-us-map-data.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { feature } from "topojson-client";
import { geoAlbersUsa, geoPath } from "d3-geo";
import us from "us-atlas/states-10m.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const FIPS = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA", "08": "CO", "09": "CT",
  "10": "DE", "11": "DC", "12": "FL", "13": "GA", "15": "HI", "16": "ID", "17": "IL",
  "18": "IN", "19": "IA", "20": "KS", "21": "KY", "22": "LA", "23": "ME", "24": "MD",
  "25": "MA", "26": "MI", "27": "MN", "28": "MS", "29": "MO", "30": "MT", "31": "NE",
  "32": "NV", "33": "NH", "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND",
  "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI", "45": "SC", "46": "SD",
  "47": "TN", "48": "TX", "49": "UT", "50": "VT", "51": "VA", "53": "WA", "54": "WV",
  "55": "WI", "56": "WY",
};

const land = feature(us, us.objects.states);
const projection = geoAlbersUsa().scale(1300).translate([487.5, 305]);
const pathGen = geoPath(projection);

const byId = {};
for (const f of land.features) {
  const abbr = FIPS[String(f.id).padStart(2, "0")];
  if (!abbr) continue;
  const d = pathGen(f);
  if (d) byId[abbr] = d;
}

function pt(abbr) {
  const f = land.features.find(
    (feat) => FIPS[String(feat.id).padStart(2, "0")] === abbr
  );
  if (!f) return { x: 0, y: 0 };
  const c = pathGen.centroid(f);
  return { x: c[0], y: c[1] };
}

const hub = pt("NC");
const regions = {
  West: pt("CA"),
  Midwest: pt("IL"),
  Northeast: pt("NY"),
  Southeast: pt("FL"),
};

const out = {
  viewBox: "0 0 975 610",
  hub,
  regions,
  states: byId,
};

const dest = path.join(root, "data", "us-states-map.json");
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, JSON.stringify(out));
console.log("Wrote", dest, "keys", Object.keys(byId).length, "hub", hub);
