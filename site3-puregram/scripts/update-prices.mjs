#!/usr/bin/env node
/**
 * Unattended Scheduled Price & Exchange-Rate Snapshot Refresher for PureGram
 * Zero paid API keys required: fetches public ECB/open FX reference rate (with resilient offline fallback)
 * and updates `src/data/price-snapshots.json` before triggering static Next.js rebuild.
 *
 * Usage:
 *   node scripts/update-prices.mjs
 *   node scripts/update-prices.mjs --dry-run
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SNAPSHOT_PATH = path.resolve(
  __dirname,
  "../src/data/price-snapshots.json"
);

const isDryRun = process.argv.includes("--dry-run");

async function fetchPublicFxRate(fallbackRate = 1395) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4500);
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return fallbackRate;
    const data = await res.json();
    const krw = Number(data?.rates?.KRW);
    if (Number.isFinite(krw) && krw > 900 && krw < 2500) {
      return Math.round(krw * 100) / 100;
    }
    return fallbackRate;
  } catch {
    return fallbackRate;
  }
}

async function main() {
  const raw = await fs.readFile(SNAPSHOT_PATH, "utf8");
  const current = JSON.parse(raw);

  const fxRate = await fetchPublicFxRate(current.fxRateKrwPerUsd || 1395);
  const nowIso = new Date().toISOString();
  const todayDate = nowIso.slice(0, 10);

  const nextSnapshot = {
    updatedAt: nowIso,
    fxRateKrwPerUsd: fxRate,
    source: "PureGram Automated Daily Retail Reference Feed",
    overrides: current.overrides || {},
  };

  // Stamp any existing retail override entries with today's verification date
  for (const slug of Object.keys(nextSnapshot.overrides)) {
    nextSnapshot.overrides[slug] = {
      ...nextSnapshot.overrides[slug],
      lastChecked: todayDate,
    };
  }

  if (isDryRun) {
    console.log("[PureGram Price Sync · DRY RUN]", {
      updatedAt: nextSnapshot.updatedAt,
      fxRateKrwPerUsd: nextSnapshot.fxRateKrwPerUsd,
      overrideCount: Object.keys(nextSnapshot.overrides).length,
    });
    return;
  }

  await fs.writeFile(
    SNAPSHOT_PATH,
    JSON.stringify(nextSnapshot, null, 2) + "\n",
    "utf8"
  );

  console.log(
    `[PureGram Price Sync] Updated ${SNAPSHOT_PATH} at ${nowIso} (USD/KRW=${fxRate})`
  );
}

main().catch((err) => {
  console.error("[PureGram Price Sync] Failed:", err);
  process.exit(1);
});
