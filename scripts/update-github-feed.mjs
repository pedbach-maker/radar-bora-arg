import { mkdir, readFile, writeFile } from "node:fs/promises";
import worker from "../worker/index.js";
import { enrichNormSummaries } from "./lib/norm-summary.mjs";

const feedUrl = new URL("../docs/feed.json", import.meta.url);
let stored = null;
try {
  stored = await readFile(feedUrl, "utf8");
} catch {}

const bucket = {
  async get(key) {
    if (key !== "bora/feed.json" || !stored) return null;
    return { async json() { return JSON.parse(stored); } };
  },
  async put(key, value) {
    if (key !== "bora/feed.json") throw new Error("Clave de almacenamiento inesperada.");
    stored = value;
  }
};

const response = await worker.fetch(new Request("https://radar-bora.local/api/sync", {
  method: "POST",
  headers: { "OAI-Sites-Authorization": "github-actions" }
}), { BUCKET: bucket });

const responseText = await response.text();
if (!response.ok) {
  let previous;
  try {
    previous = stored ? JSON.parse(stored) : { items: [], itemCount: 0 };
  } catch {
    previous = { items: [], itemCount: 0 };
  }
  const preserved = {
    ...previous,
    items: Array.isArray(previous.items) ? previous.items : [],
    lastAttemptAt: new Date().toISOString(),
    syncStatus: "error",
    source: "https://www.boletinoficial.gov.ar/seccion/primera/",
    itemCount: Array.isArray(previous.items) ? previous.items.length : 0,
    updateError: `BORA no disponible (HTTP ${response.status})`
  };
  await mkdir(new URL("../docs/", import.meta.url), { recursive: true });
  await writeFile(feedUrl, JSON.stringify(preserved, null, 2) + "\n", "utf8");
  console.warn("El BORA no respondió; se conserva la última carga válida.");
  process.exit(0);
}
const payload = JSON.parse(responseText);
if (!Array.isArray(payload.items) || payload.syncStatus === "error") {
  throw new Error("La actualización no produjo un feed válido.");
}
payload.items = await enrichNormSummaries(payload.items, {
  force: process.env.REFRESH_SUMMARIES === "1"
});
payload.itemCount = payload.items.length;

await mkdir(new URL("../docs/", import.meta.url), { recursive: true });
await writeFile(feedUrl, JSON.stringify(payload, null, 2) + "\n", "utf8");
console.log(`Feed actualizado: ${payload.itemCount} normas, estado ${payload.syncStatus}`);

