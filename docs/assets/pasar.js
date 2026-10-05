(function () {
  "use strict";
  var base = document.currentScript.src.replace(/[^\/]*$/, "");
  var NOMBRES = { dart: "Dart", java: "Java", kotlin: "Kotlin", python: "Python" };
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function svgDe(id) {
    var l = (window.LENGUAJES || []).filter(function (x) { return x.id === id; })[0];
    return l ? l.svg : "";
  }
  function init() {
    var host = document.getElementById("pasar-tabla");
    if (!host) return;
    var m = location.hash.replace("#", "").split("-");
    var from = NOMBRES[m[0]] ? m[0] : "dart";
    var to = NOMBRES[m[1]] && m[1] !== from ? m[1] : (from === "kotlin" ? "java" : "kotlin");
    var rows = [];
    function pintaSel(cont, actual, onPick) {
      cont.innerHTML = "";
      Object.keys(NOMBRES).forEach(function (id) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "pasar-btn" + (id === actual ? " on" : "");
        b.title = NOMBRES[id]; b.innerHTML = svgDe(id);
        b.addEventListener("click", function () { onPick(id); });
        cont.appendChild(b);
      });
    }
    function pinta() {
      location.hash = from + "-" + to;
      pintaSel(document.getElementById("sel-from"), from, function (id) { from = id; if (to === id) to = from === "kotlin" ? "java" : "kotlin"; pinta(); });
      pintaSel(document.getElementById("sel-to"), to, function (id) { to = id; if (from === id) from = to === "dart" ? "java" : "dart"; pinta(); });
      var h = "";
      rows.forEach(function (r) {
        h += '<div class="pasar-fila"><h4>' + esc(r.titulo) + "</h4>" +
          '<div><div class="etq">' + svgDe(from) + NOMBRES[from] + "</div><pre><code>" + esc(r.code[from]) + "</code></pre></div>" +
          '<div><div class="etq">' + svgDe(to) + NOMBRES[to] + "</div><pre><code>" + esc(r.code[to]) + "</code></pre></div></div>";
      });
      host.innerHTML = h;
    }
    fetch(base + "pasar.json").then(function (r) { return r.json(); }).then(function (d) { rows = d; pinta(); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
