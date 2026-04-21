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

  try {
    doc.render({
      ...data,
      pasajeros: (Array.isArray(data.pasajeros) ? data.pasajeros : [])
        .filter(p => p.nombre?.trim() || p.Apellidos?.trim()),
      destinos: (Array.isArray(data.destinos) ? data.destinos : [])
        .filter(d => d.destino?.trim()),
      itinerario: (Array.isArray(data.itinerario) ? data.itinerario : [])
        .filter(i => i.dia?.trim() || i.descripcion?.trim()),
      beneficios: data.beneficios?.trim() || null,
      restricciones: data.restricciones?.trim() || null,
      actividades_detalladas: data.actividades_detalladas?.trim() || null,
      plan_alimentos: data.plan_alimentos?.trim() || null,
    });
  } catch (error) {
    console.log("ERROR DOCX:");
    console.log(JSON.stringify(error, null, 2));
    throw error;
  }

  return doc.getZip().generate({ type: "nodebuffer" });
}

module.exports = { generarDocx };