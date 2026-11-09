(function () {
  var TABS = [
    { id: "inicio", label: "Inicio" },
    { id: "marco", label: "El Proyecto" },
    { id: "proyecto", label: "" },
    { id: "metodologia", label: "Metodología" },
    { id: "contacto", label: "Contacto y Equipo" }
  ];
  var proyecto = "cosmetica";
  var tab = "inicio";
  var menu = document.getElementById("menu");
  var main = document.getElementById("contenido");

  function nombreProyecto() {
    return window.SITIO.proyectos[proyecto].nombre;
  }

  function renderMenu() {
    menu.innerHTML = "";
    TABS.forEach(function (t) {
      var b = document.createElement("button");
      b.textContent = t.id === "proyecto" ? nombreProyecto() : t.label;
      b.className = t.id === tab ? "activo" : "";
      b.onclick = function () { tab = t.id; render(); };
      menu.appendChild(b);
    });
  }

  function bloque(b) {
    var html = "";
    var cls = b.clase ? ' class="' + b.clase + '"' : "";
    if (b.h3) html += "<h3>" + b.h3 + "</h3>";
    if (b.p) html += "<p" + cls + ">" + b.p + "</p>";
    if (b.ul) html += "<ul>" + b.ul.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
    if (b.docs) html += b.docs.map(function (d) { return '<span class="doc">' + d + "</span>"; }).join("");
    if (b.tabla) {
      html += "<table><thead><tr>" + b.tabla.cabecera.map(function (c) { return "<th>" + c + "</th>"; }).join("") + "</tr></thead><tbody>";
      html += b.tabla.filas.map(function (f) { return "<tr>" + f.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("");
      html += "</tbody></table>";
    }
    if (b.tarjetas) {
      html += '<div class="tarjetas">' + b.tarjetas.map(function (t) {
        return '<div class="tarjeta" data-ir="' + t.ir + '"><h3>' + t.titulo + "</h3><p>" + t.texto + "</p></div>";
      }).join("") + "</div>";
    }
    return html;
  }

  function render() {
    var data = tab === "proyecto" ? window.SITIO.proyectos[proyecto].proyecto : window.SITIO[tab];
    document.body.className = proyecto;
    renderMenu();
    var html = "<h2>" + data.titulo + "</h2>";
    html += data.bloques.map(bloque).join("");
    main.innerHTML = html;
    main.querySelectorAll("[data-ir]").forEach(function (el) {
      el.onclick = function () { proyecto = el.getAttribute("data-ir"); tab = "proyecto"; syncSelector(); render(); };
    });
    window.scrollTo(0, 0);
  }

  function syncSelector() {
    document.querySelectorAll(".selector button").forEach(function (b) {
      b.className = b.getAttribute("data-proyecto") === proyecto ? "activo" : "";
    });
  }

  document.querySelectorAll(".selector button").forEach(function (b) {
    b.onclick = function () { proyecto = b.getAttribute("data-proyecto"); syncSelector(); render(); };
  });

  render();
})();
