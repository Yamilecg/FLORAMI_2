// =====================
// PASAJEROS
// =====================
const pasajerosContainer = document.getElementById("pasajeros-container");
const addPasajeroBtn = document.getElementById("add-pasajero");

if (addPasajeroBtn) {
  addPasajeroBtn.addEventListener("click", () => {
    const div = document.createElement("div");
    div.classList.add("pasajero");

    div.innerHTML = `
      <input type="text" name="nombre" placeholder="Nombre(s)">
      <input type="text" name="Apellidos" placeholder="Apellido(s)">
      <input type="number" name="edad" placeholder="Edad">
      <button type="button" class="remove">X</button>
    `;

    pasajerosContainer.appendChild(div);
  });

  pasajerosContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
      e.target.parentElement.remove();
    }
  });
}

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

function obtenerPasajeros() {
  const pasajeros = [];

  document.querySelectorAll(".pasajero").forEach((p) => {
    pasajeros.push({
      nombre: p.querySelector('[name="nombre"]').value,
      Apellidos: p.querySelector('[name="Apellidos"]').value,
      edad: p.querySelector('[name="edad"]').value,
    });
  });

  return pasajeros;
}

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