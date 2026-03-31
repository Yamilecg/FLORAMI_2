const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());

  data.pasajeros = obtenerPasajeros();
  data.destinos = obtenerDestinos();
  data.vuelos_extra = obtenerVuelosExtra();
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
  a.download = `cotizacion_viaje_${nombre}.docx`;

  a.click();
  window.URL.revokeObjectURL(url);
});

/* =====================
   HELPERS
===================== */

function obtenerPasajeros() {
  const arr = [];
  document.querySelectorAll(".pasajero").forEach(p => {
    arr.push({
      nombre: p.querySelector('[name="nombre"]').value,
      apellidos: p.querySelector('[name="apellidos"]').value,
      edad: p.querySelector('[name="edad"]').value,
    });
  });
  return arr;
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

function obtenerVuelosExtra() {
  const arr = [];
  document.querySelectorAll(".vuelo-extra").forEach(v => {
    arr.push({
      fecha_vuelo: v.querySelector('[name="fecha_vuelo"]').value,
      origen: v.querySelector('[name="origen"]').value,
      destino: v.querySelector('[name="destino"]').value,
      detalle: v.querySelector('[name="detalle"]').value,
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