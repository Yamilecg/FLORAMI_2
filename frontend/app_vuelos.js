const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());

  data.vuelos = obtenerVuelos();

const res = await fetch("/generar-vuelos", {
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

  const nombre = (data.Nombre_Viaje || "vuelos").replace(/\s+/g, "_");
  a.download = `cotización_vuelos_${nombre}.docx`;

  a.click();
  window.URL.revokeObjectURL(url);
});

function obtenerVuelos() {
  const vuelos = [];

  document.querySelectorAll(".vuelo").forEach((v) => {
    vuelos.push({
      origen: v.querySelector('[name="origen"]').value,
      destino: v.querySelector('[name="destino"]').value,
    });
  });

  return vuelos;
}