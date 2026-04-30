const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());

  data.pasajeros = obtenerPasajeros();
  data.destinos = obtenerDestinos();
  data.vuelos_extra = obtenerVuelosExtra();
  data.costos = obtenerCostos();
  data.itinerario = obtenerItinerario();


  const res = await fetch("/generar-viajes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;

  const nombre = (data.Nombre_Viaje || "viaje").replace(/\s+/g, "_");
  a.download = `cotización_viaje_${nombre}.docx`;

  a.click();
  window.URL.revokeObjectURL(url);
});

/* =====================
   HELPERS
===================== */

function obtenerPasajeros() {
  const adultos = parseInt(document.getElementById("adultos")?.value) || 0;
  const ninos = parseInt(document.getElementById("ninos")?.value) || 0;
  const edades = Array.from(document.querySelectorAll('[name="edad_nino"]'))
    .map(i => i.value.trim())
    .filter(v => v !== "");
  return { adultos, ninos, edades };
}

function obtenerDestinos() {
  const arr = [];
  document.querySelectorAll(".destino").forEach(d => {
    arr.push({
      destino: d.querySelector('[name="destino"]').value,
      hospedaje: d.querySelector('[name="hospedaje"]').value,
    });
  });
  return arr;
}

function formato12h(hora) {
  if (!hora) return "";
  let [h, m] = hora.split(":");
  h = parseInt(h);

  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;

  return `${h}:${m} ${ampm}`;
}

function obtenerVuelosExtra() {
  const arr = [];
  document.querySelectorAll(".vuelo-extra").forEach(v => {
    arr.push({
      fecha_vuelo: v.querySelector('[name="fecha_vuelo"]').value,
      origen: v.querySelector('[name="origen"]').value,
      destino: v.querySelector('[name="destino"]').value,
      aerolinea: v.querySelector('[name="aerolinea"]').value,
      hora_sale: formato12h(v.querySelector('[name="hora_sale"]').value),
      hora_llega: formato12h(v.querySelector('[name="hora_llega"]').value),
      costo_vuelo: v.querySelector('[name="costo_vuelo"]').value,
    });
  });
  return arr;
}


function obtenerCostos() {
  const arr = [];
  document.querySelectorAll(".costo-extra").forEach(c => {
    arr.push({
      hotel: c.querySelector('[name="hotel"]').value,
      descripcion_servicio: c.querySelector('[name="descripcion_servicio"]').value,
      total_persona: c.querySelector('[name="total_persona"]').value,
      total_general: c.querySelector('[name="total_general"]').value,
    });
  });
  return arr;
}

function obtenerItinerario() {
  const arr = [];
  document.querySelectorAll(".itinerario-item").forEach(i => {
    arr.push({
      dia: i.querySelector('[name="dia"]').value,
      descripcion: i.querySelector('[name="descripcion"]').value,
    });
  });
  return arr;
}


document.getElementById("btn-pdf")?.addEventListener("click", async () => {
  const data = Object.fromEntries(new FormData(form).entries());

  data.pasajeros = obtenerPasajeros();
  data.destinos = obtenerDestinos();
  data.vuelos_extra = obtenerVuelosExtra();
  data.costos = obtenerCostos();
  data.itinerario = obtenerItinerario();

  const res = await fetch("/generar-viajes-pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;

  const nombre = (data.Nombre_Viaje || "viaje").replace(/\s+/g, "_");
  a.download = `cotizacion_viaje_${nombre}.pdf`;

  a.click();
  window.URL.revokeObjectURL(url);
});