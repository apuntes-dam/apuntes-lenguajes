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
    { id: "navidad", name: "Navidad", ico: "🎄" },
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
      persMem = { img: data, h: p.h, p: p.p, pd: p.pd, pl: p.pl, ad: p.ad, al: p.al };
      try { localStorage.setItem(PERS_CLAVE, JSON.stringify(persMem)); persGuardada = true; } catch (e) { persGuardada = false; }
      cb(null);
    };
    im.src = url;
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
    var sw = inner.querySelector(".lang-switch");
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
    var sw = inner.querySelector(".lang-switch");
    if (sw) sw.after(btn); else inner.appendChild(btn);
  }

  function init() {
    buildSwitcher();
    buildThemePicker();
    buildAdvancedSwitch();
    ajustarObservador();
    initUnidades();
    initDemos();
    if (document.querySelector(".sol[data-key]")) adminButton();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
