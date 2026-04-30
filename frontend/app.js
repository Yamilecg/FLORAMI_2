const form = document.getElementById("form");

function obtenerPasajeros() {
  const adultos = parseInt(document.getElementById("adultos")?.value) || 0;
  const ninos = parseInt(document.getElementById("ninos")?.value) || 0;
  const edades = Array.from(document.querySelectorAll('[name="edad_nino"]'))
    .map(i => i.value.trim())
    .filter(v => v !== "");
  return { adultos, ninos, edades };
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());

  data.restricciones = data.restricciones?.trim();
  data.beneficios = data.beneficios?.trim();
  data.actividades_detalladas = data.actividades_detalladas?.trim();
  data.plan_alimentos = data.plan_alimentos?.trim();

  data.pasajeros = obtenerPasajeros();
  data.destinos = obtenerDestinos();
  data.itinerario = obtenerItinerario();

  const res = await fetch("/generar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const nombre = (data.Nombre_Viaje || "viaje").replace(/\s+/g, "_");
  a.download = `cotización_${nombre}.docx`;
  a.click();
  window.URL.revokeObjectURL(url);
});

document.getElementById("btn-pdf")?.addEventListener("click", async () => {
  const data = Object.fromEntries(new FormData(form).entries());

  data.restricciones = data.restricciones?.trim();
  data.beneficios = data.beneficios?.trim();
  data.actividades_detalladas = data.actividades_detalladas?.trim();
  data.plan_alimentos = data.plan_alimentos?.trim();

  data.pasajeros = obtenerPasajeros();
  data.destinos = obtenerDestinos();
  data.itinerario = obtenerItinerario();

  const res = await fetch("/generar-pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const nombre = (data.Nombre_Viaje || "crucero").replace(/\s+/g, "_");
  a.download = `cotizacion_${nombre}.pdf`;
  a.click();
  window.URL.revokeObjectURL(url);
});