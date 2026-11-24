import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

function readAdsIdFromEnvFiles() {
  const candidates = [
    ".env.production.local",
    ".env.local",
    ".env.production",
    ".env",
  ];

  for (const filename of candidates) {
    const fullPath = path.join(projectRoot, filename);
    if (!fs.existsSync(fullPath)) continue;
    const content = fs.readFileSync(fullPath, "utf8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      if (key === "NEXT_PUBLIC_ADSENSE_ID") {
        let val = trimmed.slice(eqIdx + 1).trim();
        val = val.replace(/^["']|["']$/g, "").trim();
        if (val) return val;
      }
    }
  }
  return "";
}

function extractPubId(raw) {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (!trimmed) return "";
  const metaMatch = trimmed.match(/content\s*=\s*["']([^"']+)["']/i);
  const candidate = metaMatch && metaMatch[1] ? metaMatch[1].trim() : trimmed;

  const pubMatch = candidate.match(/pub-\d+/i);
  if (pubMatch) {
    return pubMatch[0].toLowerCase();
  }
  const digitsOnly = candidate.replace(/^ca-/i, "").trim();
  if (/^\d{10,20}$/.test(digitsOnly)) {
    return `pub-${digitsOnly}`;
  }
  return "";
}

const rawAdsense = process.env.NEXT_PUBLIC_ADSENSE_ID || readAdsIdFromEnvFiles();
const pubId = extractPubId(rawAdsense);

const publicDir = path.join(projectRoot, "public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

if (pubId) {
  const adsTxtPath = path.join(publicDir, "ads.txt");
  const line = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;
  fs.writeFileSync(adsTxtPath, line, "utf8");
  console.log(`[prebuild] Generated public/ads.txt for ${pubId}`);
} else {
  console.log("[prebuild] NEXT_PUBLIC_ADSENSE_ID not set — skipping public/ads.txt generation.");
}
