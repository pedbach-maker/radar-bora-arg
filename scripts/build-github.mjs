import { mkdir, readFile, writeFile } from "node:fs/promises";

const source = await readFile(new URL("../worker/index.js", import.meta.url), "utf8");
const match = source.match(/const page = String\.raw`([\s\S]*?)`;\s*\n\s*const FEED_KEY/);
if (!match) throw new Error("No se pudo extraer la interfaz de Radar BORA.");

const page = match[1].replace('fetch("/api/feed"', 'fetch("./feed.json"');
const output = new URL("../docs/", import.meta.url);
await mkdir(output, { recursive: true });
await writeFile(new URL("index.html", output), page, "utf8");

try {
  await readFile(new URL("feed.json", output));
} catch {
  await writeFile(new URL("feed.json", output), JSON.stringify({
    items: [],
    lastSyncedAt: null,
    lastAttemptAt: null,
    syncStatus: "never",
    source: "https://www.boletinoficial.gov.ar/seccion/primera/",
    itemCount: 0,
    newItemCount: 0,
    failedDates: []
  }, null, 2) + "\n", "utf8");
}

console.log("GitHub Pages artifact built");

