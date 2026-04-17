const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

async function generarViajesDocx(data) {
  const content = fs.readFileSync(
    path.join(__dirname, "templates/viajes.docx"),
    "binary"
  );

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    nullGetter: () => "",
    delimiters: {
      start: "[[",
      end: "]]",
    },
  });

  try {
    doc.render({
      ...data,
      pasajeros: Array.isArray(data.pasajeros) ? data.pasajeros : [],
      destinos: Array.isArray(data.destinos) ? data.destinos : [],
      vuelos_extra: Array.isArray(data.vuelos_extra) ? data.vuelos_extra : [],
      itinerario: Array.isArray(data.itinerario) ? data.itinerario : [],
      costos: Array.isArray(data.costos) ? data.costos : [],
    });
  } catch (error) {
    console.log("ERROR DOCX VIAJES:");
    console.log(JSON.stringify(error, null, 2));
    throw error;
  }

  return doc.getZip().generate({
    type: "nodebuffer",
  });
}

module.exports = { generarViajesDocx };