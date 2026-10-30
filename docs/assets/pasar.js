/* Pasar de un lenguaje a otro: cada idea se ve lado a lado en dos «ventanas» (con su lenguaje, su color y un botón de copiar).
   El código ya viene resaltado desde pasar.json. El origen y el destino se eligen arriba (la barra se queda fija al bajar), se pueden
   intercambiar, y hay un filtro y un índice para saltar a una idea. La elección se guarda en la dirección (#dart-kotlin). */
(function () {
  "use strict";
  var base = document.currentScript.src.replace(/[^\/]*$/, "");
  var NOMBRES = { dart: "Dart", java: "Java", kotlin: "Kotlin", python: "Python", csharp: "C#" };
  var COLORES = { dart: "#0175C2", java: "#E76F00", kotlin: "#7F52FF", python: "#3776AB", csharp: "#9B4F96" };
  var COPIAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"/></svg>';
  var CAMBIAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.99 11 3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/></svg>';
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function norm(s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  function svgDe(id) {
    var l = (window.LENGUAJES || []).filter(function (x) { return x.id === id; })[0];
    return l ? l.svg : "";
  }
  function otro(id) { return id === "kotlin" ? "java" : "kotlin"; }

  function init() {
    var host = document.getElementById("pasar-tabla");
    if (!host) return;
    var selFrom = document.getElementById("sel-from"), selTo = document.getElementById("sel-to");
    var cambiar = document.getElementById("pasar-cambiar"), filtro = document.getElementById("pasar-filtro");
    var indice = document.getElementById("pasar-indice");
    var m = location.hash.replace("#", "").split("-");
    var from = NOMBRES[m[0]] ? m[0] : "dart";
    var to = NOMBRES[m[1]] && m[1] !== from ? m[1] : otro(from);
    var rows = [];

    cambiar.innerHTML = CAMBIAR;
    cambiar.addEventListener("click", function () {
      var t = from; from = to; to = t;
      cambiar.classList.toggle("gira");
      pinta();
    });

    function pintaSel(cont, actual, onPick) {
      cont.innerHTML = "";
      Object.keys(NOMBRES).forEach(function (id) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "pasar-btn" + (id === actual ? " on" : "");
        b.style.setProperty("--lc", COLORES[id]);
        b.title = NOMBRES[id];
        b.setAttribute("aria-label", NOMBRES[id]);
        b.setAttribute("aria-pressed", id === actual ? "true" : "false");
        b.innerHTML = svgDe(id) + "<span>" + NOMBRES[id] + "</span>";
        b.addEventListener("click", function () { onPick(id); });
        cont.appendChild(b);
      });
    }

    function ventana(lang, rol, r) {
      return '<div class="pasar-ventana" style="--lc:' + COLORES[lang] + '">' +
        '<div class="pv-barra"><span class="pv-lang">' + svgDe(lang) + NOMBRES[lang] + '</span><span class="pv-rol">' + rol + "</span>" +
        '<button type="button" class="pv-copiar" title="Copiar el código" aria-label="Copiar el código de ' + NOMBRES[lang] + '">' + COPIAR + "</button></div>" +
        '<div class="pv-cuerpo">' + r.html[lang] + (r.uso ? '<div class="pv-sub">Uso desde main</div>' + r.uso[lang] : "") + "</div></div>";
    }

    function pinta() {
      history.replaceState(null, "", "#" + from + "-" + to);
      pintaSel(selFrom, from, function (id) { from = id; if (to === id) to = otro(from); pinta(); });
      pintaSel(selTo, to, function (id) { to = id; if (from === id) from = to === "dart" ? "java" : "dart"; pinta(); });
      var h = "";
      rows.forEach(function (r, i) {
        h += '<section class="pasar-fila" data-i="' + i + '" data-t="' + esc(norm(r.titulo)) + '"><h4>' + esc(r.titulo) + "</h4>" +
          ventana(from, "Estoy en", r) + ventana(to, "Quiero pasar a", r) + "</section>";
      });
      host.innerHTML = h + '<p class="pasar-vacio" hidden>Ninguna idea coincide con lo que has escrito.</p>';
      filtrar();
    }

    function filtrar() {
      var q = norm(filtro.value.trim());
      var visibles = 0;
      host.querySelectorAll(".pasar-fila").forEach(function (f) {
        var si = !q || f.getAttribute("data-t").indexOf(q) >= 0;
        f.hidden = !si;
        if (si) visibles++;
      });
      var vacio = host.querySelector(".pasar-vacio");
      if (vacio) vacio.hidden = visibles > 0;
    }
    filtro.addEventListener("input", filtrar);

    /* copiar el código de una ventana */
    host.addEventListener("click", function (ev) {
      var b = ev.target.closest(".pv-copiar");
      if (!b) return;
      var texto = Array.prototype.map.call(b.closest(".pasar-ventana").querySelectorAll(".pv-cuerpo pre code"), function (c) { return c.textContent; }).join("\n\n");
      function ok() { b.classList.add("ok"); b.title = "¡Copiado!"; setTimeout(function () { b.classList.remove("ok"); b.title = "Copiar el código"; }, 1600); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(texto).then(ok, function () {});
    });

    function creaIndice() {
      var lista = indice.querySelector(".pi-lista");
      lista.innerHTML = "";
      rows.forEach(function (r, i) {
        var c = document.createElement("button");
        c.type = "button"; c.className = "pi-chip"; c.textContent = r.titulo;
        c.addEventListener("click", function () {
          if (filtro.value) { filtro.value = ""; filtrar(); }
          var f = host.querySelector('.pasar-fila[data-i="' + i + '"]');
          if (f) f.scrollIntoView({ behavior: "smooth", block: "start" });
          indice.open = false;
        });
        lista.appendChild(c);
      });
      indice.querySelector("summary").textContent = "Ir a una idea (" + rows.length + ")";
    }

    /* al bajar, la barra se queda fija pero compacta (solo iconos), para no comerse la pantalla */
    var barra = document.getElementById("pasar-sel");
    if (barra && "IntersectionObserver" in window) {
      var centinela = document.createElement("div");
      centinela.className = "pasar-centinela";
      barra.parentNode.insertBefore(centinela, barra);
      new IntersectionObserver(function (e) { barra.classList.toggle("compacta", !e[0].isIntersecting); }, { rootMargin: "-50px 0px 0px 0px" }).observe(centinela);
    }

    fetch(base + "pasar.json").then(function (r) { return r.json(); }).then(function (d) { rows = d; creaIndice(); pinta(); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
