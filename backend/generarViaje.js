const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

function getTemplate() {
  return fs.readFileSync(
    path.join(__dirname, "templates/viajes.docx"),
    "binary"
  );
}

function render(data) {
  const destinos = (Array.isArray(data.destinos) ? data.destinos : [])
    .filter(d => d.destino?.trim())
    .map(d => ({
      destino: d.destino?.trim() || "",
      hospedaje: d.hospedaje?.trim() || "",
      tiene_hospedaje: !!(d.hospedaje?.trim()),
    }));

  const vuelos_extra = (Array.isArray(data.vuelos_extra) ? data.vuelos_extra : [])
    .filter(v => v.origen?.trim() || v.destino?.trim())
    .map(v => ({
      fecha_vuelo: v.fecha_vuelo?.trim() || "",
      origen: v.origen?.trim() || "",
      destino: v.destino?.trim() || "",
      aerolinea: v.aerolinea?.trim() || "",
      hora_sale: v.hora_sale?.trim() || "",
      hora_llega: v.hora_llega?.trim() || "",
      costo_vuelo: v.costo_vuelo?.trim() || "",
    }));

  const costos = (Array.isArray(data.costos) ? data.costos : [])
    .filter(c => c.hotel?.trim() || c.descripcion_servicio?.trim())
    .map(c => ({
      hotel: c.hotel?.trim() || "",
      descripcion_servicio: c.descripcion_servicio?.trim() || "",
      total_persona: c.total_persona?.trim() || "",
      total_general: c.total_general?.trim() || "",
      tiene_hotel: !!(c.hotel?.trim()),
      tiene_descripcion: !!(c.descripcion_servicio?.trim()),
      tiene_persona: !!(c.total_persona?.trim()),
      tiene_general: !!(c.total_general?.trim()),
    }));

  const itinerario = (Array.isArray(data.itinerario) ? data.itinerario : [])
    .filter(i => i.dia?.trim() || i.descripcion?.trim())
    .map(i => ({
      dia: i.dia?.trim() || "",
      descripcion: i.descripcion?.trim() || "",
    }));

  // ← Pasajeros nuevo formato
  const pasajerosData = data.pasajeros || {};
  const adultos = parseInt(pasajerosData.adultos) || 0;
  const ninos = parseInt(pasajerosData.ninos) || 0;
  const edades_ninos = Array.isArray(pasajerosData.edades)
    ? pasajerosData.edades.map((e, i) => ({ numero: i + 1, edad: e }))
    : [];

  return {
    tiene_nombre: !!(data.Nombre_Viaje?.trim()),
    Nombre_Viaje: data.Nombre_Viaje?.trim() || "",
    tiene_fechas: !!(data.fecha_inicio?.trim() || data.fecha_fin?.trim()),
    fecha_inicio: data.fecha_inicio?.trim() || "",
    fecha_fin: data.fecha_fin?.trim() || "",
    tiene_destinos: destinos.length > 0,
    destinos,
    tiene_pasajeros: adultos > 0 || ninos > 0,
    adultos,
    ninos,
    tiene_ninos: ninos > 0,
    edades_ninos,
    tiene_vuelos_extra: vuelos_extra.length > 0,
    vuelos_extra,
    tiene_itinerario: itinerario.length > 0,
    itinerario,
    tiene_costos: costos.length > 0,
    costos,
    tiene_beneficios: !!(data.beneficios?.trim()),
    beneficios: data.beneficios?.trim() || "",
    tiene_restricciones: !!(data.restricciones?.trim()),
    restricciones: data.restricciones?.trim() || "",
    tiene_actividades: !!(data.actividades_detalladas?.trim()),
    actividades_detalladas: data.actividades_detalladas?.trim() || "",
    tiene_plan: !!(data.plan_alimentos?.trim()),
    plan_alimentos: data.plan_alimentos?.trim() || "",
  };
}

async function generarViajesDocx(data) {
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
    console.log("ERROR DOCX VIAJES:", JSON.stringify(error, null, 2));
    throw error;
  }

  return doc.getZip().generate({ type: "nodebuffer" });
}

module.exports = { generarViajesDocx };