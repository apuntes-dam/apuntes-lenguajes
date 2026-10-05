/* Selector de lenguaje + modo admin para soluciones. Compartido por todas las webs. */
(function () {
  "use strict";
  var ORIGIN = "https://apuntes-dam.github.io/";
  var HUB = { repo: "apuntes-lenguajes", name: "Todos los lenguajes" };
  var LANGS = [
    { id: "dart", repo: "dart-flutter-apuntes", name: "Dart y Flutter",
      svg: '<svg viewBox="0 0 64 64"><path fill="#40c4ff" d="M32 4 56 28 40 28 32 20 12 40 4 32z"/><path fill="#0175c2" d="M32 60 8 36l16 0 8 8 20-20 8 8z"/></svg>' },
    { id: "java", repo: "java-apuntes", name: "Java",
      svg: '<svg viewBox="0 0 64 64"><path fill="#ff9a3c" d="M12 28h30v14a12 12 0 0 1-12 12h-6a12 12 0 0 1-12-12z"/><path fill="none" stroke="#ff9a3c" stroke-width="4" d="M42 32h4a6 6 0 0 1 0 12h-4"/><path fill="none" stroke="#e8491d" stroke-width="3" stroke-linecap="round" d="M20 22c-3-4 3-6 0-10M30 22c-3-4 3-6 0-10"/><rect x="10" y="56" width="34" height="3" rx="1.5" fill="#e8491d"/></svg>' },
    { id: "kotlin", repo: "kotlin-apuntes", name: "Kotlin",
      svg: '<svg viewBox="0 0 64 64"><defs><linearGradient id="kg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#ff8a3d"/><stop offset="1" stop-color="#7f52ff"/></linearGradient></defs><rect x="6" y="6" width="52" height="52" rx="12" fill="url(#kg)"/><path fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" d="M22 16v32M22 32 40 16M27 31l15 17"/></svg>' },
    { id: "python", repo: "python-apuntes", name: "Python",
      svg: '<svg viewBox="0 0 64 64"><rect x="6" y="6" width="34" height="34" rx="10" fill="#3776ab"/><rect x="24" y="24" width="34" height="34" rx="10" fill="#ffd43b"/><circle cx="17" cy="17" r="3.5" fill="#fff"/><circle cx="47" cy="47" r="3.5" fill="#3776ab"/></svg>' }
  ];
  window.LENGUAJES = LANGS;
  var HUBSVG = '<svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z"/></svg>';

  var here = location.pathname.match(/^\/([^\/]+)\/(.*)$/);
  var repo = here ? here[1] : "";
  var rest = here ? here[2] : "";

  /* ---------- Selector de lenguaje ---------- */
  function buildSwitcher() {
    var inner = document.querySelector(".md-header__inner");
    if (!inner || document.querySelector(".lang-switch")) return;
    var box = document.createElement("nav");
    box.className = "lang-switch";
    box.setAttribute("aria-label", "Cambiar de lenguaje");
    var hub = document.createElement("a");
    hub.className = "lang-btn lang-hub" + (repo === HUB.repo ? " current" : "");
    hub.href = ORIGIN + HUB.repo + "/";
    hub.title = HUB.name;
    hub.innerHTML = HUBSVG;
    box.appendChild(hub);
    LANGS.forEach(function (l) {
      var a = document.createElement("a");
      a.className = "lang-btn" + (l.repo === repo ? " current" : "");
      a.href = ORIGIN + l.repo + "/" + rest;
      a.title = l.name;
      a.innerHTML = l.svg;
      if (l.repo !== repo) {
        a.addEventListener("click", function (ev) {
          ev.preventDefault();
          var target = ORIGIN + l.repo + "/" + rest;
          var root = ORIGIN + l.repo + "/";
          fetch(target, { method: "HEAD" })
            .then(function (r) { location.href = r.ok ? target : root; })
            .catch(function () { location.href = root; });
        });
      }
      box.appendChild(a);
    });
    var title = inner.querySelector(".md-header__title");
    if (title) title.after(box); else inner.appendChild(box);
  }

  /* ---------- Modo admin: soluciones cifradas ---------- */
  var script = document.currentScript;
  var BASE = script ? script.src.replace(/[^\/]*$/, "") : "";
  var store = {
    get: function () { try { return sessionStorage.getItem("solpass") || localStorage.getItem("solpass"); } catch (e) { return null; } },
    set: function (p, remember) { try { (remember ? localStorage : sessionStorage).setItem("solpass", p); } catch (e) {} },
    clear: function () { try { sessionStorage.removeItem("solpass"); localStorage.removeItem("solpass"); } catch (e) {} }
  };
  var dataPromise = null;
  function loadData() {
    if (!dataPromise) dataPromise = fetch(BASE + "soluciones.json").then(function (r) { return r.json(); });
    return dataPromise;
  }
  function b64(s) { var bin = atob(s), a = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i); return a; }
  function deriveKey(pass, d) {
    var enc = new TextEncoder();
    return crypto.subtle.importKey("raw", enc.encode(pass), "PBKDF2", false, ["deriveKey"]).then(function (k) {
      return crypto.subtle.deriveKey({ name: "PBKDF2", salt: b64(d.salt), iterations: d.iter, hash: "SHA-256" }, k,
        { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
    });
  }
  function decrypt(key, item) {
    return crypto.subtle.decrypt({ name: "AES-GCM", iv: b64(item.iv) }, key, b64(item.ct))
      .then(function (buf) { return new TextDecoder().decode(buf); });
  }
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function unlockAll(pass) {
    return loadData().then(function (d) {
      return deriveKey(pass, d).then(function (key) {
        return decrypt(key, d.check).then(function (ok) {
          if (ok !== "ok") throw new Error("bad");
          var blocks = document.querySelectorAll(".sol[data-key]");
          var jobs = [];
          blocks.forEach(function (el) {
            var item = d.items[el.getAttribute("data-key")];
            if (!item) return;
            jobs.push(decrypt(key, item).then(function (code) {
              var body = el.querySelector(".sol-body");
              body.innerHTML = '<p class="sol-aviso sol-abierta">🔓 Modo admin: solución completa</p><pre><code>' + esc(code) + "</code></pre>";
              el.classList.add("unlocked");
            }));
          });
          return Promise.all(jobs);
        });
      });
    });
  }

  function adminButton() {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "sol-admin";
    document.body.appendChild(b);
    function paint() {
      var open = !!store.get();
      b.textContent = open ? "🔓 Bloquear soluciones" : "🔒 Admin";
      b.title = open ? "Volver a bloquear las soluciones" : "Desbloquear soluciones (solo admin)";
    }
    paint();
    b.addEventListener("click", function () {
      if (store.get()) { store.clear(); location.reload(); return; }
      var pass = window.prompt("Contraseña de admin:");
      if (!pass) return;
      unlockAll(pass).then(function () {
        store.set(pass, window.confirm("¿Recordar en este equipo? (Cancelar = solo esta sesión)"));
        paint();
      }).catch(function () { window.alert("Contraseña incorrecta."); });
    });
    var saved = store.get();
    if (saved) unlockAll(saved).catch(function () { store.clear(); paint(); });
  }

  /* ---------- Unidades: ejercicios que se desbloquean al terminar la teoría (bloqueo suave) ---------- */
  function unidadHecha(u) { try { return localStorage.getItem("unidad:" + u) === "1"; } catch (e) { return false; } }
  function marcarUnidad(u, v) {
    try { if (v) localStorage.setItem("unidad:" + u, "1"); else localStorage.removeItem("unidad:" + u); } catch (e) {}
  }
  function initUnidades() {
    document.querySelectorAll(".ej-check").forEach(function (el) {
      var u = el.getAttribute("data-unit");
      var label = document.createElement("label");
      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = unidadHecha(u);
      label.appendChild(cb);
      label.appendChild(document.createTextNode(" He leído y practicado esta unidad"));
      cb.addEventListener("change", function () { marcarUnidad(u, cb.checked); });
      el.appendChild(label);
    });

    document.querySelectorAll(".u-estado").forEach(function (el) {
      el.textContent = unidadHecha(el.getAttribute("data-unit")) ? "✅ completada" : "🔒 ejercicios bloqueados";
    });

    var gate = document.querySelector(".ej-gate");
    if (!gate) return;
    var u = gate.getAttribute("data-unit");
    var resto = [];
    for (var n = gate.nextElementSibling; n; n = n.nextElementSibling) resto.push(n);
    function mostrar() {
      resto.forEach(function (e) { e.classList.remove("ej-oculto"); });
      gate.innerHTML = "";
      gate.classList.add("abierta");
    }
    if (unidadHecha(u) || store.get()) { mostrar(); return; }
    resto.forEach(function (e) { e.classList.add("ej-oculto"); });
    gate.classList.add("cerrada");
    gate.innerHTML = '<strong>🔒 Ejercicios bloqueados</strong><p>Antes de empezar, lee y practica la teoría de <em>' +
      (gate.getAttribute("data-nombre") || "esta unidad") + '</em>. Cuando termines, marca la unidad como leída y los ejercicios se desbloquean.</p>' +
      '<p><a class="md-button md-button--primary" href="../">Ir a la teoría de la unidad</a> ' +
      '<button type="button" class="md-button ej-desbloquear">Ya la domino: desbloquear</button></p>';
    gate.querySelector(".ej-desbloquear").addEventListener("click", function () { marcarUnidad(u, true); mostrar(); });
  }

  function init() {
    buildSwitcher();
    initUnidades();
    if (document.querySelector(".sol[data-key]")) adminButton();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
