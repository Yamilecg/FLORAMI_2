const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());

  data.pasajeros = obtenerPasajeros();
  data.destinos = obtenerDestinos();
  data.itinerario = obtenerItinerario();

  const res = await fetch("/generar", {
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

  // nombre dinámico
  const nombre = (data.Nombre_Viaje || "viaje").replace(/\s+/g, "_");
  a.download = `cotizacion_${nombre}.docx`;

  a.click();
  window.URL.revokeObjectURL(url);
});

data.restricciones = data.restricciones?.trim();
data.beneficios = data.beneficios?.trim();
data.actividades_detalladas = data.actividades_detalladas?.trim();
data.plan_alimentos = data.plan_alimentos?.trim();