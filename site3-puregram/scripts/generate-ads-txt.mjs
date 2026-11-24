#!/usr/bin/env node
/**
 * Prebuild ads.txt generator for Google AdSense verification & monetization.
 * Reads NEXT_PUBLIC_ADSENSE_ID from process.env or .env.production.local / .env.local / .env.
 * Accepts "ca-pub-1234567890123456", "pub-1234567890123456", or a pasted <meta> tag.
 * Writes: google.com, pub-XXXX, DIRECT, f08c47fec0942fa0 -> public/ads.txt
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const ADS_TXT_PATH = path.join(PUBLIC_DIR, "ads.txt");

function readEnvFileVar(key) {
  const candidates = [".env.production.local", ".env.local", ".env.production", ".env"];
  for (const filename of candidates) {
    const fullPath = path.join(ROOT_DIR, filename);
    if (!fs.existsSync(fullPath)) continue;
    const content = fs.readFileSync(fullPath, "utf8");
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const eqIdx = line.indexOf("=");
      if (eqIdx === -1) continue;
      const k = line.slice(0, eqIdx).trim();
      if (k !== key) continue;
      let val = line.slice(eqIdx + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1).trim();
      }
      if (val) return val;
    }
  }
  return "";
}

function extractPubId(raw) {
  if (!raw) return "";
  const match = String(raw).match(/pub-\d{10,20}/i);
  if (match) return match[0].toLowerCase();
  const digitsOnly = String(raw).trim().match(/^\d{10,20}$/);
  if (digitsOnly) return `pub-${digitsOnly[0]}`;
  return "";
}

const rawAdsense =
  process.env.NEXT_PUBLIC_ADSENSE_ID || readEnvFileVar("NEXT_PUBLIC_ADSENSE_ID");
const pubId = extractPubId(rawAdsense);

if (pubId) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  const record = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;
  fs.writeFileSync(ADS_TXT_PATH, record, "utf8");
  console.log(`[PureGram prebuild] Generated public/ads.txt for ${pubId}`);
} else {
  console.log(
    "[PureGram prebuild] NEXT_PUBLIC_ADSENSE_ID not set; skipping public/ads.txt generation."
  );
}
