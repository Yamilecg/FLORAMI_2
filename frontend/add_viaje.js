// =========================
// SETUP GENÉRICO
// =========================
function setupDynamic(containerId, buttonId, template, className) {
  const container = document.getElementById(containerId);
  const btn = document.getElementById(buttonId);

  if (!btn || !container) return;

  btn.addEventListener("click", () => {
    const div = document.createElement("div");
    div.classList.add(className); 
    div.innerHTML = template;
    container.appendChild(div);
  });

  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
      e.target.closest(`.${className}`).remove();
    }
  });
}

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

// =========================
// VUELOS EXTRA
// =========================
const vuelosExtraContainer = document.getElementById("vuelos-extra-container");
const addVueloExtraBtn = document.getElementById("add-vuelo-extra");

if (addVueloExtraBtn) {
  addVueloExtraBtn.addEventListener("click", () => {
    const tr = document.createElement("tr");
    tr.classList.add("vuelo-extra");
    tr.innerHTML = `
      <td><input type="date" name="fecha_vuelo"></td>
      <td><input type="text" name="origen" placeholder="GDL"></td>
      <td><input type="text" name="destino" placeholder="CUN"></td>
      <td><input type="text" name="aerolinea" placeholder="Volaris"></td>
      <td><input type="time" name="hora_sale"></td>
      <td><input type="time" name="hora_llega"></td>
      <td><input type="text" name="costo_vuelo" placeholder="$5,000"></td>
      <td><button type="button" class="remove">X</button></td>
    `;
    vuelosExtraContainer.appendChild(tr);
  });

  vuelosExtraContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
      e.target.closest("tr").remove();
    }
  });
}

// =========================
// COSTOS EXTRA
// =========================
setupDynamic(
  "costos-extra-container",
  "add-costo-extra",
  `
  <input type="text" name="hotel" placeholder="Nombre del servicio">
  <textarea name="descripcion_servicio" placeholder="Detalles del servicio..."></textarea>
  <div class="grid-2">
    <input type="text" name="total_persona" placeholder="Costo por persona">
    <input type="text" name="total_general" placeholder="Total general">
  </div>
  <button type="button" class="remove">X</button>
  `,
  "costo-extra"
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

