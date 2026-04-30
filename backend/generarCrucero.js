const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

function getTemplate() {
  return fs.readFileSync(
    path.join(__dirname, "templates/crucero.docx"),
    "binary"
  );
}

function render(data) {

  // =========================
  // PASAJEROS
  // =========================
  const pasajeros = data.pasajeros || {};
  const adultos = parseInt(pasajeros.adultos) || 0;
  const ninos = parseInt(pasajeros.ninos) || 0;
  const edades_ninos = Array.isArray(pasajeros.edades)
    ? pasajeros.edades.map((e, i) => ({ numero: i + 1, edad: e }))
    : [];

  // =========================
  // DESTINOS
  // =========================
  const destinos = (Array.isArray(data.destinos) ? data.destinos : [])
    .filter(d => d.destino?.trim())
    .map(d => ({
      destino: d.destino?.trim() || "",
      nombre_hospedaje: d.nombre_hospedaje?.trim() || "",
      tiene_hospedaje: !!(d.nombre_hospedaje?.trim()),
    }));

  // =========================
  // ITINERARIO
  // =========================
  const itinerario = (Array.isArray(data.itinerario) ? data.itinerario : [])
    .filter(i => i.dia?.trim() || i.descripcion?.trim())
    .map(i => ({
      dia: i.dia?.trim() || "",
      descripcion: i.descripcion?.trim() || "",
    }));

  return {
    // =========================
    // GENERALES
    // =========================
    Nombre_Viaje: data.Nombre_Viaje?.trim() || "",
    tiene_nombre: !!(data.Nombre_Viaje?.trim()),

    // =========================
    // FECHAS
    // =========================
    fecha_embarque: data.fecha_embarque?.trim() || "",
    fecha_desembarque: data.fecha_desembarque?.trim() || "",
    tiene_fechas: !!(data.fecha_embarque?.trim() || data.fecha_desembarque?.trim()),

    // =========================
    // DESTINOS
    // =========================
    destinos,
    tiene_destinos: destinos.length > 0,

    // =========================
    // PASAJEROS
    // =========================
    adultos,
    ninos,
    edades_ninos,
    tiene_pasajeros: adultos > 0 || ninos > 0,
    tiene_ninos: ninos > 0,

    // =========================
    // COSTOS
    // =========================
    total_persona: data.total_persona?.trim() || "",
    total_general: data.total_general?.trim() || "",
    tiene_persona: !!(data.total_persona?.trim()),
    tiene_general: !!(data.total_general?.trim()),
    tiene_costos: !!(data.total_persona?.trim() || data.total_general?.trim()),

    // =========================
    // ITINERARIO
    // =========================
    itinerario,
    tiene_itinerario: itinerario.length > 0,

    // =========================
    // TEXTOS
    // =========================
    beneficios: data.beneficios?.trim() || "",
    tiene_beneficios: !!(data.beneficios?.trim()),

    restricciones: data.restricciones?.trim() || "",
    tiene_restricciones: !!(data.restricciones?.trim()),

    actividades_detalladas: data.actividades_detalladas?.trim() || "",
    tiene_actividades: !!(data.actividades_detalladas?.trim()),

    plan_alimentos: data.plan_alimentos?.trim() || "",
    tiene_plan: !!(data.plan_alimentos?.trim()),
  };
}

async function generarCruceroDocx(data) {
  const content = getTemplate();
  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    nullGetter: () => "",
    delimiters: { start: "[[", end: "]]" },
  });

  try {
    doc.render(render(data));
  } catch (error) {
    console.log("ERROR DOCX CRUCERO:", JSON.stringify(error, null, 2));
    throw error;
  }

  return doc.getZip().generate({ type: "nodebuffer" });
}

module.exports = { generarCruceroDocx };