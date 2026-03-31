// =========================
// SETUP GENÉRICO
// =========================
function setupDynamic(containerId, buttonId, template, className) {
  const container = document.getElementById(containerId);
  const btn = document.getElementById(buttonId);

  if (!btn || !container) return;

  btn.addEventListener("click", () => {
    const div = document.createElement("div");
    div.classList.add(className); // ✅ CLASE CORRECTA
    div.innerHTML = template;
    container.appendChild(div);
  });

  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
      e.target.parentElement.remove();
    }
  });
}

// =========================
// PASAJEROS
// =========================
setupDynamic(
  "pasajeros-container",
  "add-pasajero",
  `
  <input type="text" name="nombre" placeholder="Nombre(s)">
  <input type="text" name="apellidos" placeholder="Apellido(s)">
  <input type="number" name="edad" placeholder="Edad">
  <button type="button" class="remove">X</button>
`,
  "pasajero"
);

// =========================
// DESTINOS
// =========================
setupDynamic(
  "destinos-container",
  "add-destino",
  `
  <input type="text" name="destino" placeholder="Destino">
  <input type="text" name="hospedaje" placeholder="Hospedaje">
  <button type="button" class="remove">X</button>
`,
  "destino"
);

// =========================
// VUELOS EXTRA
// =========================
setupDynamic(
  "vuelos-extra-container",
  "add-vuelo-extra",
  `
  <input type="date" name="fecha_vuelo">
  <input type="text" name="origen" placeholder="Origen">
  <input type="text" name="destino" placeholder="Destino">
  <input type="text" name="detalle" placeholder="Hora, aerolínea, notas">
  <button type="button" class="remove">X</button>
`,
  "vuelo-extra"
);

// =========================
// ITINERARIO
// =========================
setupDynamic(
  "itinerario-container",
  "add-itinerario",
  `
  <input type="text" name="dia" placeholder="Día (Ej: Día 1)">
  <textarea name="descripcion" placeholder="Descripción del día..."></textarea>
  <button type="button" class="remove">X</button>
`,
  "itinerario-item"
);