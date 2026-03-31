const express = require("express");
const path = require("path");
const { generarDocx } = require("./crucero");
const { generarVuelosDocx } = require("./vuelos"); 
const { generarViajesDocx } = require("./viajes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend")));

/* =========================
   CRUCERO 
========================= */

app.post("/generar", async (req, res) => {
  try {
    console.log("DATA:", JSON.stringify(req.body, null, 2));

    const buffer = await generarDocx(req.body);

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=crucero.docx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al generar documento");
  }
});

/* =========================
   VUELOS 
========================= */
app.post("/generar-vuelos", async (req, res) => {
  try {
    console.log("DATA VUELOS:", JSON.stringify(req.body, null, 2));

    const buffer = await generarVuelosDocx(req.body);

    const nombre = (req.body.Nombre_Viaje || "viaje")
      .replace(/\s+/g, "_")
      .replace(/[^\w\-]/g, "");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Cotizacion_Vuelo_${nombre}.docx`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al generar documento de vuelos");
  }
});

/* =========================
   VIAJES 
========================= */
app.post("/generar-viajes", async (req, res) => {
  try {
    console.log("DATA VIAJES:", JSON.stringify(req.body, null, 2));

    const buffer = await generarViajesDocx(req.body);

    // 🔥 nombre dinámico
    const nombre = (req.body.Nombre_Viaje?.trim() || "viaje")
      .replace(/\s+/g, "_")        // espacios → _
      .replace(/[^\w\-]/g, "");    // limpia caracteres raros

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Cotizacion_Viaje_${nombre}.docx`
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al generar documento de viajes");
  }
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});


