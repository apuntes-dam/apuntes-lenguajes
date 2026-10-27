/* Selector de lenguaje + modo admin para soluciones. Compartido por todas las webs. */
(function () {
  "use strict";
  var ORIGIN = "https://apuntes-dam.github.io/";
  var HUB = { repo: "apuntes-lenguajes", name: "Todos los lenguajes" };
  var _n = 0;
  function u(s) { _n++; return s.replace(/id="(\w+)"/g, 'id="$1' + _n + '"').replace(/url\(#(\w+)\)/g, 'url(#$1' + _n + ')'); }
  var LANGS = [
    { id: "dart", repo: "dart-flutter-apuntes", name: "Dart y Flutter",
      svg: '<svg viewBox="0 0 64 64"><defs><linearGradient id="fa" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd6ff"/><stop offset="1" stop-color="#1e6fe8"/></linearGradient><linearGradient id="fb" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8ecff"/><stop offset="1" stop-color="#2a7ff0"/></linearGradient></defs><path fill="url(#fa)" d="M33 5H57L25 37 13 25Z"/><path fill="url(#fb)" d="M57 29H41L26 44 38 56H57L45 44Z"/></svg>' },
    { id: "java", repo: "java-apuntes", name: "Java",
      svg: '<svg viewBox="0 0 64 64"><defs><linearGradient id="jb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb347"/><stop offset="1" stop-color="#f2551a"/></linearGradient><linearGradient id="jf" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#f2551a"/><stop offset="1" stop-color="#ffc15a"/></linearGradient></defs><path fill="url(#jf)" d="M27 22C20 17 30 12 25 4 34 9 35 16 27 22z"/><path fill="url(#jf)" d="M37 22C31 18 39 14 35 8 43 12 43 18 37 22z"/><path fill="url(#jf)" d="M18 23C15 20 20 18 17 13 23 15 23 20 18 23z"/><ellipse cx="28" cy="57" rx="23" ry="4" fill="#4a505a"/><ellipse cx="28" cy="56" rx="21" ry="3" fill="none" stroke="#8a919c" stroke-width="1"/><path fill="none" stroke="url(#jb)" stroke-width="4.5" stroke-linecap="round" d="M47 31h2a6.5 6.5 0 0 1 0 13h-6"/><path fill="url(#jb)" d="M9 28h38c0 15-8 26-19 26S9 43 9 28z"/><ellipse cx="28" cy="28" rx="19" ry="4" fill="#8a2c0b"/><path fill="none" stroke="#ffe0a8" stroke-opacity=".55" stroke-width="2" stroke-linecap="round" d="M14 36c6 8 16 9 25 2"/></svg>' },
    { id: "kotlin", repo: "kotlin-apuntes", name: "Kotlin",
      svg: '<svg viewBox="0 0 64 64"><defs><linearGradient id="k1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffa21f"/><stop offset="1" stop-color="#ff5f6d"/></linearGradient><linearGradient id="k2" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#ff7a5a"/><stop offset="1" stop-color="#8f56e8"/></linearGradient><linearGradient id="k3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7f4fe0"/><stop offset="1" stop-color="#b04fb0"/></linearGradient></defs><path fill="url(#k3)" d="M30 32 42 28 57 49Q59 53 55 53H46Q44 53 43 51z"/><path fill="url(#k2)" d="M23 46V34L46 10Q48 8 51 8H55Q58 9 56 12z"/><rect x="9" y="8" width="14" height="46" rx="4" fill="url(#k1)"/></svg>' },
    { id: "python", repo: "python-apuntes", name: "Python",
      svg: '<svg viewBox="0 0 64 64"><defs><linearGradient id="pb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6bb0ee"/><stop offset="1" stop-color="#2f6aa5"/></linearGradient><linearGradient id="py" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe873"/><stop offset="1" stop-color="#f2b705"/></linearGradient></defs><path fill="url(#pb)" d="M30 4C20 4 20 8 20 12V16H31V18H15C9 18 7 22 7 31 7 40 9 44 14 44H18V38C18 33 22 30 27 30H37C42 30 45 27 45 22V13C45 7 40 4 30 4Z"/><circle cx="25.5" cy="9.5" r="2.4" fill="#fff"/><path transform="rotate(180 32 32)" fill="url(#py)" d="M30 4C20 4 20 8 20 12V16H31V18H15C9 18 7 22 7 31 7 40 9 44 14 44H18V38C18 33 22 30 27 30H37C42 30 45 27 45 22V13C45 7 40 4 30 4Z"/><circle cx="38.5" cy="54.5" r="2.4" fill="#fff"/></svg>' },
    { id: "csharp", repo: "csharp-apuntes", name: "C#",
      svg: '<svg viewBox="0 0 64 64"><defs><linearGradient id="cc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b57bff"/><stop offset="1" stop-color="#5b3fe0"/></linearGradient><linearGradient id="ch" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c58bff"/><stop offset="1" stop-color="#4fb3ff"/></linearGradient></defs><path fill="none" stroke="url(#cc)" stroke-width="9" stroke-linecap="round" d="M38 18A17 17 0 1 0 38 46"/><g fill="none" stroke="url(#ch)" stroke-width="3.6" stroke-linecap="round"><path d="M49 18 45 46M57 18 53 46M41 28H62M40 37H61"/></g></svg>' }
  ];
  window.LENGUAJES = LANGS;
  var HUBSVG = '<svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z"/></svg>';

  var here = location.pathname.match(/^\/([^\/]+)\/(.*)$/);
  var repo = here ? here[1] : "";
  var rest = here ? here[2] : "";
  /* Solo los cuatro lenguajes (y el hub) comparten estructura de páginas. En las demás webs
     (Git, Android, Web, SQL...) los iconos llevan a la portada del lenguaje, no a la misma ruta. */
  var ES_LENGUAJE = repo === HUB.repo || LANGS.some(function (l) { return l.repo === repo; });
  if (!ES_LENGUAJE) rest = "";

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
      a.innerHTML = u(l.svg);
      if (l.repo !== repo) a.addEventListener("click", function (ev) { ev.preventDefault(); irA(l); });
      box.appendChild(a);
    });
    var title = inner.querySelector(".md-header__title");
    if (title) title.after(box); else inner.appendChild(box);
    buildCompactSwitcher(box);
  }
  /* A la misma página en otro lenguaje; si no existe, a la portada de ese lenguaje */
  function irA(l) {
    var target = ORIGIN + l.repo + "/" + rest;
    var root = ORIGIN + l.repo + "/";
    fetch(target, { method: "HEAD" })
      .then(function (r) { location.href = r.ok ? target : root; })
      .catch(function () { location.href = root; });
  }
  /* Móvil: la fila de iconos no cabe en la cabecera (empujaba la búsqueda fuera de la pantalla),
     así que se sustituye por un solo botón con el lenguaje actual que abre una lista. */
  function buildCompactSwitcher(despuesDe) {
    var actual = LANGS.filter(function (l) { return l.repo === repo; })[0];
    var pick = document.createElement("div");
    pick.className = "lang-pick";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lang-pick-btn";
    btn.setAttribute("aria-haspopup", "true");
    btn.setAttribute("aria-expanded", "false");
    /* En el móvil el título del sitio se oculta (se cortaba a «Kotl…»): el botón lleva el nombre corto del sitio */
    var CORTOS = { "dart-flutter-apuntes": "Dart", "java-apuntes": "Java", "kotlin-apuntes": "Kotlin", "python-apuntes": "Python", "csharp-apuntes": "C#",
                   "git-apuntes": "Git", "sql-apuntes": "SQL", "android-apuntes": "Android", "web-apuntes": "Web", "procesos-apuntes": "Procesos", "apuntes-lenguajes": "Lenguajes" };
    var corto = CORTOS[repo] || "Lenguajes";
    btn.setAttribute("aria-label", "Cambiar de lenguaje (ahora: " + (actual ? actual.name : corto) + ")");
    btn.innerHTML = (actual ? u(actual.svg) : HUBSVG) + '<span class="lang-pick-txt">' + corto + '</span><svg class="lang-caret" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>';
    var menu = document.createElement("div");
    menu.className = "lang-menu";
    menu.hidden = true;
    function cerrar() { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); }
    function item(href, nombre, svg, actualEs, onclick) {
      var a = document.createElement("a");
      a.className = "lang-item" + (actualEs ? " current" : "");
      a.href = href;
      a.innerHTML = u(svg) + "<span>" + nombre + "</span>";
      if (onclick) a.addEventListener("click", function (ev) { ev.preventDefault(); onclick(); });
      menu.appendChild(a);
    }
    item(ORIGIN + HUB.repo + "/", HUB.name, HUBSVG, repo === HUB.repo, null);
    LANGS.forEach(function (l) {
      item(ORIGIN + l.repo + "/" + rest, l.name, l.svg, l.repo === repo, l.repo === repo ? null : function () { irA(l); });
    });
    btn.addEventListener("click", function (ev) {
      ev.stopPropagation();
      menu.hidden = !menu.hidden;
      btn.setAttribute("aria-expanded", menu.hidden ? "false" : "true");
    });
    document.addEventListener("click", function (ev) { if (!pick.contains(ev.target)) cerrar(); });
    document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && !menu.hidden) { cerrar(); btn.focus(); } });
    pick.appendChild(btn);
    pick.appendChild(menu);
    despuesDe.after(pick);
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

  /* ---------- Editor con vista previa (HTML, CSS y JavaScript) ---------- */
  var SHIM = "<script>(function(){var s=document.createElement('pre');s.id='__consola';" +
    "s.style.cssText='margin:0;padding:.5rem;background:#111;color:#8f8;font:12px monospace;white-space:pre-wrap';" +
    "function w(a){var t=Array.prototype.map.call(a,function(x){try{return typeof x==='object'?JSON.stringify(x):String(x)}catch(e){return String(x)}}).join(' ');" +
    "if(!s.parentNode)document.documentElement.appendChild(s);s.textContent+=t+'\\n';}" +
    "console.log=function(){w(arguments)};console.error=function(){w(['Error:'].concat([].slice.call(arguments)))};" +
    "window.addEventListener('error',function(e){w(['Error:',e.message])});})();</script>";

  function initDemos() {
    document.querySelectorAll(".demo[data-code]").forEach(function (el) {
      var original = el.getAttribute("data-code");
      var consola = el.getAttribute("data-consola") === "1";
      var alto = el.getAttribute("data-alto") || "14rem";
      var izq = document.createElement("div");
      var der = document.createElement("div");
      var et1 = document.createElement("div"); et1.className = "demo-etq"; et1.textContent = "Código (puedes editarlo)";
      var ta = document.createElement("textarea");
      ta.value = original; ta.spellcheck = false; ta.style.height = alto;
      ta.setAttribute("aria-label", "Código editable");
      var rest = document.createElement("button");
      rest.type = "button"; rest.className = "demo-rest"; rest.textContent = "↺ Restablecer";
      var et2 = document.createElement("div"); et2.className = "demo-etq"; et2.textContent = consola ? "Resultado y consola" : "Resultado";
      var fr = document.createElement("iframe");
      fr.setAttribute("sandbox", "allow-scripts"); fr.title = "Resultado"; fr.style.height = alto;
      function ejecutar() {
        var codigo = ta.value;
        if (consola && !/<[a-zA-Z!\/]/.test(codigo)) {      // JavaScript puro: se envuelve en <script>
          codigo = "<script>" + codigo + "</" + "script>";
        }
        fr.srcdoc = (consola ? SHIM : "") + codigo;
      }
      var t = null;
      ta.addEventListener("input", function () { clearTimeout(t); t = setTimeout(ejecutar, 350); });
      ta.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
          e.preventDefault();
          var i = ta.selectionStart;
          ta.value = ta.value.slice(0, i) + "  " + ta.value.slice(ta.selectionEnd);
          ta.selectionStart = ta.selectionEnd = i + 2;
        }
      });
      rest.addEventListener("click", function () { ta.value = original; ejecutar(); });
      izq.appendChild(et1); izq.appendChild(ta); izq.appendChild(rest);
      der.appendChild(et2); der.appendChild(fr);
      el.appendChild(izq); el.appendChild(der);
      ejecutar();
    });
  }

  /* ---------- Tema: predeterminado de cada web o estacional ---------- */
  var TEMAS = [
    { id: "", name: "Predeterminado", ico: "🎨" },
    { id: "auto", name: "Estacional (según la fecha)", ico: "📅" },
    { grupo: "Estaciones" },
    { id: "primavera", name: "Primavera", ico: "🌸" },
    { id: "verano", name: "Verano", ico: "☀️" },
    { id: "otono", name: "Otoño", ico: "🍂" },
    { id: "invierno", name: "Invierno", ico: "❄️" },
    { grupo: "Especiales" },
    { id: "bloques", name: "Bloques (voxel)", ico: "🟩" },
    { id: "pixel", name: "Pixel RPG oscuro", ico: "👾" },
    { id: "apocaliptico", name: "Apocalíptico", ico: "☢️" },
    { id: "neon", name: "Neón ciberpunk", ico: "🌆" },
    { id: "espacio", name: "Espacio", ico: "🪐" },
    { id: "navidad", name: "Navidad (nieve)", ico: "🎄" },
    { id: "tormenta", name: "Tormenta (lluvia y rayos)", ico: "⛈️" },
    { id: "futuro", name: "Futuro y naturaleza", ico: "🌿" },
    { id: "halloween", name: "Halloween (efectos de miedo)", ico: "🎃" }
  ];
  var tema = {
    get: function () { try { return localStorage.getItem("tema") || ""; } catch (e) { return ""; } },
    set: function (v) { try { if (v) localStorage.setItem("tema", v); else localStorage.removeItem("tema"); } catch (e) {} }
  };
  /* ---------- Tema personal: la persona elige una imagen y los colores salen de ella ----------
     La imagen NO se sube a ningún sitio: se reduce en el propio navegador, se guarda en el almacenamiento local de
     quien la elige y solo la ve esa persona. Tampoco se puede pasar por enlace ni por parámetro. */
  var PERS_CLAVE = "tema-pers", persMem = null, persGuardada = true;
  var PERS_VARS = ["--per-p", "--per-pd", "--per-pl", "--per-ad", "--per-al", "--per-h", "--per-img"];
  var HSL_OK = /^hsl\(\d{1,3} \d{1,3}% \d{1,3}%\)$/;
  function persDatos() {
    try { var t = localStorage.getItem(PERS_CLAVE); if (t) return JSON.parse(t); } catch (e) {}
    return persMem;
  }
  function persBorrar() { persMem = null; try { localStorage.removeItem(PERS_CLAVE); } catch (e) {} }
  function persQuitarVars() { PERS_VARS.forEach(function (v) { document.documentElement.style.removeProperty(v); }); }
  function persAplicar() {
    var d = persDatos();
    if (!d || typeof d.img !== "string" || d.img.indexOf("data:image/jpeg;base64,") !== 0 || typeof d.h !== "number") return false;
    var ok = ["p", "pd", "pl", "ad", "al"].every(function (k) { return typeof d[k] === "string" && HSL_OK.test(d[k]); });
    if (!ok) return false;
    var st = document.documentElement.style;
    st.setProperty("--per-p", d.p); st.setProperty("--per-pd", d.pd); st.setProperty("--per-pl", d.pl);
    st.setProperty("--per-ad", d.ad); st.setProperty("--per-al", d.al);
    st.setProperty("--per-h", String(Math.round(d.h)));
    st.setProperty("--per-img", 'url("' + d.img + '")');
    return true;
  }
  function hsl(h, s, l) { return "hsl(" + Math.round(h) + " " + Math.round(s * 100) + "% " + Math.round(l * 100) + "%)"; }
  /* Tono dominante (los píxeles grises, muy oscuros o muy claros pesan poco) y un segundo tono distinto */
  function persPaleta(canvas) {
    var N = 48, c = document.createElement("canvas");
    c.width = N; c.height = N;
    var x = c.getContext("2d");
    x.drawImage(canvas, 0, 0, N, N);
    var d = x.getImageData(0, 0, N, N).data, peso = [], sat = [], k;
    for (k = 0; k < 36; k++) { peso.push(0); sat.push(0); }
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i] / 255, g = d[i + 1] / 255, b = d[i + 2] / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, dl = mx - mn;
      if (dl < 0.08 || l < 0.1 || l > 0.93) continue;
      var s = dl / (1 - Math.abs(2 * l - 1)), hh;
      if (mx === r) hh = ((g - b) / dl) % 6; else if (mx === g) hh = (b - r) / dl + 2; else hh = (r - g) / dl + 4;
      hh = (hh * 60 + 360) % 360;
      var w = s * (1 - Math.abs(2 * l - 1));
      k = Math.floor(hh / 10) % 36;
      peso[k] += w; sat[k] += s * w;
    }
    var k1 = 0;
    for (k = 1; k < 36; k++) if (peso[k] > peso[k1]) k1 = k;
    if (peso[k1] < 0.5) return { h: 215, p: hsl(215, 0.2, 0.27), pd: hsl(215, 0.2, 0.17), pl: hsl(215, 0.2, 0.45), ad: hsl(205, 0.7, 0.7), al: hsl(205, 0.7, 0.28) };
    var h1 = k1 * 10 + 5, s1 = Math.min(0.62, Math.max(0.3, sat[k1] / peso[k1])), k2 = -1;
    for (k = 0; k < 36; k++) {
      var dist = Math.min(Math.abs(k - k1), 36 - Math.abs(k - k1));
      if (dist >= 4 && peso[k] >= 0.3 * peso[k1] && (k2 < 0 || peso[k] > peso[k2])) k2 = k;
    }
    var h2 = k2 >= 0 ? k2 * 10 + 5 : (h1 + 40) % 360;
    return { h: h1, p: hsl(h1, s1, 0.27), pd: hsl(h1, s1, 0.17), pl: hsl(h1, s1, 0.45), ad: hsl(h2, 0.85, 0.68), al: hsl(h2, 0.75, 0.28) };
  }
  /* Lee la imagen, la reduce y la vuelve a codificar (así se descartan metadatos y no queda nada raro dentro) */
  function persCargar(file, cb) {
    if (!file || !/^image\/(jpeg|png|webp|gif|avif)$/.test(file.type)) return cb("Elige una imagen JPG, PNG, WebP, GIF o AVIF.");
    if (file.size > 15 * 1024 * 1024) return cb("La imagen pesa demasiado (máximo 15 MB).");
    var url = URL.createObjectURL(file), im = new Image();
    im.onerror = function () { URL.revokeObjectURL(url); cb("No se pudo leer esa imagen."); };
    im.onload = function () {
      URL.revokeObjectURL(url);
      var esc = Math.min(1, 1600 / im.naturalWidth);
      var w = Math.max(1, Math.round(im.naturalWidth * esc)), h = Math.max(1, Math.round(im.naturalHeight * esc));
      var c = document.createElement("canvas");
      c.width = w; c.height = h;
      var x = c.getContext("2d");
      x.fillStyle = "#000"; x.fillRect(0, 0, w, h);
      x.drawImage(im, 0, 0, w, h);
      var q = 0.82, data;
      do { data = c.toDataURL("image/jpeg", q); q -= 0.12; } while (data.length > 600000 && q > 0.3);
      var p = persPaleta(c);
      persMem = { img: data, h: p.h, p: p.p, pd: p.pd, pl: p.pl, ad: p.ad, al: p.al, asp: w / h };
      try { localStorage.setItem(PERS_CLAVE, JSON.stringify(persMem)); persGuardada = true; } catch (e) { persGuardada = false; }
      cb(null);
    };
    im.src = url;
  }

  /* ---------- Ajustes de la imagen de la franja: posición, zoom, altura, visibilidad y desvanecido ----------
     Se guardan por tema, en el navegador de cada persona, y valen también para los temas con imagen de la web. */
  var AJ_CLAVE = "tema-ajustes";
  var AJ_VARS = ["--b-x", "--b-y", "--b-zoom", "--b-alto", "--b-op", "--b-corte", "--b-asp"];
  var CON_IMAGEN = ["primavera", "verano", "otono", "invierno", "bloques", "pixel", "apocaliptico", "neon", "espacio", "navidad", "tormenta", "futuro", "halloween", "personal"];
  var AJ_DEF = { x: 50, y: 50, zoom: 100, alto: 75, vis: null, fade: 65 }; /* alto en décimas de rem; vis nulo = el de cada tema */
  function ajLeer() { try { return JSON.parse(localStorage.getItem(AJ_CLAVE) || "{}") || {}; } catch (e) { return {}; } }
  function ajDe(id) { var g = ajLeer()[id] || {}, a = {}; for (var k in AJ_DEF) a[k] = (g[k] === undefined) ? AJ_DEF[k] : g[k]; return a; }
  function ajGuardar(id, a) { try { var t = ajLeer(); t[id] = a; localStorage.setItem(AJ_CLAVE, JSON.stringify(t)); } catch (e) {} }
  function ajBorrar(id) { try { var t = ajLeer(); delete t[id]; localStorage.setItem(AJ_CLAVE, JSON.stringify(t)); } catch (e) {} }
  function ajNum(v, min, max, def) { v = Number(v); return isFinite(v) ? Math.min(max, Math.max(min, v)) : def; }
  function ajAplicar(real) {
    var st = document.documentElement.style;
    AJ_VARS.forEach(function (v) { st.removeProperty(v); });
    if (CON_IMAGEN.indexOf(real) < 0) return;
    var a = ajDe(real);
    st.setProperty("--b-x", ajNum(a.x, 0, 100, 50) + "%");
    st.setProperty("--b-y", ajNum(a.y, 0, 100, 50) + "%");
    st.setProperty("--b-zoom", String(ajNum(a.zoom, 100, 300, 100) / 100));
    st.setProperty("--b-alto", (ajNum(a.alto, 30, 160, 75) / 10) + "rem");
    if (a.vis !== null && a.vis !== undefined) st.setProperty("--b-op", String(ajNum(a.vis, 5, 100, 50) / 100));
    st.setProperty("--b-corte", (100 - ajNum(a.fade, 0, 100, 65)) + "%");
    var asp = 5.36;
    if (real === "personal") { var d = persDatos(); if (d && typeof d.asp === "number") asp = ajNum(d.asp, 1, 12, 5.36); }
    st.setProperty("--b-asp", String(asp));
  }
  /* Panel flotante con deslizadores: los cambios se ven al momento en la propia franja de la página */
  function abrirAjustes() {
    var real = document.documentElement.getAttribute("data-estacion");
    if (CON_IMAGEN.indexOf(real) < 0 || document.querySelector(".aj-panel")) return;
    var a = ajDe(real);
    var op = parseFloat(getComputedStyle(document.querySelector(".md-main"), "::before").opacity);
    var visInicial = (a.vis === null || a.vis === undefined) ? Math.round((isFinite(op) ? op : 0.5) * 100) : a.vis;
    var panel = document.createElement("div");
    panel.className = "aj-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Ajustar la imagen de la cabecera");
    var h3 = document.createElement("h3");
    h3.textContent = "Ajustar imagen";
    panel.appendChild(h3);
    var CAMPOS = [
      ["x", "Parte visible: izquierda ↔ derecha", 0, 100, 1], ["y", "Parte visible: arriba ↕ abajo", 0, 100, 1],
      ["zoom", "Zoom", 100, 300, 5], ["alto", "Altura de la franja", 30, 160, 5],
      ["vis", "Visibilidad de la imagen", 5, 100, 5], ["fade", "Desvanecido hacia el fondo", 0, 100, 5]
    ];
    var entradas = {};
    function texto(k, v) { return k === "alto" ? (v / 10).toFixed(1) + " rem" : v + "%"; }
    CAMPOS.forEach(function (c) {
      var fila = document.createElement("div");
      fila.className = "aj-fila";
      var lab = document.createElement("label");
      var id = "aj-" + c[0];
      lab.setAttribute("for", id);
      lab.textContent = c[1];
      var inp = document.createElement("input");
      inp.type = "range"; inp.id = id; inp.min = c[2]; inp.max = c[3]; inp.step = c[4];
      inp.value = c[0] === "vis" ? visInicial : a[c[0]];
      var out = document.createElement("output");
      out.textContent = texto(c[0], Number(inp.value));
      inp.addEventListener("input", function () {
        a[c[0]] = Number(inp.value);       /* «vis» solo se guarda si la persona lo mueve */
        out.textContent = texto(c[0], a[c[0]]);
        ajGuardar(real, a); ajAplicar(real);
      });
      entradas[c[0]] = [inp, out];
      fila.appendChild(lab); fila.appendChild(inp); fila.appendChild(out);
      panel.appendChild(fila);
    });
    var nota = document.createElement("p");
    nota.className = "aj-nota";
    nota.textContent = "Los cambios se ven al momento y se guardan, para este tema, solo en este navegador. Menos desvanecido y más visibilidad enseñan más imagen; el color de fondo del tema sigue detrás.";
    panel.appendChild(nota);
    var botones = document.createElement("div");
    botones.className = "aj-botones";
    var bReset = document.createElement("button");
    bReset.type = "button"; bReset.textContent = "Restablecer";
    bReset.addEventListener("click", function () {
      ajBorrar(real); ajAplicar(real);
      a = ajDe(real);
      var o2 = parseFloat(getComputedStyle(document.querySelector(".md-main"), "::before").opacity);
      CAMPOS.forEach(function (c) {
        var v = c[0] === "vis" ? Math.round((isFinite(o2) ? o2 : 0.5) * 100) : a[c[0]];
        entradas[c[0]][0].value = v;
        entradas[c[0]][1].textContent = texto(c[0], v);
      });
    });
    var bOk = document.createElement("button");
    bOk.type = "button"; bOk.className = "principal"; bOk.textContent = "Listo";
    function cerrarPanel() { document.removeEventListener("keydown", tecla); panel.remove(); }
    function tecla(ev) { if (ev.key === "Escape") cerrarPanel(); }
    bOk.addEventListener("click", cerrarPanel);
    document.addEventListener("keydown", tecla);
    botones.appendChild(bReset); botones.appendChild(bOk);
    panel.appendChild(botones);
    document.body.appendChild(panel);
    entradas.x[0].focus();
  }

  /* Hemisferio norte: primavera 20/3, verano 21/6, otoño 23/9, invierno 21/12 */
  function estacionActual() {
    var d = new Date(), v = (d.getMonth() + 1) * 100 + d.getDate();
    if (v >= 1221 || v < 320) return "invierno";
    if (v < 621) return "primavera";
    if (v < 923) return "verano";
    return "otono";
  }
  function aplicarTema(id) {
    var real = id === "auto" ? estacionActual() : id;
    if (real === "personal" && !persAplicar()) real = "";   // sin imagen guardada: tema predeterminado
    if (real !== "personal") persQuitarVars();
    ajAplicar(real);
    if (real) document.documentElement.setAttribute("data-estacion", real);
    else document.documentElement.removeAttribute("data-estacion");
  }
  aplicarTema(tema.get());

  /* ---------- Halloween: algo te observa ----------
     Solo con ese tema elegido a mano. Una cara translúcida asoma por el borde de la pantalla
     y gira hacia el puntero. */
  var ojos = { el: null, mueve: null };
  function sessionGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function sessionSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  function quitarObservador() {
    if (ojos.el) { ojos.el.remove(); ojos.el = null; }
    if (ojos.mueve) { document.removeEventListener("pointermove", ojos.mueve); ojos.mueve = null; }
  }
  function ajustarObservador() {
    ajustarNieve();      // se llama cada vez que cambia el tema, igual que el observador
    ajustarLluvia();
    ajustarAmbiente();
    quitarObservador();
    if (tema.get() !== "halloween") return;
    var quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var lado = sessionGet("ojos-lado");
    if (!lado) { lado = Math.random() < 0.5 ? "izq" : "der"; sessionSet("ojos-lado", lado); }
    var alto = sessionGet("ojos-alto");
    if (!alto) { alto = String(25 + Math.round(Math.random() * 40)); sessionSet("ojos-alto", alto); }
    var el = document.createElement("div");
    el.className = "ojos " + lado;
    el.style.top = alto + "%";
    el.style.backgroundImage = "url(" + ORIGIN + HUB.repo + "/assets/temas/ojos.webp)";
    el.setAttribute("aria-hidden", "true");
    document.body.appendChild(el);
    ojos.el = el;
    if (quieto) return;
    var libre = false;
    ojos.mueve = function (ev) {
      if (libre) return;
      libre = true;
      requestAnimationFrame(function () {
        libre = false;
        var r = el.getBoundingClientRect();
        var dx = ev.clientX - (r.left + r.width / 2), dy = ev.clientY - (r.top + r.height / 2);
        var ang = Math.atan2(dy, lado === "izq" ? dx : -dx) * 180 / Math.PI;
        var giro = Math.max(-14, Math.min(14, ang / 6));
        el.style.setProperty("--giro", giro.toFixed(1) + "deg");
      });
    };
    document.addEventListener("pointermove", ojos.mueve, { passive: true });
  }

  /* ---------- Navidad: nieve ----------
     Solo con los temas Navidad e Invierno. Los copos van en un canvas fijo (sprites dibujados una vez, sin gradientes por fotograma)
     y al final de la página hay un montón de nieve que crece con los copos que caen en él. Con «reducir movimiento» no hay copos,
     solo el montón. */
  var nieve = { cv: null, raf: 0, monton: null, escarcha: null, redim: null };
  function quitarNieve() {
    if (nieve.raf) cancelAnimationFrame(nieve.raf);
    nieve.raf = 0;
    if (nieve.cv) { nieve.cv.remove(); nieve.cv = null; }
    if (nieve.monton) { nieve.monton.remove(); nieve.monton = null; }
    if (nieve.escarcha) { nieve.escarcha.remove(); nieve.escarcha = null; }
    if (nieve.redim) { window.removeEventListener("resize", nieve.redim); nieve.redim = null; }
  }
  function montonNieve() {
    function colinas(base, amp, n) {          // curva suave de n colinas al azar
      var pts = [], d, i;
      for (i = 0; i <= n; i++) pts.push([i * 1200 / n, base + Math.random() * amp]);
      d = "M0 " + pts[0][1];
      for (i = 1; i <= n; i++) d += " Q" + pts[i - 1][0] + " " + pts[i - 1][1] + " " + (pts[i - 1][0] + pts[i][0]) / 2 + " " + (pts[i - 1][1] + pts[i][1]) / 2;
      return d + " L1200 " + pts[n][1];
    }
    var atras = colinas(14, 26, 9), delante = colinas(30, 28, 14), goteo = "", hielo = "", i, x;
    for (i = 0, x = 20; x < 1180; i++) {       // masas de nieve que cuelgan del borde, como si fueran a caerse
      var an = 26 + Math.random() * 46, lg = 8 + Math.random() * 12;
      goteo += "M" + x + " 98 Q" + x + " " + (98 + lg + 4) + " " + (x + an / 2) + " " + (98 + lg) + " Q" + (x + an) + " " + (98 + lg + 4) + " " + (x + an) + " 98Z";
      x += an + 30 + Math.random() * 110;
    }
    for (x = 40; x < 1170; x += 55 + Math.random() * 130) {   // carámbanos cortos
      var gr = 2.5 + Math.random() * 3, lc = 10 + Math.random() * 14;
      hielo += "M" + x + " 104 L" + (x + gr) + " " + (104 + lc) + " L" + (x + gr * 2) + " 104Z";
    }
    var el = document.createElement("div");
    el.className = "nieve-monton";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = '<svg viewBox="0 0 1200 128" preserveAspectRatio="none"><defs>' +
      '<linearGradient id="nmg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#eef4ff"/><stop offset="1" stop-color="#d4e2f6" stop-opacity=".85"/></linearGradient>' +
      '<linearGradient id="nmh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f8ff"/><stop offset="1" stop-color="#d4e2f6" stop-opacity=".75"/></linearGradient>' +
      '<linearGradient id="nmc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eaf3ff" stop-opacity=".95"/><stop offset="1" stop-color="#9cc4ee" stop-opacity=".25"/></linearGradient></defs>' +
      '<path d="' + atras + ' L1200 100 L0 100Z" fill="#b9cbe6" fill-opacity=".8"/>' +
      '<path d="' + delante + ' L1200 100 L0 100Z" fill="url(#nmg)"/>' +
      '<path d="' + delante + '" fill="none" stroke="rgba(150,175,215,.45)" stroke-width="1.2" vector-effect="non-scaling-stroke"/>' +
      '<path d="' + goteo + '" fill="url(#nmh)"/><path d="' + hielo + '" fill="url(#nmc)"/></svg>';
    var pie = document.querySelector(".md-footer");
    if (pie && pie.parentNode) pie.parentNode.insertBefore(el, pie); else document.body.appendChild(el);
    return el;
  }
  function cristalSVG(r) {                      // un copo de seis puntas con ramitas
    var d = "", a, cs, sn, pt = function (x, y) { return (r * x * cs - r * y * sn).toFixed(1) + " " + (r * x * sn + r * y * cs).toFixed(1); };
    for (a = 0; a < 6; a++) {
      cs = Math.cos(a * Math.PI / 3); sn = Math.sin(a * Math.PI / 3);
      d += "M0 0L" + pt(1, 0) + "M" + pt(.55, 0) + "L" + pt(.8, .26) + "M" + pt(.55, 0) + "L" + pt(.8, -.26) + "M" + pt(.3, 0) + "L" + pt(.45, .14) + "M" + pt(.3, 0) + "L" + pt(.45, -.14);
    }
    var t = Math.ceil(r * 2 + 4);
    return '<svg viewBox="' + (-r - 2) + " " + (-r - 2) + " " + t + " " + t + '" width="' + t + '" height="' + t + '"><path d="' + d + '" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>';
  }
  function escarchaPie() {
    var meta = document.querySelector(".md-footer-meta");
    if (!meta) return null;
    var el = document.createElement("div");
    el.className = "escarcha";
    el.setAttribute("aria-hidden", "true");
    var sitios = [[3, 12, 17, .2], [9, 70, 30, .13], [20, 4, 12, .22], [38, 88, 22, .16], [55, 3, 26, .14], [68, 93, 14, .24], [82, 10, 33, .13], [92, 52, 19, .18], [47, 62, 10, .2], [15, 38, 11, .16], [74, 80, 24, .12], [95, 86, 15, .22]];
    el.innerHTML = sitios.map(function (q) {    // [arriba %, izquierda %, radio, opacidad]
      return cristalSVG(q[2]).replace("<svg ", '<svg style="top:' + q[0] + "%;left:" + q[1] + "%;--o:" + q[3] + ';" ');
    }).join("");
    meta.insertBefore(el, meta.firstChild);
    return el;
  }
  function ajustarNieve() {
    quitarNieve();
    var est = document.documentElement.getAttribute("data-estacion");     // también con el tema Invierno (a mano o automático)
    if (est !== "navidad" && est !== "invierno") return;
    var monton = montonNieve();
    nieve.monton = monton;
    nieve.escarcha = escarchaPie();
    var quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (quieto) return;
    var cv = document.createElement("canvas");
    cv.className = "nieve";
    cv.setAttribute("aria-hidden", "true");
    document.body.appendChild(cv);
    nieve.cv = cv;
    var ctx = cv.getContext("2d");
    if (!ctx) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5), w = 0, h = 0, copos = [], acum = 0;
    var sprites = [1.4, 2.4, 3.6, 6].map(function (r, k) {      // tres tamaños de bola y un cristal grande; el halo azulado los deja ver sobre fondo claro
      var c = document.createElement("canvas"), m = k === 3 ? 2.2 : 2.6, s = Math.ceil(r * m * dpr), x = c.getContext("2d");
      c.width = c.height = s;
      x.translate(s / 2, s / 2); x.scale(dpr, dpr);
      if (k === 3) {
        for (var pasada = 0; pasada < 2; pasada++) {
          x.strokeStyle = pasada ? "rgba(255,255,255,.95)" : "rgba(110,140,190,.28)"; x.lineWidth = pasada ? 1 : 2.2; x.lineCap = "round";
          for (var a = 0; a < 6; a++) {
            x.save(); x.rotate(a * Math.PI / 3);
            x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -r);
            x.moveTo(0, -r * .55); x.lineTo(-r * .3, -r * .8); x.moveTo(0, -r * .55); x.lineTo(r * .3, -r * .8);
            x.stroke(); x.restore();
          }
        }
        return { c: c, r: r, lado: r * m };
      }
      x.fillStyle = "rgba(110,140,190,.22)"; x.beginPath(); x.arc(0, 0, r * 1.25, 0, 6.2832); x.fill();
      var g = x.createRadialGradient(0, 0, 0, 0, 0, r);
      g.addColorStop(0, "#fff"); g.addColorStop(.7, "rgba(255,255,255,.95)"); g.addColorStop(1, "rgba(255,255,255,.7)");
      x.fillStyle = g; x.beginPath(); x.arc(0, 0, r, 0, 6.2832); x.fill();
      return { c: c, r: r, lado: r * m };
    });
    function nuevo(f, arriba) {
      var z = .35 + Math.random() * .65;
      f.z = z; f.k = z < .5 ? 0 : z < .75 ? 1 : z < .93 ? 2 : 3;
      f.x = Math.random() * w; f.y = arriba ? -8 - Math.random() * 40 : Math.random() * h;
      f.vy = 22 + z * 58; f.osc = 6 + Math.random() * 14; f.fase = Math.random() * 6.28;
      f.salto = Math.random() * 10 - 4;
      return f;
    }
    function medir() {
      w = window.innerWidth; h = window.innerHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      cv.style.width = w + "px"; cv.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(140, Math.max(40, Math.round(w * h / 9000)));     // unos 40 en un móvil y 140 en un monitor grande
      while (copos.length < n) copos.push(nuevo({}, false));
      copos.length = n;
    }
    medir();
    var pend = 0;
    nieve.redim = function () { clearTimeout(pend); pend = setTimeout(medir, 150); };
    window.addEventListener("resize", nieve.redim, { passive: true });
    var t0 = 0;
    function paso(t) {
      nieve.raf = requestAnimationFrame(paso);
      var dt = Math.min(.05, (t - t0) / 1000); t0 = t;
      ctx.clearRect(0, 0, w, h);
      var viento = Math.sin(t / 4500) * 16, rm = monton.getBoundingClientRect();
      var tope = rm.top < h ? rm.top + rm.height * .3 : 1e9;      // los copos se posan donde empieza el montón, si se ve
      for (var i = 0; i < copos.length; i++) {
        var f = copos[i];
        f.y += f.vy * dt;
        f.x += (viento * f.z + Math.sin(f.fase + t / 1400) * f.osc) * dt;
        if (f.y > tope + f.salto) {
          if (++acum % 22 === 0) monton.style.setProperty("--alto", Math.min(7, 4.5 + acum / 22 * .04).toFixed(2) + "rem");   // crece poco a poco, hasta un tope
          nuevo(f, true); continue;
        }
        if (f.y > h + 8) { nuevo(f, true); continue; }
        if (f.x > w + 8) f.x = -8; else if (f.x < -8) f.x = w + 8;
        var s = sprites[f.k];
        ctx.globalAlpha = .5 + f.z * .45;
        ctx.drawImage(s.c, f.x - s.lado / 2, f.y - s.lado / 2, s.lado, s.lado);
      }
    }
    nieve.raf = requestAnimationFrame(paso);
  }

  /* ---------- Tormenta: lluvia, viento y rayos ----------
     Solo con ese tema elegido a mano. Al final de la página hay charcos con ondas donde cae la lluvia. Las gotas son rayas en un canvas fijo detrás del contenido. El viento sube y baja solo y de vez en cuando
     entra una ráfaga: la inclinación de la lluvia sigue al viento. Cada cierto tiempo cae un rayo (un trazo en el canvas y un destello suave
     sobre la página). Con «reducir movimiento» no se anima nada. */
  var lluvia = { cv: null, raf: 0, flash: null, charcos: null, redim: null };
  function quitarLluvia() {
    if (lluvia.raf) cancelAnimationFrame(lluvia.raf);
    lluvia.raf = 0;
    if (lluvia.cv) { lluvia.cv.remove(); lluvia.cv = null; }
    if (lluvia.flash) { lluvia.flash.remove(); lluvia.flash = null; }
    if (lluvia.charcos) { lluvia.charcos.remove(); lluvia.charcos = null; }
    if (lluvia.redim) { window.removeEventListener("resize", lluvia.redim); lluvia.redim = null; }
  }
  function ajustarLluvia() {
    quitarLluvia();
    if (tema.get() !== "tormenta") return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var cv = document.createElement("canvas");
    cv.className = "lluvia";
    cv.setAttribute("aria-hidden", "true");
    document.body.appendChild(cv);
    lluvia.cv = cv;
    var ctx = cv.getContext("2d");
    if (!ctx) return;
    var fl = document.createElement("div");
    fl.className = "rayo-flash";
    fl.setAttribute("aria-hidden", "true");
    document.body.appendChild(fl);
    lluvia.flash = fl;
    var zona = document.createElement("div"), cc = document.createElement("canvas"), pie = document.querySelector(".md-footer");
    zona.className = "charcos"; zona.setAttribute("aria-hidden", "true"); zona.appendChild(cc);
    if (pie && pie.parentNode) pie.parentNode.insertBefore(zona, pie); else document.body.appendChild(zona);
    lluvia.charcos = zona;
    var cctx = cc.getContext("2d"), cw = 0, ch = 0, pozas = [], base = null, ondas = [], deOnda = 0, hayCharcos = false;
    function dibujarCharcos() {                                  // los charcos se pintan una vez en una imagen aparte; cada fotograma solo copia esa imagen y dibuja las ondas
      cw = zona.clientWidth; ch = zona.clientHeight;
      cc.width = Math.round(cw * dpr); cc.height = Math.round(ch * dpr);
      base = document.createElement("canvas"); base.width = cc.width; base.height = cc.height;
      var b = base.getContext("2d"); b.scale(dpr, dpr);
      var suelo = b.createLinearGradient(0, ch * .35, 0, ch); suelo.addColorStop(0, "rgba(20,32,48,0)"); suelo.addColorStop(1, "rgba(20,32,48,.4)");
      b.fillStyle = suelo; b.fillRect(0, 0, cw, ch);
      var n = Math.max(4, Math.round(cw / 230)); pozas = [];
      for (var i = 0; i < n; i++) {
        var paso = cw / n, rx = Math.min(paso * .46, 55 + Math.random() * 85), ry = rx * (.15 + Math.random() * .05);
        var cy = Math.min(ch - ry - 3, ch * (.5 + Math.random() * .22));
        pozas.push({ cx: (i + .5) * paso + (Math.random() - .5) * paso * .18, cy: cy, rx: rx, ry: ry });
      }
      pozas.forEach(function (q) {
        var g = b.createLinearGradient(0, q.cy - q.ry, 0, q.cy + q.ry);
        g.addColorStop(0, "rgba(160,195,235,.62)"); g.addColorStop(1, "rgba(30,50,80,.88)");
        b.fillStyle = g; b.beginPath(); b.ellipse(q.cx, q.cy, q.rx, q.ry, 0, 0, 6.2832); b.fill();
        b.fillStyle = "rgba(225,238,255,.22)"; b.beginPath(); b.ellipse(q.cx - q.rx * .25, q.cy - q.ry * .3, q.rx * .45, q.ry * .32, 0, 0, 6.2832); b.fill();   // reflejo del cielo
        b.strokeStyle = "rgba(200,225,250,.42)"; b.lineWidth = 1; b.beginPath(); b.ellipse(q.cx, q.cy, q.rx, q.ry, 0, 0, 6.2832); b.stroke();
      });
    }
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5), w = 0, h = 0;
    var grupos = [[], [], []];                                   // gotas lejanas, medias y cercanas (cada una con su grosor y su transparencia)
    var ZONA = [[.25, .45], [.45, .75], [.75, 1]], ANCHO = [.7, 1, 1.4], ALFA = [.26, .38, .52];
    function nueva(g, k, arriba) {
      var z = ZONA[k][0] + Math.random() * (ZONA[k][1] - ZONA[k][0]);
      g.z = z; g.vy = 480 + z * 640; g.len = 9 + z * 24;
      g.x = Math.random() * (w + 240) - 120; g.y = arriba ? -g.len - Math.random() * 30 : Math.random() * h;
      return g;
    }
    function medir() {
      w = window.innerWidth; h = window.innerHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      cv.style.width = w + "px"; cv.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dibujarCharcos(); cctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(260, Math.max(80, Math.round(w * h / 4200)));
      var por = [Math.round(n * .45), Math.round(n * .35), Math.round(n * .2)];
      for (var k = 0; k < 3; k++) {
        while (grupos[k].length < por[k]) grupos[k].push(nueva({}, k, false));
        grupos[k].length = por[k];
      }
    }
    medir();
    var pend = 0;
    lluvia.redim = function () { clearTimeout(pend); pend = setTimeout(medir, 150); };
    window.addEventListener("resize", lluvia.redim, { passive: true });

    var rafaga = null, proxRafaga = 4000 + Math.random() * 4000;
    function viento(t) {                                         // px/s hacia la derecha (negativo: hacia la izquierda)
      var v = 38 * Math.sin(t / 6500) + 24 * Math.sin(t / 2300 + 1.3);
      if (t > proxRafaga) {
        rafaga = { t0: t, dur: 2500 + Math.random() * 2500, amp: (Math.random() < .5 ? -1 : 1) * (110 + Math.random() * 120) };
        proxRafaga = t + 8000 + Math.random() * 9000;
      }
      if (rafaga) {
        var p = (t - rafaga.t0) / rafaga.dur;
        if (p >= 1) rafaga = null; else v += rafaga.amp * Math.sin(p * Math.PI);
      }
      return v;
    }

    var rayo = null, proxRayo = 3500 + Math.random() * 3000;
    function crearRayo(t) {
      var x = w * (.15 + Math.random() * .7), y = 0, pts = [[x, y]], ramas = [], fin = h * (.45 + Math.random() * .35);
      while (y < fin) {
        y += 18 + Math.random() * 34; x += (Math.random() - .5) * 60;
        pts.push([x, y]);
        if (Math.random() < .16 && ramas.length < 3) {
          var rx = x, ry = y, rp = [[rx, ry]], dir = Math.random() < .5 ? -1 : 1;
          for (var i = 0; i < 4; i++) { rx += dir * (10 + Math.random() * 26); ry += 14 + Math.random() * 26; rp.push([rx, ry]); }
          ramas.push(rp);
        }
      }
      rayo = { t0: t, pts: pts, ramas: ramas };
      if (fl.animate) fl.animate([{ opacity: 0 }, { opacity: 1, offset: .08 }, { opacity: .25, offset: .3 }, { opacity: .8, offset: .45 }, { opacity: 0 }], { duration: 520, easing: "ease-out" });
    }
    function trazo(pts) { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.stroke(); }

    var t0 = 0;
    function paso(t) {
      lluvia.raf = requestAnimationFrame(paso);
      var dt = Math.min(.05, (t - t0) / 1000); t0 = t;
      ctx.clearRect(0, 0, w, h);
      var v = viento(t), fuerza = Math.min(.18, Math.abs(v) / 700);   // con más viento, la lluvia se ve un poco más intensa
      var rc = zona.getBoundingClientRect(), visibles = rc.top < h && rc.bottom > 0;
      var tope = visibles ? rc.top + rc.height * .55 : 1e9;      // las gotas se acaban donde empieza el agua, si se ve
      if (visibles) {
        cctx.clearRect(0, 0, cw, ch); cctx.drawImage(base, 0, 0, cw, ch);
        deOnda += dt * (26 + fuerza * 80);
        while (deOnda >= 1 && ondas.length < 45) {
          deOnda -= 1;
          var q = pozas[Math.floor(Math.random() * pozas.length)], ox, oy, intentos = 0;
          do { ox = (Math.random() * 2 - 1) * .9; oy = (Math.random() * 2 - 1) * .9; } while (ox * ox + oy * oy > .8 && ++intentos < 6);
          ondas.push({ x: q.cx + ox * q.rx, y: q.cy + oy * q.ry, r: 0, max: 9 + Math.random() * 15 });
        }
        deOnda %= 1;
        cctx.lineWidth = 1;
        for (var j = ondas.length - 1; j >= 0; j--) {
          var o = ondas[j]; o.r += (24 + o.max) * dt;
          if (o.r >= o.max) { ondas.splice(j, 1); continue; }
          var al = (1 - o.r / o.max) * .75;
          cctx.strokeStyle = "rgba(220,235,252," + al.toFixed(2) + ")"; cctx.beginPath(); cctx.ellipse(o.x, o.y, o.r, o.r * .32, 0, 0, 6.2832); cctx.stroke();
          cctx.strokeStyle = "rgba(220,235,252," + (al * .5).toFixed(2) + ")"; cctx.beginPath(); cctx.ellipse(o.x, o.y, o.r * .55, o.r * .18, 0, 0, 6.2832); cctx.stroke();
        }
        hayCharcos = true;
      } else if (hayCharcos) { cctx.clearRect(0, 0, cw, ch); ondas.length = 0; hayCharcos = false; }
      ctx.lineCap = "round";
      for (var k = 0; k < 3; k++) {
        var gr = grupos[k];
        ctx.lineWidth = ANCHO[k];
        ctx.strokeStyle = "rgba(190,215,240," + (ALFA[k] + fuerza).toFixed(2) + ")";
        ctx.beginPath();
        for (var i = 0; i < gr.length; i++) {
          var g = gr[i], vx = v * (.4 + .6 * g.z);
          g.x += vx * dt; g.y += g.vy * dt;
          if (g.y > h + g.len || g.y > tope) { nueva(g, k, true); continue; }
          if (g.x > w + 120) g.x -= w + 240; else if (g.x < -120) g.x += w + 240;
          var m = g.len / Math.sqrt(vx * vx + g.vy * g.vy);
          ctx.moveTo(g.x, g.y); ctx.lineTo(g.x - vx * m, g.y - g.vy * m);
        }
        ctx.stroke();
      }
      if (!rayo && t > proxRayo) { crearRayo(t); proxRayo = t + 6000 + Math.random() * 11000; }
      if (rayo) {
        var e = t - rayo.t0;
        if (e > 420) rayo = null;
        else {
          var a = e < 110 ? 1 : e < 190 ? .15 : e < 270 ? .95 : 1 - (e - 270) / 150;   // dos golpes de luz
          ctx.globalAlpha = Math.max(0, a);
          ctx.shadowColor = "rgba(170,200,255,.95)"; ctx.shadowBlur = 14;
          ctx.strokeStyle = "#fff"; ctx.lineWidth = 2.2; trazo(rayo.pts);
          ctx.lineWidth = 1.2; rayo.ramas.forEach(trazo);
          ctx.shadowBlur = 0; ctx.globalAlpha = 1;
        }
      }
    }
    lluvia.raf = requestAnimationFrame(paso);
  }

  /* ---------- GitHub: botón de estrella en la cabecera y pie de página ----------
     GitHub no permite dar una estrella desde otra web sin iniciar sesión: el botón abre el repositorio (donde se pulsa «Star») y muestra
     el número de estrellas, que se pide a la API pública y se guarda 10 minutos en la sesión. */
  var STAR_SVG = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>';
  var MKDOCS_SVG = '<svg aria-hidden="true" viewBox="0 0 16 16" shape-rendering="crispEdges"><path fill="currentColor" d="M4 2h9v1h-9zM3 3h10v1h-10zM3 4h3v1h-3zM10 4h4v1h-4zM3 5h9v1h-9zM13 5h1v1h-1zM2 6h3v1h-3zM10 6h4v1h-4zM2 7h12v1h-12zM2 8h11v1h-11zM1 9h10v1h-10zM12 9h1v1h-1zM1 10h12v1h-12zM1 11h9v1h-9zM11 11h2v1h-2zM1 12h1v1h-1zM10 12h2v1h-2zM1 13h11v1h-11z"/></svg>';
  var MATERIAL_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m17.029 18.772.777 1.166-5.417 2.709L0 16.451V4.063l5.417-2.709 5.298 7.948 7.867-5.24L24 1.354V16.84l-5.417 2.709zm2.023-13.827v13.253l3.949-1.975V2.97zM5.076 2.642 1.458 4.45 12.73 21.358l3.618-1.809z"/></svg>';
  function ghRepo() {
    var a = document.querySelector(".md-source"), m = a && /github\.com\/([^\/]+)\/([^\/?#]+)/.exec(a.getAttribute("href") || "");
    return m ? { o: m[1], r: m[2], url: "https://github.com/" + m[1] + "/" + m[2] } : null;
  }
  function ghEstrellas(repo, cb) {
    var k = "gh:" + repo.o + "/" + repo.r;
    try { var c = JSON.parse(sessionStorage.getItem(k) || "null"); if (c && Date.now() - c.t < 600000) { cb(c.n); return; } } catch (e) {}
    if (!window.fetch) return;
    fetch("https://api.github.com/repos/" + repo.o + "/" + repo.r).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
      if (!j || typeof j.stargazers_count !== "number") return;
      try { sessionStorage.setItem(k, JSON.stringify({ t: Date.now(), n: j.stargazers_count })); } catch (e) {}
      cb(j.stargazers_count);
    }).catch(function () {});
  }
  function botonEstrella(repo, extra) {
    var b = document.createElement("a");
    b.className = "gh-estrella" + (extra ? " " + extra : "");
    b.href = repo.url; b.target = "_blank"; b.rel = "noopener";
    b.title = "Se abre GitHub: allí pulsa «Star» para darnos una estrella";
    b.innerHTML = STAR_SVG + "<span>Dar una estrella</span><b class=\"gh-n\"></b>";
    ghEstrellas(repo, function (n) { var e = b.querySelector(".gh-n"); if (e) e.textContent = n; });
    return b;
  }
  function buildGitHub() {
    var repo = ghRepo(), src = document.querySelector(".md-header__source");
    if (!repo || !src || src.querySelector(".gh-estrella")) return;
    src.classList.add("gh-grupo");
    src.appendChild(botonEstrella(repo));
  }
  function buildPie() {
    var inner = document.querySelector(".md-footer-meta__inner");
    if (!inner || inner.querySelector(".pie")) return;
    var enlaceOrg = inner.querySelector(".md-social__link"), org = enlaceOrg ? enlaceOrg.href : "https://github.com/apuntes-dam/";
    var hub = ORIGIN + HUB.repo + "/", repo = ghRepo();
    inner.innerHTML = '<div class="pie">' +
      '<div class="pie-marca"><strong>Apuntes DAM</strong><span>Practica los lenguajes de programación de 1.º y 2.º de DAM.</span></div>' +
      '<nav class="pie-enlaces" aria-label="Enlaces del sitio"><a href="' + hub + '">Todos los lenguajes</a><a href="' + hub + 'pasar/">Pasar de uno a otro</a><a href="' + hub + 'pruebas/">Pruebas</a><a href="' + org + '" target="_blank" rel="noopener">GitHub</a></nav>' +
      '<div class="pie-hecho"><span>Hecho con</span>' +
      '<a class="pie-logo" href="https://www.mkdocs.org/" target="_blank" rel="noopener" title="MkDocs, el generador de esta web">' + MKDOCS_SVG + '<span>MkDocs</span></a>' +
      '<a class="pie-logo" href="https://squidfunk.github.io/mkdocs-material/" target="_blank" rel="noopener" title="Material for MkDocs, el tema">' + MATERIAL_SVG + '<span>Material</span></a></div>' +
      '<div class="pie-acciones"></div></div>';
    var acc = inner.querySelector(".pie-acciones");
    if (repo) acc.appendChild(botonEstrella(repo, "pie-estrella"));
    var up = document.createElement("button");
    up.type = "button"; up.className = "pie-arriba"; up.textContent = "↑ Volver arriba";
    up.addEventListener("click", function () {
      var quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: quieto ? "auto" : "smooth" });
    });
    acc.appendChild(up);
  }

  /* ---------- Primavera, verano y otoño ----------
     Primavera: pétalos y hojas tiernas con brisa suave. Otoño: hojas con viento fuerte y ráfagas. Verano: motas de luz y luciérnagas.
     Mismas reglas que la nieve: canvas fijo detrás del contenido, imágenes dibujadas una vez, nada de gradientes por fotograma, y al final de la
     página una franja propia de la estación (hierba con flores, hojas amontonadas u olas con arena). Con «reducir movimiento» solo queda la franja. */
  var amb = { cv: null, raf: 0, suelo: null, redim: null };
  function quitarAmbiente() {
    if (amb.raf) cancelAnimationFrame(amb.raf);
    amb.raf = 0;
    if (amb.cv) { amb.cv.remove(); amb.cv = null; }
    if (amb.suelo) { amb.suelo.remove(); amb.suelo = null; }
    if (amb.redim) { window.removeEventListener("resize", amb.redim); amb.redim = null; }
  }
  function fabricaViento(base, amp) {              // px/s hacia la derecha; de vez en cuando entra una ráfaga
    var rafaga = null, prox = 3000 + Math.random() * 4000;
    return function (t) {
      var v = base * Math.sin(t / 6000) + base * .6 * Math.sin(t / 2200 + 1.1);
      if (t > prox) {
        rafaga = { t0: t, dur: 2500 + Math.random() * 2500, amp: (Math.random() < .5 ? -1 : 1) * (amp * .6 + Math.random() * amp * .5) };
        prox = t + 7000 + Math.random() * 9000;
      }
      if (rafaga) {
        var p = (t - rafaga.t0) / rafaga.dur;
        if (p >= 1) rafaga = null; else v += rafaga.amp * Math.sin(p * Math.PI);
      }
      return v;
    };
  }
  function colinasAmb(w, base, amp, n, alto) {
    var pts = [], d, i;
    for (i = 0; i <= n; i++) pts.push([i * w / n, base + Math.random() * amp]);
    d = "M0 " + pts[0][1].toFixed(1);
    for (i = 1; i <= n; i++) d += "Q" + pts[i - 1][0].toFixed(1) + " " + pts[i - 1][1].toFixed(1) + " " + ((pts[i - 1][0] + pts[i][0]) / 2).toFixed(1) + " " + ((pts[i - 1][1] + pts[i][1]) / 2).toFixed(1);
    return d + "L" + w + " " + pts[n][1].toFixed(1) + "L" + w + " " + alto + "L0 " + alto + "Z";
  }
  var PAL_OTONO = ["#d9541e", "#c0392b", "#e8871e", "#f1b82d", "#a85a22", "#b8312f"];
  function sueloAmbiente(est, w) {                 // SVG de la franja final, con el ancho real de la página para que nada se deforme
    var H = 80, s = "", i, x, y;
    function r(a, b) { return a + Math.random() * (b - a); }
    if (est === "primavera") {
      s += '<defs><linearGradient id="gh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86cf62"/><stop offset="1" stop-color="#3b8433"/></linearGradient></defs>';
      s += '<path d="' + colinasAmb(w, 36, 16, Math.ceil(w / 130), H) + '" fill="#5fa84a" fill-opacity=".9"/>';
      var hierba = "M0 " + H;
      for (x = 0; x < w; x += 4 + Math.random() * 5) hierba += "L" + x.toFixed(1) + " " + r(44, 56).toFixed(1) + "L" + (x + 2.5).toFixed(1) + " " + r(48, 60).toFixed(1);
      s += '<path d="' + hierba + "L" + w + " " + H + 'Z" fill="url(#gh)"/>';
      var col = ["#ff9fb8", "#ffffff", "#ffd54f", "#c3a6ff"];
      for (x = r(10, 60); x < w; x += r(60, 150)) {
        y = r(24, 38);
        s += '<path d="M' + x.toFixed(1) + " 58L" + x.toFixed(1) + " " + y.toFixed(1) + '" stroke="#3f8a35" stroke-width="1.4" fill="none"/>' +
          '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="3.8" fill="' + col[Math.floor(Math.random() * col.length)] + '"/><circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="1.3" fill="#f6c21c"/>';
      }
      for (i = 0; i < w / 40; i++) s += '<ellipse cx="' + r(0, w).toFixed(1) + '" cy="' + r(50, 62).toFixed(1) + '" rx="3.2" ry="1.8" fill="#ffc4d4" style="transform-box:fill-box;transform-origin:center;transform:rotate(' + r(0, 180).toFixed(0) + 'deg)"/>';
    } else if (est === "otono") {
      s += '<defs><linearGradient id="gm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a4b1f"/><stop offset="1" stop-color="#43240f"/></linearGradient></defs>';
      s += '<path d="' + colinasAmb(w, 34, 20, Math.ceil(w / 80), H) + '" fill="url(#gm)"/>';
      for (i = 0; i < w / 7; i++) {
        y = 30 + Math.pow(Math.random(), 1.5) * 46;
        s += '<ellipse cx="' + r(0, w).toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="' + r(4.5, 8).toFixed(1) + '" ry="' + r(2.2, 3.8).toFixed(1) + '" fill="' + PAL_OTONO[Math.floor(Math.random() * PAL_OTONO.length)] + '" fill-opacity=".95" style="transform-box:fill-box;transform-origin:center;transform:rotate(' + r(-70, 70).toFixed(0) + 'deg)"/>';
      }
    } else if (est === "verano") {
      var P = 170;
      s += '<defs><linearGradient id="gs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6e2ad"/><stop offset="1" stop-color="#dcbb74"/></linearGradient></defs>';
      [[44, .5, "#3fb6e8", 9], [52, .65, "#2b9fd6", 7], [60, .85, "#1d86c0", 5]].forEach(function (c, k) {
        var d = "M" + (-P) + " " + c[0], a = c[3];
        for (x = -P; x < w + P; x += P) d += "q" + P / 4 + " " + (-a) + " " + P / 2 + " 0t" + P / 2 + " 0";
        s += '<g class="ola o' + k + '" style="--p:' + P + 'px"><path d="' + d + "L" + (w + P) + " " + H + "L" + (-P) + " " + H + 'Z" fill="' + c[2] + '" fill-opacity="' + c[1] + '"/></g>';
      });
      s += '<path d="' + colinasAmb(w, 62, 8, Math.ceil(w / 160), H) + '" fill="url(#gs)"/>';           // la arena va encima de las olas
      for (i = 0; i < w / 90; i++) s += '<circle class="chispa" cx="' + r(0, w).toFixed(1) + '" cy="' + r(40, 58).toFixed(1) + '" r="1.4" fill="#fff" style="animation-delay:-' + r(0, 4).toFixed(1) + 's"/>';
    }
    return '<svg viewBox="0 0 ' + w + " " + H + '" width="' + w + '" height="' + H + '" preserveAspectRatio="xMidYMax slice">' + s + "</svg>";
  }
  function spriteAmb(ancho, alto, dpr, pinta) {
    var c = document.createElement("canvas"), x = c.getContext("2d");
    c.width = Math.ceil(ancho * dpr); c.height = Math.ceil(alto * dpr);
    x.scale(dpr, dpr); x.translate(ancho / 2, alto / 2);
    pinta(x);
    return { c: c, w: ancho, h: alto };
  }
  function sprPetalo(dpr, a, b, r) {
    return spriteAmb(r * 2.2, r * 2.6, dpr, function (x) {
      x.scale(r * .85, r);
      var g = x.createLinearGradient(0, -1, 0, 1); g.addColorStop(0, a); g.addColorStop(1, b);
      x.fillStyle = g; x.beginPath();
      x.moveTo(0, -.8); x.bezierCurveTo(.35, -1.05, 1, -.55, .85, .15); x.bezierCurveTo(.7, .8, .2, 1, 0, 1);
      x.bezierCurveTo(-.2, 1, -.7, .8, -.85, .15); x.bezierCurveTo(-1, -.55, -.35, -1.05, 0, -.8); x.fill();
      x.strokeStyle = "rgba(190,90,120,.35)"; x.lineWidth = .06; x.stroke();
    });
  }
  function sprHoja(dpr, color, r, vena) {
    return spriteAmb(r * 2.2, r * 2.8, dpr, function (x) {
      x.scale(r, r);
      x.fillStyle = color; x.beginPath();
      x.moveTo(0, -1); x.bezierCurveTo(.8, -.55, .9, .35, 0, .85); x.bezierCurveTo(-.9, .35, -.8, -.55, 0, -1); x.fill();
      x.strokeStyle = vena; x.lineWidth = .09; x.lineCap = "round";
      x.beginPath(); x.moveTo(0, -.85); x.lineTo(0, 1.2); x.moveTo(0, -.1); x.lineTo(.4, -.45); x.moveTo(0, -.1); x.lineTo(-.4, -.45); x.moveTo(0, .35); x.lineTo(.35, .05); x.moveTo(0, .35); x.lineTo(-.35, .05); x.stroke();
    });
  }
  function sprLuz(dpr, rgb) {
    return spriteAmb(24, 24, dpr, function (x) {
      var g = x.createRadialGradient(0, 0, 0, 0, 0, 12);
      g.addColorStop(0, "rgba(" + rgb + ",1)"); g.addColorStop(.25, "rgba(" + rgb + ",.55)"); g.addColorStop(1, "rgba(" + rgb + ",0)");
      x.fillStyle = g; x.beginPath(); x.arc(0, 0, 12, 0, 6.2832); x.fill();
    });
  }
  function ajustarAmbiente() {
    quitarAmbiente();
    var est = document.documentElement.getAttribute("data-estacion");
    if (est !== "primavera" && est !== "verano" && est !== "otono") return;
    var zona = document.createElement("div"), pie = document.querySelector(".md-footer");
    zona.className = "suelo-amb suelo-" + est; zona.setAttribute("aria-hidden", "true");
    if (pie && pie.parentNode) pie.parentNode.insertBefore(zona, pie); else document.body.appendChild(zona);
    amb.suelo = zona;
    var dibujar = function () { zona.innerHTML = sueloAmbiente(est, Math.max(320, zona.clientWidth || window.innerWidth)); };
    dibujar();
    var quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (quieto) return;
    var cv = document.createElement("canvas");
    cv.className = "ambiente"; cv.setAttribute("aria-hidden", "true");
    document.body.appendChild(cv);
    amb.cv = cv;
    var ctx = cv.getContext("2d");
    if (!ctx) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5), w = 0, h = 0, ps = [];
    var CAE = est !== "verano", viento = fabricaViento(est === "otono" ? 40 : 16, est === "otono" ? 300 : 70);
    var spr = [];
    if (est === "primavera") {
      [["#fff7fa", "#ffc4d4", 7], ["#ffd1dc", "#ff9fb8", 8.5], ["#ffe3ea", "#ffb3c8", 6.5], ["#ffd1dc", "#f48fb1", 9.5]].forEach(function (c) { spr.push(sprPetalo(dpr, c[0], c[1], c[2])); });
      spr.push(sprHoja(dpr, "#8fd16a", 7, "rgba(40,100,40,.6)")); spr.push(sprHoja(dpr, "#6dbb57", 6.5, "rgba(30,90,40,.6)"));
    } else if (est === "otono") {
      PAL_OTONO.forEach(function (c, k) { spr.push(sprHoja(dpr, c, 8 + (k % 3) * 2.2, "rgba(60,25,10,.55)")); });
    } else {
      spr.push(sprLuz(dpr, "255,236,140"), sprLuz(dpr, "255,190,70"));
    }
    var ESC = { primavera: [26, 70, 14000, 26, 60], otono: [22, 60, 15000, 40, 90], verano: [18, 45, 22000, 0, 0] }[est];
    function nuevo(p, arriba) {
      var z = .35 + Math.random() * .65;
      p.k = Math.floor(Math.random() * spr.length); p.z = z;
      p.x = Math.random() * (w + 200) - 100;
      p.y = CAE ? (arriba ? -20 - Math.random() * 40 : Math.random() * h) : Math.random() * h;
      p.vy = ESC[3] + Math.random() * (ESC[4] - ESC[3]);
      p.fase = Math.random() * 6.28; p.osc = 8 + Math.random() * 16; p.rot = Math.random() * 6.28;
      p.vr = (Math.random() < .5 ? -1 : 1) * (.5 + Math.random() * (est === "otono" ? 2 : 1.2));
      p.flip = .6 + Math.random() * .9; p.esc = est === "otono" ? .8 + z * .5 : .7 + z * .5;
      p.salto = Math.random() * 14;
      return p;
    }
    function medir() {
      w = window.innerWidth; h = window.innerHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      cv.style.width = w + "px"; cv.style.height = h + "px";
      var n = Math.min(ESC[1], Math.max(ESC[0], Math.round(w * h / ESC[2])));
      while (ps.length < n) ps.push(nuevo({}, false));
      ps.length = n;
      dibujar();
    }
    medir();
    var pend = 0;
    amb.redim = function () { clearTimeout(pend); pend = setTimeout(medir, 150); };
    window.addEventListener("resize", amb.redim, { passive: true });
    var t0 = 0;
    function paso(t) {
      amb.raf = requestAnimationFrame(paso);
      var dt = Math.min(.05, (t - t0) / 1000); t0 = t;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
      var v = viento(t), rc = zona.getBoundingClientRect();
      var tope = CAE && rc.top < h ? rc.top + rc.height * .5 : 1e9;
      var oscuro = document.body.getAttribute("data-md-color-scheme") === "slate";
      if (!CAE) ctx.globalCompositeOperation = oscuro ? "lighter" : "source-over";
      var alzar = CAE ? 1 - Math.min(.6, Math.abs(v) / 450) : 1;       // con una ráfaga las hojas casi no caen: vuelan
      for (var i = 0; i < ps.length; i++) {
        var p = ps[i], s = spr[CAE ? p.k : (oscuro ? 0 : 1)];
        if (CAE) {
          p.x += (v * (.45 + .55 * p.z) + Math.sin(p.fase + t / 1300) * p.osc) * dt;
          p.y += p.vy * alzar * dt * (.7 + .5 * p.z);
          p.rot += p.vr * dt * (1 + Math.abs(v) / 120);
          if (p.y > tope + p.salto || p.y > h + 20) { nuevo(p, true); continue; }
          if (p.x > w + 60) p.x -= w + 120; else if (p.x < -60) p.x += w + 120;
          var cs = Math.cos(p.rot), sn = Math.sin(p.rot), sx = (.55 + .45 * Math.abs(Math.cos(p.fase + t / 700 * p.flip))) * p.esc, sy = p.esc;
          ctx.setTransform(cs * sx * dpr, sn * sx * dpr, -sn * sy * dpr, cs * sy * dpr, p.x * dpr, p.y * dpr);
          ctx.globalAlpha = .65 + p.z * .35;
          ctx.drawImage(s.c, -s.w / 2, -s.h / 2, s.w, s.h);
        } else {
          p.x += (Math.sin(p.fase + t / 3200) * 12 + v * .15) * dt;
          p.y += Math.sin(p.fase * 2 + t / 4100) * 9 * dt - 3 * dt;
          if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;
          if (p.x > w + 20) p.x = -20; else if (p.x < -20) p.x = w + 20;
          var br = .5 + .5 * Math.sin(p.fase * 3 + t / (700 + p.z * 500)), tam = (.35 + .6 * p.z) * (.7 + br * .5);
          ctx.setTransform(tam * dpr, 0, 0, tam * dpr, p.x * dpr, p.y * dpr);
          ctx.globalAlpha = (oscuro ? .2 : .25) + br * (oscuro ? .7 : .5);
          ctx.drawImage(s.c, -s.w / 2, -s.h / 2, s.w, s.h);
        }
      }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
    }
    amb.raf = requestAnimationFrame(paso);
  }

  function buildThemePicker() {
    var inner = document.querySelector(".md-header__inner");
    if (!inner || document.querySelector(".tema-pick")) return;
    var box = document.createElement("div");
    box.className = "tema-pick";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tema-btn";
    btn.title = "Tema de colores";
    btn.setAttribute("aria-label", "Tema de colores");
    btn.setAttribute("aria-haspopup", "true");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M12 22a10 10 0 1 1 10-10c0 3.3-2.7 4-4.5 4H16a2 2 0 0 0-1.5 3.3c.6.8.3 2.7-2.5 2.7m-5.5-9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m3-4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m3 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/></svg>';
    var menu = document.createElement("div");
    menu.className = "tema-menu";
    menu.setAttribute("role", "menu");
    menu.hidden = true;
    function marcar() {
      var cur = tema.get();
      menu.querySelectorAll("button").forEach(function (b) {
        var on = b.getAttribute("data-tema") === cur;
        b.setAttribute("aria-checked", on ? "true" : "false");
        b.classList.toggle("on", on);
      });
      var hay = !!persDatos();
      bAjustar.hidden = CON_IMAGEN.indexOf(document.documentElement.getAttribute("data-estacion")) < 0;
      bUsar.hidden = !hay || cur === "personal";
      bQuitar.hidden = !hay;
    }
    function cerrar() { menu.hidden = true; btn.setAttribute("aria-expanded", "false"); }
    TEMAS.forEach(function (t) {
      if (t.grupo) {
        var g = document.createElement("div");
        g.className = "tema-grupo";
        g.textContent = t.grupo;
        menu.appendChild(g);
        return;
      }
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "menuitemradio");
      b.setAttribute("data-tema", t.id);
      b.innerHTML = '<span>' + t.ico + '</span> ' + t.name;
      b.addEventListener("click", function () { tema.set(t.id); aplicarTema(t.id); marcar(); cerrar(); btn.focus(); ajustarObservador(); });
      menu.appendChild(b);
    });
    var g2 = document.createElement("div");
    g2.className = "tema-grupo";
    g2.textContent = "Personalizado";
    menu.appendChild(g2);
    var fileIn = document.createElement("input");
    fileIn.type = "file";
    fileIn.accept = "image/jpeg,image/png,image/webp,image/gif,image/avif";
    fileIn.hidden = true;
    var nota = document.createElement("div");
    nota.className = "tema-nota";
    nota.setAttribute("role", "status");
    var NOTA0 = "Tu imagen se queda solo en este navegador: no se sube a ningún sitio ni la ve nadie más.";
    nota.textContent = NOTA0;
    function accion(texto, ico, f) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "menuitem");
      b.innerHTML = '<span>' + ico + '</span> ' + texto;
      b.addEventListener("click", f);
      menu.appendChild(b);
      return b;
    }
    var bElegir = accion("Elegir mi imagen…", "🖼️", function () { fileIn.click(); });
    var bUsar = accion("Usar mi imagen guardada", "✅", function () { tema.set("personal"); aplicarTema("personal"); ajustarObservador(); marcar(); cerrar(); });
    var bAjustar = accion("Ajustar imagen…", "🎚️", function () { cerrar(); abrirAjustes(); });
    var bQuitar = accion("Quitar mi imagen", "🗑️", function () {
      persBorrar();
      if (tema.get() === "personal") { tema.set(""); aplicarTema(""); ajustarObservador(); }
      nota.textContent = NOTA0;
      marcar();
    });
    menu.appendChild(nota);
    menu.appendChild(fileIn);
    fileIn.addEventListener("change", function () {
      var f = fileIn.files && fileIn.files[0];
      fileIn.value = "";
      if (!f) return;
      persCargar(f, function (error) {
        if (error) { nota.textContent = error; return; }
        tema.set("personal"); aplicarTema("personal"); ajustarObservador(); marcar();
        nota.textContent = persGuardada ? NOTA0 : "Se usa en esta pestaña, pero el navegador no dejó guardarla. " + NOTA0;
        cerrar();
      });
    });
    btn.addEventListener("click", function () {
      var abrir = menu.hidden;
      menu.hidden = !abrir;
      btn.setAttribute("aria-expanded", abrir ? "true" : "false");
      if (abrir) { marcar(); var on = menu.querySelector("button.on"); if (on) on.focus(); }
    });
    document.addEventListener("click", function (ev) { if (!box.contains(ev.target)) cerrar(); });
    document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && !menu.hidden) { cerrar(); btn.focus(); } });
    box.appendChild(btn);
    box.appendChild(menu);
    var sw = inner.querySelector(".lang-pick") || inner.querySelector(".lang-switch");
    if (sw) sw.after(box); else inner.appendChild(box);
  }

  /* ---------- Modo avanzado: muestra u oculta la sección «Avanzado» del menú ---------- */
  var avanzado = {
    get: function () { try { return localStorage.getItem("avanzado") === "1"; } catch (e) { return false; } },
    set: function (v) { try { if (v) localStorage.setItem("avanzado", "1"); else localStorage.removeItem("avanzado"); } catch (e) {} }
  };
  function aplicarAvanzado(on) {
    if (on) document.documentElement.setAttribute("data-avanzado", "1");
    else document.documentElement.removeAttribute("data-avanzado");
  }
  /* quien llega a una página avanzada (por un enlace o el buscador) ve el menú avanzado, sin guardarlo */
  aplicarAvanzado(avanzado.get() || location.pathname.indexOf("/avanzado/") >= 0);

  function marcarNavAvanzado() {
    var n = 0;
    document.querySelectorAll(".md-nav--primary > .md-nav__list > .md-nav__item").forEach(function (li) {
      var es = Array.prototype.some.call(li.querySelectorAll("a[href]"), function (a) { return a.pathname.indexOf("/avanzado/") >= 0; });
      if (es) { li.classList.add("nav-avanzado"); n++; }
    });
    return n;
  }

  function buildAdvancedSwitch() {
    var inner = document.querySelector(".md-header__inner");
    if (!inner || document.querySelector(".av-btn") || !marcarNavAvanzado()) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "av-btn";
    btn.setAttribute("role", "switch");
    btn.title = "Modo avanzado: muestra el material avanzado en el menú";
    btn.innerHTML = '<span aria-hidden="true">🎓</span><span class="av-txt">Avanzado</span>';
    function pintar() { btn.setAttribute("aria-checked", document.documentElement.hasAttribute("data-avanzado") ? "true" : "false"); }
    btn.addEventListener("click", function () {
      var on = !document.documentElement.hasAttribute("data-avanzado");
      avanzado.set(on);
      aplicarAvanzado(on);
      pintar();
    });
    pintar();
    var sw = inner.querySelector(".lang-pick") || inner.querySelector(".lang-switch");
    if (sw) sw.after(btn); else inner.appendChild(btn);
  }

  function init() {
    buildSwitcher();
    buildGitHub();
    buildPie();
    buildThemePicker();
    buildAdvancedSwitch();
    ajustarObservador();
    initUnidades();
    initDemos();
    if (document.querySelector(".sol[data-key]")) adminButton();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
