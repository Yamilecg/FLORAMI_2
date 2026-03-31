const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

async function generarDocx(data) {
  const content = fs.readFileSync("./backend/templates/fondo.docx", "binary");

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
    });
  } catch (error) {
    console.log("ERROR DOCX:");
    console.log(JSON.stringify(error, null, 2));
    throw error;
  }

  return doc.getZip().generate({
    type: "nodebuffer",
  });
}

module.exports = { generarDocx };