const GENERIC_SUMMARIES = new Set([
  "Texto y anexos disponibles en la publicación oficial.",
  "Texto completo disponible en la publicación oficial."
]);

const CODE_ONLY = /^(?:[A-ZÁÉÍÓÚÑ]{2,12}-)?\d{4}-\d{1,7}(?:-[A-Z0-9ÁÉÍÓÚÑ#]+)+\.?$/i;
const CODE_PREFIX = /^(?:[A-ZÁÉÍÓÚÑ]{2,12}-)?\d{4}-\d{1,7}(?:-[A-Z0-9ÁÉÍÓÚÑ#]+)+\s*(?:[-–—]|$)/i;

function decodeEntities(value) {
  return String(value)
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&ordm;|&#186;/gi, "º")
    .replace(/&deg;|&#176;/gi, "°")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&apos;|&#39;/gi, "'")
    .replace(/&amp;|&#38;/gi, "&")
    .replace(/&lt;|&#60;/gi, "<")
    .replace(/&gt;|&#62;/gi, ">");
}

function plainText(value) {
  return decodeEntities(String(value))
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeLegalVerb(value) {
  const replacements = [
    [/^Apruébase\b/i, "Aprueba"],
    [/^Dispónese\b/i, "Dispone"],
    [/^Desígnase\b/i, "Designa"],
    [/^Establécese\b/i, "Establece"],
    [/^Sustitúyese\b/i, "Sustituye"],
    [/^Modifícase\b/i, "Modifica"],
    [/^Incorpórase\b/i, "Incorpora"],
    [/^Derógase\b/i, "Deroga"],
    [/^Autorízase\b/i, "Autoriza"],
    [/^Prorrógase\b/i, "Prorroga"],
    [/^Prorróganse\b/i, "Prorroga"],
    [/^Créase\b/i, "Crea"],
    [/^Fíjase\b/i, "Fija"],
    [/^Declárase\b/i, "Declara"],
    [/^Acéptase\b/i, "Acepta"],
    [/^Limítase\b/i, "Limita"],
    [/^Asígnase\b/i, "Asigna"],
    [/^Adjudícase\b/i, "Adjudica"],
    [/^Habilítase\b/i, "Habilita"],
    [/^Exceptúase\b/i, "Exceptúa"],
    [/^Dáse\b/i, "Da"],
    [/^Modificar\b/i, "Modifica"],
    [/^Modifíquese\b/i, "Modifica"],
    [/^Procédase\s+al\s+registro\s+del\b/i, "Registra el"],
    [/^Procédase\s+al\s+registro\b/i, "Registra"],
    [/^Declárese\b/i, "Declara"],
    [/^Recházase\b/i, "Rechaza"],
    [/^Impónese\b/i, "Impone"],
    [/^Inscribir\b/i, "Inscribe"],
    [/^Aprobar\b/i, "Aprueba"],
    [/^Establecer\b/i, "Establece"],
    [/^Ampliar\b/i, "Amplía"]
  ];
  return replacements.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value);
}

function shorten(value, limit = 300) {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= limit) return /[.!?]$/.test(text) ? text : text + ".";
  const clipped = text.slice(0, limit + 1);
  const sentenceEnd = Math.max(clipped.lastIndexOf(". "), clipped.lastIndexOf("; "));
  const wordEnd = clipped.lastIndexOf(" ");
  const end = sentenceEnd >= 140 ? sentenceEnd + 1 : wordEnd;
  return text.slice(0, Math.max(end, 1)).replace(/[,:;\s]+$/, "") + "…";
}

export function needsDetailedSummary(summary) {
  const text = plainText(summary);
  return !text || text.length < 28 || GENERIC_SUMMARIES.has(text) || CODE_ONLY.test(text) || CODE_PREFIX.test(text);
}

export function summaryFromDetailHtml(html) {
  const body = String(html).match(/<div\b[^>]*id=["']cuerpoDetalleAviso["'][^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i)?.[1];
  if (!body) return "";

  const text = plainText(body);
  const markers = Array.from(text.matchAll(/\b(?:RESUELVE|DISPONE|DECRETA|DECIDE|ACUERDA|SANCIONAN\s+CON\s+FUERZA\s+DE\s+LEY)\s*:/gi));
  const operativeText = markers.length ? text.slice(markers.at(-1).index) : text;
  const article = operativeText.match(/ART[ÍI]CULO\s+1(?:[°º]|\b)\s*\.?\s*[-–—:]?\s*([\s\S]*?)(?=\s+ART[ÍI]CULO\s+2(?:[°º]|\b)|$)/i)?.[1];
  const disposition = text.match(/\bdispone:\s*[“\"]?\s*[-–—]?\s*([\s\S]*?)(?=\s*(?:[”\"]?\s*Saludamos|ART[ÍI]CULO|$))/i)?.[1];
  const numbered = text.match(/\bha\s+(?:dispuesto|resuelto)\s*[:;]\s*1\s*\.?\s*[-–—:]\s*([\s\S]*?)(?=\s+2\s*\.?\s*[-–—:]|$)/i)?.[1];
  const romanNumbered = operativeText.match(/\bI\s*\.\s*([\s\S]*?)(?=\s+II\s*\.|$)/i)?.[1];
  const reference = text.match(/\bRef\.?\s*:\s*([\s\S]*?)(?=\s+(?:Nos dirigimos|Se comunica|Comunicamos)\b)/i)?.[1];
  const content = (article || disposition || numbered || romanNumbered || reference || "")
    .replace(/\s+/g, " ")
    .trim();
  if (content.length < 20) return "";
  return shorten(normalizeLegalVerb(content), 260);
}

async function fetchSummary(item, fetchImpl) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetchImpl(item.official, {
        headers: {
          accept: "text/html,application/xhtml+xml",
          "accept-language": "es-AR,es;q=0.9",
          "user-agent": "Radar-BORA/1.0 (+https://pedbach-maker.github.io/radar-bora-arg/)"
        }
      });
      if (response.ok) return summaryFromDetailHtml(await response.text());
      lastError = new Error(`BORA respondió con HTTP ${response.status}`);
      if (response.status !== 429 && response.status < 500) break;
    } catch (error) {
      lastError = error;
    }
    if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 750));
  }
  throw lastError || new Error("No se pudo consultar la ficha oficial.");
}

export async function enrichNormSummaries(items, { fetchImpl = fetch, concurrency = 5, force = false } = {}) {
  const result = items.map((item) => ({ ...item }));
  const queue = result.filter((item) => force || needsDetailedSummary(item.summary));
  let cursor = 0;

  async function worker() {
    while (cursor < queue.length) {
      const item = queue[cursor++];
      try {
        const summary = await fetchSummary(item, fetchImpl);
        if (summary) {
          item.summary = summary;
          item.summarySource = "articulo-1";
        }
      } catch {
        // Si una ficha puntual no responde, se conserva el texto previo y el resto sigue.
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, queue.length) }, worker));
  return result;
}

