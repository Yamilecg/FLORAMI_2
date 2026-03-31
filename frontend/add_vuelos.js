const container = document.getElementById("vuelos-container");
const addBtn = document.getElementById("add-vuelo");

if (addBtn) {
  addBtn.addEventListener("click", () => {
    const div = document.createElement("div");
    div.classList.add("vuelo");

    div.innerHTML = `
      <input type="text" name="origen" placeholder="Ciudad de salida">
      <input type="text" name="destino" placeholder="Ciudad de llegada">
      <button type="button" class="remove">X</button>
    `;

    container.appendChild(div);
  });

  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
      e.target.parentElement.remove();
    }
  });
}