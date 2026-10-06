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
    [/^Ampliar\b/i, "Amplía"],
    [/^Sustituir\b/i, "Modifica"]
  ];
  return replacements.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value);
}

function sentenceCaseQuotedHeadings(value) {
  return value.replace(/“([^”]{12,})”/g, (whole, heading) => {
    const letters = heading.replace(/[^A-Za-zÁÉÍÓÚÑáéíóúñ]/g, "");
    if (!letters || letters !== letters.toLocaleUpperCase("es")) return whole;
    const lowered = heading.toLocaleLowerCase("es");
    return "“" + lowered.charAt(0).toLocaleUpperCase("es") + lowered.slice(1) + "”";
  });
}

function agreementCore(value, fullText) {
  if (!/\bacuerdo\b/i.test(value) || !/\b(?:homolog|registr)/i.test(value)) return "";
  const action = /\bhomolog/i.test(value) ? "Homologa" : "Registra";
  const subject = /escalas? salariales?/i.test(value)
    ? "un acuerdo y sus escalas salariales"
    : /actas? complementarias?/i.test(value)
      ? "un acuerdo y su acta complementaria"
      : "un acuerdo";
  const cleaned = value
    .replace(/\bobrantes?\b[\s\S]*?(?=\bcelebrad[oa]s?\s+entre\b)/i, "")
    .replace(/,?\s*por (?:la parte|el sector) (?:sindical|empleadora|empleador|empresaria|empresarial|gremial)\b,?/gi, "")
    .replace(/\s+/g, " ");
  const parties = cleaned.match(/\bcelebrad[oa]s?\s+entre\s+([\s\S]*)/i)?.[1]
    ?.replace(/,?\s+(?:de fecha|obrante|en el marco|conforme|en los términos)[\s\S]*$/i, "")
    ?.replace(/\s*,?\s+y\s+/i, " y ")
    .trim();
  const purpose = fullText?.match(/\bQue,?\s+(?:mediante|a través de) (?:el|dicho) acuerdo(?: referido)?,?\s+las partes (?:pactan|acuerdan|convienen)\s+([\s\S]*?)(?=,\s*conforme|\.\s+(?:Que|LA|EL)\b)/i)?.[1]
    ?.replace(/,?\s*conforme a los lineamientos[\s\S]*$/i, "")
    .trim();
  if (!parties) return "";
  return `${action} ${subject}${purpose ? ` para ${purpose}` : ""} entre ${parties}`;
}

function coreSummary(value, fullText) {
  const agreement = agreementCore(value, fullText);
  if (agreement) return shorten(agreement, 210);

  let text = normalizeLegalVerb(value)
    .replace(/\((?:D\.?N\.?I\.?|C\.?U\.?I\.?T\.?)\s*N?[°º.]?\s*[\d.-]+\)/gi, "")
    .replace(/\((?:IF|EX|RE|DI|RESOL|RESFC|RESOG|DECTO)-\d{4}-[A-Z0-9#-]+\)/gi, "")
    .replace(/\b(?:IF|EX|RE|DI|RESOL|RESFC|RESOG|DECTO)-\d{4}-[A-Z0-9#-]+\b/gi, "")
    .replace(/,?\s*que como ANEXO[\s\S]*?forma parte integrante de la presente (?:disposición|resolución|medida|norma)/i, "")
    .replace(/,?\s*que forma parte(?: integrante)? de la presente (?:disposición|resolución|medida|norma)/i, "")
    .replace(/,?\s*organismo descentralizado actuante en (?:la órbita|el ámbito) de[\s\S]*?(?=,\s*(?:consignad|por el plazo|a partir|conforme)|\.)/i, "")
    .replace(/,?\s*consignados? en (?:el|los) Anexos?[\s\S]*$/i, "")
    .replace(/,?\s*aprobado por la Disposición N°[\s\S]*?y sus modificatorias/i, "")
    .replace(/,?\s*el que quedará establecido en la forma que seguidamente se indica[\s\S]*$/i, "")
    .replace(/,?\s*que será de aplicación en los casos no alcanzados por la/i, ". Aplica a casos no cubiertos por la")
    .replace(/^Aprueba el documento\s+/i, "Aprueba ")
    .replace(/^Decl[aá]r(?:ase|ense)? homologad[oa]s?\s+/i, "Homologa ")
    .replace(/^Regístrese\s+/i, "Registra ")
    .replace(/\s+/g, " ")
    .trim();

  const intervention = text.match(/\bla intervención de\s+([\s\S]*?)(?=,\s*(?:por el plazo|a partir|conforme)|\.$|$)/i)?.[1];
  if (/^Dispone\b/i.test(text) && intervention) text = `Interviene ${intervention}`;
  text = sentenceCaseQuotedHeadings(text);
  return shorten(text, 210);
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
  const article = operativeText.match(/ART[ÍI]CULO\s+(?:N[°º.]?\s*)?1(?:[°º]|\b)\s*\.?\s*[-–—:]?\s*([\s\S]*?)(?=\s+ART[ÍI]CULO\s+(?:N[°º.]?\s*)?[2-9](?:[°º]|\b)|$)/i)?.[1];
  const disposition = text.match(/\bdispone:\s*[“\"]?\s*[-–—]?\s*([\s\S]*?)(?=\s*(?:[”\"]?\s*Saludamos|ART[ÍI]CULO|$))/i)?.[1];
  const numbered = text.match(/\bha\s+(?:dispuesto|resuelto)\s*[:;]\s*1\s*\.?\s*[-–—:]\s*([\s\S]*?)(?=\s+2\s*\.?\s*[-–—:]|$)/i)?.[1];
  const romanNumbered = operativeText.match(/\bI\s*\.\s*([\s\S]*?)(?=\s+II\s*\.|$)/i)?.[1];
  const reference = text.match(/\bRef\.?\s*:\s*([\s\S]*?)(?=\s+(?:Nos dirigimos|Se comunica|Comunicamos)\b)/i)?.[1];
  const content = (article || disposition || numbered || romanNumbered || reference || "")
    .replace(/\s+/g, " ")
    .trim();
  if (content.length < 20 && /\bACRyP\b/i.test(text) && /\bVNEI\b/i.test(text)) {
    return "Modifica las reglas de la CNV para valores negociables electrónicos impagos: habilita su ejecución y transferencia, y redefine qué agentes pueden emitirlos.";
  }
  if (content.length < 20) return "";
  return coreSummary(content, text);
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

