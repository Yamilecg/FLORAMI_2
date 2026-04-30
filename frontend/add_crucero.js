// =========================
// CONTADOR ADULTOS / NIÑOS
// =========================
function setupContador(id) {
  const input = document.getElementById(id);
  if (!input) return;

  input.closest(".contador").querySelector(".btn-minus").addEventListener("click", () => {
    const val = parseInt(input.value) || 0;
    if (val > 0) input.value = val - 1;
    if (id === "ninos") actualizarEdades();
  });

  input.closest(".contador").querySelector(".btn-plus").addEventListener("click", () => {
    input.value = (parseInt(input.value) || 0) + 1;
    if (id === "ninos") actualizarEdades();
  });

  if (id === "ninos") {
    input.addEventListener("change", actualizarEdades);
  }
}

function actualizarEdades() {
  const ninos = parseInt(document.getElementById("ninos").value) || 0;
  const container = document.getElementById("edades-ninos-container");
  const grid = document.getElementById("edades-ninos");

  container.style.display = ninos > 0 ? "block" : "none";
  grid.innerHTML = "";

  for (let i = 1; i <= ninos; i++) {
    const div = document.createElement("div");
    div.classList.add("edad-nino");
    div.innerHTML = `
      <label>Niño ${i}</label>
      <input type="number" name="edad_nino" placeholder="Edad" min="0" max="17">
    `;
    grid.appendChild(div);
  }
}

setupContador("adultos");
setupContador("ninos");

// =====================
// DESTINOS
// =====================
const destinosContainer = document.getElementById("destinos-container");
const addDestinoBtn = document.getElementById("add-destino");

if (addDestinoBtn) {
  addDestinoBtn.addEventListener("click", () => {
    const div = document.createElement("div");
    div.classList.add("destino");
    div.innerHTML = `
      <input type="text" name="destino" placeholder="Ingrese un destino">
      <input type="text" name="nombre_hospedaje" placeholder="Nombre del hospedaje">
      <button type="button" class="remove">X</button>
    `;
    destinosContainer.appendChild(div);
  });

  destinosContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
      e.target.parentElement.remove();
    }
  });
}

// =====================
// ITINERARIO
// =====================
const itinerarioContainer = document.getElementById("itinerario-container");
const addItinerarioBtn = document.getElementById("add-itinerario");

if (addItinerarioBtn) {
  addItinerarioBtn.addEventListener("click", () => {
    const count = document.querySelectorAll(".itinerario-item").length + 1;
    const div = document.createElement("div");
    div.classList.add("itinerario-item");
    div.innerHTML = `
      <input type="text" name="dia" value="Día ${count}">
      <textarea name="descripcion" placeholder="Descripción del día..."></textarea>
      <button type="button" class="remove">X</button>
    `;
    itinerarioContainer.appendChild(div);
  });

  itinerarioContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
      e.target.parentElement.remove();
    }
  });
}

// =====================
// OBTENER DATOS
// =====================
function obtenerDestinos() {
  const destinos = [];
  document.querySelectorAll(".destino").forEach((d) => {
    destinos.push({
      destino: d.querySelector('[name="destino"]').value,
      nombre_hospedaje: d.querySelector('[name="nombre_hospedaje"]').value,
    });
  });
  return destinos;
}

function obtenerItinerario() {
  const dias = [];
  document.querySelectorAll(".itinerario-item").forEach((item) => {
    dias.push({
      dia: item.querySelector('[name="dia"]').value,
      descripcion: item.querySelector('[name="descripcion"]').value,
    });
  });
  return dias;
}