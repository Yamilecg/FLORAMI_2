const libre = require("libreoffice-convert");
const { promisify } = require("util");
const os = require("os");

if (os.platform() === "darwin") {
  // Mac
  process.env.LIBREOFFICE_PATH = "/Applications/LibreOffice.app/Contents/MacOS/soffice";
} else if (os.platform() === "win32") {
  // Windows
  process.env.LIBREOFFICE_PATH = "C:\\Program Files\\LibreOffice\\program\\soffice.exe";
}

const convertirAPdf = promisify(libre.convert);

async function docxAPdf(buffer) {
  return await convertirAPdf(buffer, ".pdf", undefined);
}

module.exports = { docxAPdf };