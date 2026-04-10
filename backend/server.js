const express = require("express");
const path = require("path");
const { generarDocx } = require("./crucero");
const { generarVuelosDocx } = require("./vuelos");
const { generarViajesDocx } = require("./viajes");
const { docxAPdf } = require("./convertir");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend")));

/* =========================
   CRUCERO - DOCX
========================= */
app.post("/generar", async (req, res) => {
  try {
    const buffer = await generarDocx(req.body);
    res.setHeader("Content-Disposition", "attachment; filename=crucero.docx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al generar documento");
  }
});

/* =========================
   CRUCERO - PDF
========================= */
app.post("/generar-pdf", async (req, res) => {
  try {
    const docxBuffer = await generarDocx(req.body);
    const pdfBuffer = await docxAPdf(docxBuffer);
    const nombre = (req.body.Nombre_Viaje || "crucero").replace(/\s+/g, "_").replace(/[^\w\-]/g, "");
    res.setHeader("Content-Disposition", `attachment; filename=Cotizacion_${nombre}.pdf`);
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al generar PDF");
  }
});

/* =========================
   VUELOS - DOCX
========================= */
app.post("/generar-vuelos", async (req, res) => {
  try {
    const buffer = await generarVuelosDocx(req.body);
    const nombre = (req.body.Nombre_Viaje || "viaje").replace(/\s+/g, "_").replace(/[^\w\-]/g, "");
    res.setHeader("Content-Disposition", `attachment; filename=Cotizacion_Vuelo_${nombre}.docx`);
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al generar documento de vuelos");
  }
});

/* =========================
   VUELOS - PDF
========================= */
app.post("/generar-vuelos-pdf", async (req, res) => {
  try {
    const docxBuffer = await generarVuelosDocx(req.body);
    const pdfBuffer = await docxAPdf(docxBuffer);
    const nombre = (req.body.Nombre_Viaje || "vuelos").replace(/\s+/g, "_").replace(/[^\w\-]/g, "");
    res.setHeader("Content-Disposition", `attachment; filename=Cotizacion_Vuelo_${nombre}.pdf`);
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al generar PDF de vuelos");
  }
});

/* =========================
   VIAJES - DOCX
========================= */
app.post("/generar-viajes", async (req, res) => {
  try {
    const buffer = await generarViajesDocx(req.body);
    const nombre = (req.body.Nombre_Viaje?.trim() || "viaje").replace(/\s+/g, "_").replace(/[^\w\-]/g, "");
    res.setHeader("Content-Disposition", `attachment; filename=Cotizacion_Viaje_${nombre}.docx`);
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al generar documento de viajes");
  }
});

/* =========================
   VIAJES - PDF
========================= */
app.post("/generar-viajes-pdf", async (req, res) => {
  try {
    const docxBuffer = await generarViajesDocx(req.body);
    const pdfBuffer = await docxAPdf(docxBuffer);
    const nombre = (req.body.Nombre_Viaje?.trim() || "viaje").replace(/\s+/g, "_").replace(/[^\w\-]/g, "");
    res.setHeader("Content-Disposition", `attachment; filename=Cotizacion_Viaje_${nombre}.pdf`);
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al generar PDF de viajes");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});