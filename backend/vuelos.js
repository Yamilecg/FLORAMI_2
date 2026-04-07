const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

async function generarVuelosDocx(data) {
  // ← CAMBIO: ruta absoluta con __dirname
  const content = fs.readFileSync(
    path.join(__dirname, "templates/vuelos.docx"),
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
      vuelos: Array.isArray(data.vuelos) ? data.vuelos : [],
    });
  } catch (error) {
    console.log("ERROR DOCX VUELOS:");
    console.log(JSON.stringify(error, null, 2));
    throw error;
  }

  return doc.getZip().generate({
    type: "nodebuffer",
  });
}

module.exports = { generarVuelosDocx };