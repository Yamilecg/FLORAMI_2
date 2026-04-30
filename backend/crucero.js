const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

async function generarDocx(data) {
  const content = fs.readFileSync(
    path.join(__dirname, "templates/fondo.docx"),
    "binary"
  );
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    nullGetter: () => "",
    delimiters: { start: "[[", end: "]]" },
  });

  const pasajeros = data.pasajeros || {};
  const adultos = parseInt(pasajeros.adultos) || 0;
  const ninos = parseInt(pasajeros.ninos) || 0;
  const edades_ninos = Array.isArray(pasajeros.edades)
    ? pasajeros.edades.map((e, i) => ({ numero: i + 1, edad: e }))
    : [];

  const destinos = (Array.isArray(data.destinos) ? data.destinos : [])
    .filter(d => d.destino?.trim())
    .map(d => ({
      destino: d.destino?.trim() || "",
      nombre_hospedaje: d.nombre_hospedaje?.trim() || "",
      tiene_hospedaje: !!(d.nombre_hospedaje?.trim()),
    }));

  const itinerario = (Array.isArray(data.itinerario) ? data.itinerario : [])
    .filter(i => i.dia?.trim() || i.descripcion?.trim())
    .map(i => ({
      dia: i.dia?.trim() || "",
      descripcion: i.descripcion?.trim() || "",
    }));

  try {
    doc.render({
      tiene_nombre: !!(data.Nombre_Viaje?.trim()),
      Nombre_Viaje: data.Nombre_Viaje?.trim() || "",
      tiene_fechas: !!(data.fecha_embarque?.trim() || data.fecha_desembarque?.trim()),
      fecha_embarque: data.fecha_embarque?.trim() || "",
      fecha_desembarque: data.fecha_desembarque?.trim() || "",
      tiene_destinos: destinos.length > 0,
      destinos,
      tiene_pasajeros: adultos > 0 || ninos > 0,
      adultos,
      ninos,
      tiene_ninos: ninos > 0,
      edades_ninos,
      tiene_costos: !!(data.total_persona?.trim() || data.total_general?.trim()),
      tiene_persona: !!(data.total_persona?.trim()),
      total_persona: data.total_persona?.trim() || "",
      tiene_general: !!(data.total_general?.trim()),
      total_general: data.total_general?.trim() || "",
      tiene_itinerario: itinerario.length > 0,
      itinerario,
      tiene_actividades: !!(data.actividades_detalladas?.trim()),
      actividades_detalladas: data.actividades_detalladas?.trim() || "",
      tiene_plan: !!(data.plan_alimentos?.trim()),
      plan_alimentos: data.plan_alimentos?.trim() || "",
      tiene_beneficios: !!(data.beneficios?.trim()),
      beneficios: data.beneficios?.trim() || "",
      tiene_restricciones: !!(data.restricciones?.trim()),
      restricciones: data.restricciones?.trim() || "",
    });
  } catch (error) {
    console.log("ERROR DOCX:", JSON.stringify(error, null, 2));
    throw error;
  }

  return doc.getZip().generate({ type: "nodebuffer" });
}

module.exports = { generarDocx };