import assert from "node:assert/strict";
import test from "node:test";
import { enrichNormSummaries, needsDetailedSummary, summaryFromDetailHtml } from "../scripts/lib/norm-summary.mjs";

const detail = `
  <div id="cuerpoDetalleAviso" class="detalle-cuerpo">
    <p>VISTO el expediente EX-2026-1;</p>
    <p>CONSIDERANDO:</p>
    <p>Que corresponde establecer nuevas pautas.</p>
    <p>ARTÍCULO 1°.- Apruébase el documento “Lineamientos para la tramitación de certificados de buenas prácticas de fabricación de plantas sitas en el extranjero”, que forma parte de la presente disposición.</p>
    <p>ARTÍCULO 2°.- Comuníquese.</p>
  </div></div></div>`;

test("detecta códigos internos que no son resúmenes", () => {
  assert.equal(needsDetailedSummary("DI-2026-6403-APN-ANMAT#MS"), true);
  assert.equal(needsDetailedSummary("Dispone la intervención del organismo y designa a su interventor."), false);
});

test("extrae y simplifica el primer artículo operativo", () => {
  assert.equal(
    summaryFromDetailHtml(detail),
    "Aprueba “Lineamientos para la tramitación de certificados de buenas prácticas de fabricación de plantas sitas en el extranjero”."
  );
});

test("ignora referencias a artículos dentro de los considerandos", () => {
  const withReferences = '<div id="cuerpoDetalleAviso"><p>Que el artículo 1° del Decreto 934 establece antecedentes. Por ello, EL DIRECTOR RESUELVE: ARTÍCULO 1°.- Desígnase a la nueva autoridad de aplicación. ARTÍCULO 2°.- Comuníquese.</p></div></div></div>';
  assert.equal(summaryFromDetailHtml(withReferences), "Designa a la nueva autoridad de aplicación.");
});

test("no confunde el artículo 10 con el artículo 1", () => {
  const withArticleTen = '<div id="cuerpoDetalleAviso"><p>VISTO el artículo 10 del Decreto 1490. EL ADMINISTRADOR DISPONE: ARTÍCULO 1°.- Apruébase el nuevo procedimiento de control sanitario. ARTÍCULO 2°.- Comuníquese.</p></div></div></div>';
  assert.equal(summaryFromDetailHtml(withArticleTen), "Aprueba el nuevo procedimiento de control sanitario.");
});

test("encuentra el artículo aunque la publicación sintetizada esté en un solo párrafo", () => {
  const synthesized = '<div id="cuerpoDetalleAviso"><p>SÍNTESIS: RESOL-2026-438. EL SUPERINTENDENTE RESUELVE: ARTÍCULO 1°.- Prorrógase hasta el 30 de junio de 2027 el plazo de aplicación del esquema transitorio. ARTÍCULO 2°.- Comuníquese.</p></div></div></div>';
  assert.equal(
    summaryFromDetailHtml(synthesized),
    "Prorroga hasta el 30 de junio de 2027 el plazo de aplicación del esquema transitorio."
  );
});

test("resume comunicaciones sin artículos desde su parte dispositiva", () => {
  const communication = '<div id="cuerpoDetalleAviso"><p>Nos dirigimos a Uds. para comunicarles que esta Institución adoptó la resolución que, en su parte pertinente, dispone: “- Establecer como feriado bancario el 10/11/26 en todo el territorio de la República Argentina.” Saludamos a Uds. atentamente.</p></div></div></div>';
  assert.equal(
    summaryFromDetailHtml(communication),
    "Establece como feriado bancario el 10/11/26 en todo el territorio de la República Argentina."
  );
});

test("resume publicaciones sintetizadas numeradas", () => {
  const synthesized = '<div id="cuerpoDetalleAviso"><p>LA DIRECCIÓN NACIONAL ha dispuesto; 1.- Inscribir a la cooperativa como prestador de servicios postales en el registro correspondiente. 2.- Notifíquese y archívese.</p></div></div></div>';
  assert.equal(
    summaryFromDetailHtml(synthesized),
    "Inscribe a la cooperativa como prestador de servicios postales en el registro correspondiente."
  );
});

test("resume publicaciones sintetizadas con numeración romana", () => {
  const synthesized = '<div id="cuerpoDetalleAviso"><p>LA SECRETARIA EJECUTIVA RESUELVE: I. AMPLIAR la convocatoria para integrar el Órgano de Revisión Nacional de Salud Mental. II. ESTABLECER que las propuestas anteriores conservan validez.</p></div></div></div>';
  assert.equal(
    summaryFromDetailHtml(synthesized),
    "Amplía la convocatoria para integrar el Órgano de Revisión Nacional de Salud Mental."
  );
});

test("admite artículos con N° antes del número", () => {
  const numberedArticle = '<div id="cuerpoDetalleAviso"><p>LA DIRECTORA DISPONE: ARTICULO N°1.- Declárese homologado el acuerdo celebrado entre UPCN, por el sector sindical, y el INSSJP, por el sector empleador. ARTICULO 2°.- Comuníquese.</p></div></div></div>';
  assert.equal(summaryFromDetailHtml(numberedArticle), "Homologa un acuerdo entre UPCN y el INSSJP.");
});

test("prioriza el contenido económico de un acuerdo cuando está explicitado", () => {
  const agreement = '<div id="cuerpoDetalleAviso"><p>Que, mediante el acuerdo referido, las partes pactan incrementar el valor de las Unidades Retributivas. LA DIRECTORA DISPONE: ARTÍCULO 1°.- Declárese homologado el acuerdo celebrado entre UPCN, por el sector sindical, y el INSSJP, por el sector empleador. ARTÍCULO 2°.- Comuníquese.</p></div></div></div>';
  assert.equal(
    summaryFromDetailHtml(agreement),
    "Homologa un acuerdo para incrementar el valor de las Unidades Retributivas entre UPCN y el INSSJP."
  );
});

test("explica el núcleo de la modificación sobre VNEI de la CNV", () => {
  const cnv = '<div id="cuerpoDetalleAviso"><p>La CNV regula la actuación del ACRyP respecto de VNEI vencidos e impagos.</p></div></div></div>';
  assert.equal(
    summaryFromDetailHtml(cnv),
    "Modifica las reglas de la CNV para valores negociables electrónicos impagos: habilita su ejecución y transferencia, y redefine qué agentes pueden emitirlos."
  );
});

test("enriquece una norma desde su ficha oficial", async () => {
  const [item] = await enrichNormSummaries([{
    official: "https://example.test/norma",
    summary: "DI-2026-6403-APN-ANMAT#MS"
  }], {
    fetchImpl: async () => new Response(detail),
    concurrency: 1
  });
  assert.match(item.summary, /^Aprueba “Lineamientos/);
  assert.equal(item.summarySource, "articulo-1");
});

