/* Simulador de examen · PSP. Los datos están en window.EXAMEN_PSP (examen-psp-datos.js).
   Teoría: test de 4 opciones (se barajan; la correcta es la primera en los datos).
   Práctica: «qué muestra», «completa el hueco» y «escribe el código» (este último se autoevalúa con una lista de criterios). */
(function () {
  "use strict";
  var DATOS = window.EXAMEN_PSP;
  var raiz = document.getElementById("examen-psp");
  if (!DATOS || !raiz) return;

  var CLAVE = "examenSGE.v1";
  function leer() { try { return JSON.parse(localStorage.getItem(CLAVE)) || { intentos: [], fallos: {} }; } catch (e) { return { intentos: [], fallos: {} }; } }
  function guardar(d) { try { localStorage.setItem(CLAVE, JSON.stringify(d)); } catch (e) { /* sin almacenamiento: no pasa nada */ } }

  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function md(t) { return esc(t).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/`([^`]+)`/g, "<code>$1</code>"); }
  function barajar(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function norm(s) { return String(s).replace(/\r/g, "").split("\n").map(function (l) { return l.replace(/\s+$/, ""); }).join("\n").replace(/^\n+|\n+$/g, "").replace(/(\d),(\d)/g, "$1.$2"); }   // 6,67 y 6.67 valen igual
  function hora(s) { var m = Math.floor(s / 60), x = s % 60; return (m < 10 ? "0" : "") + m + ":" + (x < 10 ? "0" : "") + x; }
  function el(html) { var d = document.createElement("div"); d.innerHTML = html; return d.firstElementChild; }

  var css = document.createElement("style");
  css.textContent = [
    "#examen-psp .ex-card{border:1px solid var(--md-default-fg-color--lightest);border-radius:.5rem;padding:.8rem 1rem;margin:.8rem 0;background:var(--md-default-bg-color)}",
    "#examen-psp .ex-card.ok{border-color:#2e7d32;background:rgba(46,125,50,.08)}",
    "#examen-psp .ex-card.mal{border-color:#c62828;background:rgba(198,40,40,.08)}",
    "#examen-psp .ex-btn{cursor:pointer;border:0;border-radius:.4rem;padding:.5rem 1rem;margin:.2rem .3rem .2rem 0;font:inherit;background:var(--md-primary-fg-color);color:var(--md-primary-bg-color)}",
    "#examen-psp .ex-btn.sec{background:transparent;color:var(--md-primary-fg-color);border:1px solid var(--md-primary-fg-color)}",
    "#examen-psp .ex-btn:disabled{opacity:.45;cursor:default}",
    "#examen-psp .ex-op{display:block;padding:.3rem .5rem;margin:.15rem 0;border-radius:.3rem;cursor:pointer}",
    "#examen-psp .ex-op:hover{background:var(--md-default-fg-color--lightest)}",
    "#examen-psp .ex-op.bien{background:rgba(46,125,50,.2)}",
    "#examen-psp .ex-op.mala{background:rgba(198,40,40,.2)}",
    "#examen-psp textarea{width:100%;font-family:var(--md-code-font-family,monospace);font-size:.8rem;box-sizing:border-box;background:var(--md-code-bg-color);color:var(--md-code-fg-color);border:1px solid var(--md-default-fg-color--lightest);border-radius:.3rem;padding:.4rem}",
    "#examen-psp .ex-top{position:sticky;top:3rem;z-index:2;display:flex;justify-content:space-between;align-items:center;padding:.4rem .8rem;border-radius:.4rem;background:var(--md-default-bg-color);border:1px solid var(--md-default-fg-color--lightest)}",
    "#examen-psp .ex-exp{margin:.5rem 0 0;padding:.4rem .7rem;border-left:3px solid var(--md-primary-fg-color);background:var(--md-default-fg-color--lightest)}",
    "#examen-psp .ex-barra{height:.7rem;border-radius:.4rem;background:var(--md-default-fg-color--lightest);overflow:hidden}",
    "#examen-psp .ex-barra>span{display:block;height:100%;background:#2e7d32}",
    "#examen-psp .ex-bloq{display:grid;grid-template-columns:minmax(10rem,18rem) 1fr 4.5rem;gap:.6rem;align-items:center;margin:.35rem 0}",
    "#examen-psp pre{margin:.4rem 0}",
    "#examen-psp .ex-nota{font-size:2.2rem;font-weight:700}",
    "@media(max-width:36rem){#examen-psp .ex-bloq{grid-template-columns:1fr 3rem}#examen-psp .ex-bloq .ex-barra{grid-column:1 / -1;order:3}}"
  ].join("\n");
  document.head.appendChild(css);

  var tema = null, modo = "examen", sesion = null, timer = null;

  // ------------------------------------------------------------------ selección de preguntas según el peso de cada bloque
  function pesoDe(t, b) { for (var i = 0; i < t.bloques.length; i++) if (t.bloques[i].id === b) return t.bloques[i]; return { peso: 1, n: b, ref: "" }; }
  function elegir(t, pool, n) {
    var porBloque = {};
    pool.forEach(function (q) { porBloque[q.b] = (porBloque[q.b] || 0) + 1; });
    var res = [], rest = pool.slice();
    while (res.length < n && rest.length) {
      var pesos = rest.map(function (q) { return pesoDe(t, q.b).peso / porBloque[q.b]; });
      var total = pesos.reduce(function (a, b) { return a + b; }, 0), x = Math.random() * total, k = 0;
      while (k < rest.length - 1 && x >= pesos[k]) { x -= pesos[k]; k++; }
      res.push(rest.splice(k, 1)[0]);
    }
    return res;
  }

  // ------------------------------------------------------------------ menú
  var menuMostrado = false;
  // Se sube cuando ya se ha pintado todo: si la página encoge al cambiar de pantalla, subir antes dejaría el scroll a medias.
  function alInicio() { setTimeout(function () { raiz.scrollIntoView({ block: "start" }); }, 0); }
  function menu() {
    clearInterval(timer); sesion = null;
    var h = leer();
    var html = '<div class="ex-card"><strong>1. Elige el tema</strong><div id="ex-temas"></div></div>' +
      '<div class="ex-card"><strong>2. Elige cómo quieres practicar</strong>' +
      '<label class="ex-op"><input type="radio" name="modo" value="examen" checked> <strong>Examen</strong>: con tiempo y sin ayudas. Ves la nota y las correcciones al entregar.</label>' +
      '<label class="ex-op"><input type="radio" name="modo" value="repaso"> <strong>Repaso</strong>: sin tiempo, y cada pregunta se corrige al momento con su explicación.</label></div>' +
      '<div class="ex-card"><strong>3. Empieza</strong><div>' +
      '<button class="ex-btn" id="ex-teo">Examen teórico</button>' +
      '<button class="ex-btn" id="ex-pra">Examen práctico</button>' +
      '<button class="ex-btn sec" id="ex-fal">Repasar mis fallos (<span id="ex-nf">0</span>)</button></div>' +
      '<p style="margin:.4rem 0 0"><small>Las preguntas se eligen al azar con el peso que cada materia tiene en el tema. Tus resultados se guardan solo en este navegador.</small></p></div>' +
      '<div id="ex-hist"></div>';
    raiz.innerHTML = html;
    if (menuMostrado) alInicio();      // al volver al menú tras un examen, sube al inicio (no al cargar la página)
    menuMostrado = true;
    var cont = raiz.querySelector("#ex-temas");
    DATOS.temas.forEach(function (t) {
      var l = el('<label class="ex-op"><input type="radio" name="tema" value="' + t.id + '"' + (t.disponible ? "" : " disabled") + '> <strong>' + esc(t.titulo) + "</strong>" + (t.disponible ? "" : " <em>(próximamente)</em>") + "</label>");
      cont.appendChild(l);
    });
    var primero = cont.querySelector("input:not([disabled])"); if (primero) primero.checked = true;
    function actual() { var v = raiz.querySelector('input[name="tema"]:checked'); return v ? DATOS.temas.filter(function (t) { return String(t.id) === v.value; })[0] : null; }
    function refrescar() { var t = actual(); var n = 0; if (t) { Object.keys(h.fallos).forEach(function (k) { if (k.indexOf("t" + t.id + "-") === 0) n++; }); } raiz.querySelector("#ex-nf").textContent = n; raiz.querySelector("#ex-fal").disabled = !n; }
    cont.addEventListener("change", refrescar); refrescar();
    function iniciar(tipo) { tema = actual(); if (!tema) return; modo = raiz.querySelector('input[name="modo"]:checked').value; empezar(tipo); }
    var hayPractico = DATOS.temas.some(function (t) { return (t.salida || []).length + (t.hueco || []).length + (t.codigo || []).length > 0; });
    if (!hayPractico) { raiz.querySelector("#ex-pra").remove(); raiz.querySelector("#ex-teo").textContent = "Examen tipo test"; }   // simuladores solo de test
    raiz.querySelector("#ex-teo").onclick = function () { iniciar("teoria"); };
    if (hayPractico) raiz.querySelector("#ex-pra").onclick = function () { iniciar("practica"); };
    raiz.querySelector("#ex-fal").onclick = function () { iniciar("fallos"); };
    // historial
    var hist = h.intentos.slice(-8).reverse();
    if (hist.length) {
      var f = '<div class="ex-card"><strong>Tus últimos intentos</strong><table><thead><tr><th>Fecha</th><th>Tema</th><th>Tipo</th><th>Nota</th></tr></thead><tbody>';
      hist.forEach(function (i) { f += "<tr><td>" + esc(i.fecha) + "</td><td>" + esc(i.tema) + "</td><td>" + esc(i.tipo) + "</td><td>" + i.nota.toFixed(1) + "</td></tr>"; });
      raiz.querySelector("#ex-hist").innerHTML = f + "</tbody></table></div>";
    }
  }

  // ------------------------------------------------------------------ montar un examen
  function crearItem(t, q, tipo, idx) {
    var id = "t" + t.id + "-" + tipo.slice(0, 2) + "-" + q.i;
    return { id: id, tipo: tipo, q: q, num: idx + 1, corregido: false, puntos: 0, marcas: [] };
  }
  function empezar(que) {
    var t = tema, items = [], limite = 0, nombre = "";
    var todos = function (tipo) { return t[tipo].map(function (q, i) { q.i = i; return q; }); };
    if (que === "teoria") { nombre = "Teórico"; limite = 25 * 60; items = elegir(t, todos("teoria"), 20).map(function (q, i) { return crearItem(t, q, "teoria", i); }); }
    else if (que === "practica") {
      nombre = "Práctico"; limite = 60 * 60;
      var s = elegir(t, todos("salida"), 2).map(function (q) { return crearItem(t, q, "salida", 0); });
      var u = elegir(t, todos("hueco"), 2).map(function (q) { return crearItem(t, q, "hueco", 0); });
      var c = elegir(t, todos("codigo"), 2).map(function (q) { return crearItem(t, q, "codigo", 0); });
      items = s.concat(u, c);
      if (items.length < 6) {        // si el tema no tiene de algún tipo (por ejemplo, huecos), se completa con los que haya
        var usadas = items.map(function (it) { return it.q; });
        ["salida", "codigo", "hueco"].forEach(function (tipo) {
          if (items.length >= 6) return;
          var libres = todos(tipo).filter(function (q) { return usadas.indexOf(q) < 0; });
          elegir(t, libres, 6 - items.length).forEach(function (q) { items.push(crearItem(t, q, tipo, 0)); usadas.push(q); });
        });
      }
      items = items.map(function (it, i) { it.num = i + 1; return it; });
    } else {
      nombre = "Repaso de fallos"; limite = 0;
      var h = leer();
      ["teoria", "salida", "hueco", "codigo"].forEach(function (tipo) {
        todos(tipo).forEach(function (q) { var it = crearItem(t, q, tipo, 0); if (h.fallos[it.id]) items.push(it); });
      });
      items = barajar(items).map(function (it, i) { it.num = i + 1; return it; });
      if (!items.length) { menu(); return; }
    }
    sesion = { items: items, nombre: nombre, limite: limite, inicio: Date.now(), entregado: false, tipo: que };
    pintar();
    if (modo === "examen" && limite) {
      timer = setInterval(function () {
        var resta = limite - Math.floor((Date.now() - sesion.inicio) / 1000), r = raiz.querySelector("#ex-reloj");
        if (r) r.textContent = hora(Math.max(0, resta));
        if (resta <= 0) { clearInterval(timer); entregar(); }
      }, 1000);
    }
  }

  // ------------------------------------------------------------------ pintar el examen
  function bloqueNombre(b) { return pesoDe(tema, b).n; }
  function pintarItem(it) {
    var q = it.q, h = '<div class="ex-card" id="ex-' + it.num + '"><div><strong>' + it.num + ".</strong> <small>" + esc(bloqueNombre(q.b)) + "</small></div>";
    if (it.tipo === "teoria") {
      it.orden = it.orden || barajar(q.o.map(function (t, i) { return { t: t, c: i === 0 }; }));
      h += "<p>" + md(q.q) + "</p>" + (q.code ? "<pre><code>" + esc(q.code) + "</code></pre>" : "");
      it.orden.forEach(function (o, k) { h += '<label class="ex-op" data-k="' + k + '"><input type="radio" name="p' + it.num + '" value="' + k + '"> ' + (o.t.indexOf("\n") >= 0 ? "<pre><code>" + esc(o.t) + "</code></pre>" : md(o.t)) + "</label>"; });
    } else if (it.tipo === "salida") {
      h += "<p>" + md(q.q) + "</p><pre><code>" + esc(q.code) + '</code></pre><p>Escribe, línea a línea, lo que aparece en pantalla:</p><textarea rows="6" name="p' + it.num + '" spellcheck="false"></textarea>';
    } else if (it.tipo === "hueco") {
      it.orden = it.orden || barajar(q.o.map(function (t, i) { return { t: t, c: i === 0 }; }));
      h += "<p>" + md(q.q) + "</p><pre><code>" + esc(q.code).replace("___", "<mark>▢▢▢</mark>") + "</code></pre>";
      it.orden.forEach(function (o, k) { h += '<label class="ex-op" data-k="' + k + '"><input type="radio" name="p' + it.num + '" value="' + k + '"> <code>' + esc(o.t) + "</code></label>"; });
    } else {
      h += "<p>" + md(q.q) + "</p>" + (q.code ? "<p>Código que hay que probar:</p><pre><code>" + esc(q.code) + "</code></pre>" : "") +
        '<textarea rows="14" name="p' + it.num + '" spellcheck="false" placeholder="Escribe aquí tu código (puedes probarlo en DartPad o en tu editor)"></textarea>';
    }
    h += '<div class="ex-fb"></div>';
    if (modo === "repaso") h += '<button class="ex-btn sec ex-comp">Comprobar</button>';
    return h + "</div>";
  }
  function pintar() {
    var s = sesion, h = '<div class="ex-top"><span><strong>' + esc(tema.titulo) + " · " + s.nombre + "</strong> · " + s.items.length + " preguntas</span>" +
      (modo === "examen" && s.limite ? '<span>⏱ <strong id="ex-reloj">' + hora(s.limite) + "</strong></span>" : "<span>Modo repaso</span>") + "</div>";
    s.items.forEach(function (it) { h += pintarItem(it); });
    h += '<div style="margin:1rem 0">' + (modo === "examen" ? '<button class="ex-btn" id="ex-ent">Entregar</button>' : '<button class="ex-btn" id="ex-ent">Terminar y ver resultado</button>') + '<button class="ex-btn sec" id="ex-sal">Salir</button></div><div id="ex-res"></div>';
    raiz.innerHTML = h;
    alInicio();      // al empezar o repetir un examen, la página sube al inicio
    raiz.querySelector("#ex-ent").onclick = entregar;
    raiz.querySelector("#ex-sal").onclick = function () { if (sesion.entregado || confirm("¿Salir sin terminar? Se perderá este intento.")) menu(); };
    s.items.forEach(function (it) {
      var card = raiz.querySelector("#ex-" + it.num);
      if (modo === "repaso") {
        var b = card.querySelector(".ex-comp"); if (b) b.onclick = function () { corregir(it, card); b.disabled = true; };
        if (it.tipo === "teoria") card.addEventListener("change", function () { if (!it.corregido) { corregir(it, card); var bb = card.querySelector(".ex-comp"); if (bb) bb.disabled = true; } });
      }
    });
  }

  // ------------------------------------------------------------------ corregir una pregunta
  function marcarFallo(it, bien) {
    var d = leer();
    if (bien) delete d.fallos[it.id]; else d.fallos[it.id] = 1;
    guardar(d);
  }
  function corregir(it, card) {
    if (it.corregido) return; it.corregido = true;
    var q = it.q, fb = card.querySelector(".ex-fb"), bien = false, nota = "";
    if (it.tipo === "teoria" || it.tipo === "hueco") {
      var sel = card.querySelector('input[name="p' + it.num + '"]:checked');
      var elegida = sel ? parseInt(sel.value, 10) : -1;
      bien = elegida >= 0 && it.orden[elegida].c;
      card.querySelectorAll(".ex-op").forEach(function (l) {
        var k = parseInt(l.getAttribute("data-k"), 10);
        if (it.orden[k].c) l.classList.add("bien"); else if (k === elegida) l.classList.add("mala");
        l.querySelector("input").disabled = true;
      });
      it.puntos = bien ? 1 : 0;
      nota = (bien ? "✅ Correcto. " : (elegida < 0 ? "⚠️ Sin responder. " : "❌ Incorrecto. ")) + md(q.e);
      if (it.tipo === "hueco" && q.a) nota += "<pre><code>" + esc(q.a) + "</code></pre>";
      if (it.tipo === "hueco" && q.v) nota += q.v === "dart analyze"
        ? "<p><small>Opción comprobada con <code>dart analyze</code> (usa hardware: no se ejecuta aquí).</small></p>"
        : "<p><small>Opción comprobada con: " + esc(q.v) + ".</small></p>";
    } else if (it.tipo === "salida") {
      var area = card.querySelector("textarea"); area.disabled = true;
      bien = norm(area.value) === norm(q.a); it.puntos = bien ? 1 : 0;
      nota = (bien ? "✅ Correcto. " : "❌ No coincide. ") + "<p>Respuesta correcta:</p><pre><code>" + esc(q.a) + "</code></pre>" + md(q.e) +
        (q.v ? "<p><small>" + (q.v === "flutter test" ? "Resultado obtenido ejecutando este widget con <code>flutter test</code>." : "Resultado obtenido " + esc(q.v) + ".") + "</small></p>" : "");
    } else {
      card.querySelector("textarea").disabled = true;
      nota = "<p><strong>Solución modelo:</strong></p><pre><code>" + esc(q.sol) + "</code></pre>";
      if (q.a) nota += "<p>Con esa solución se muestra:</p><pre><code>" + esc(q.a) + "</code></pre>";
      else if (q.v && q.v.indexOf("flutter test") === 0) nota += "<p><small>Esta solución se ha comprobado con <code>flutter test</code>" + (q.v.indexOf("defectuosas") > 0 ? ": pasa con el código correcto y detecta versiones defectuosas del código." : ".") + "</small></p>";
      else if (q.v === "dart analyze") nota += "<p><small>Esta solución compila con los paquetes reales (<code>dart analyze</code>), pero usa hardware y no se ha podido ejecutar en un móvil.</small></p>";
      else if (q.v) nota += "<p><small>Solución comprobada con: " + esc(q.v) + ".</small></p>";
      nota += md(q.e) + "<p><strong>Autoevaluación:</strong> marca lo que cumple <em>tu</em> código.</p>";
      q.crit.forEach(function (c, k) { nota += '<label class="ex-op"><input type="checkbox" class="ex-crit" data-k="' + k + '"> ' + md(c) + "</label>"; });
      it.marcas = q.crit.map(function () { return false; });
    }
    fb.innerHTML = '<div class="ex-exp">' + nota + "</div>";
    if (it.tipo !== "codigo") { card.classList.add(bien ? "ok" : "mal"); marcarFallo(it, bien); }
    else {
      card.querySelectorAll(".ex-crit").forEach(function (c) {
        c.onchange = function () {
          it.marcas[parseInt(c.getAttribute("data-k"), 10)] = c.checked;
          it.puntos = it.marcas.filter(Boolean).length / it.marcas.length;
          marcarFallo(it, it.puntos >= 0.75);
          if (sesion.entregado) resultado();
        };
      });
    }
  }

  // ------------------------------------------------------------------ entregar y resultado
  function entregar() {
    var s = sesion; if (!s || s.entregado) return;
    clearInterval(timer); s.entregado = true;
    s.items.forEach(function (it) { corregir(it, raiz.querySelector("#ex-" + it.num)); });
    var b = raiz.querySelector("#ex-ent"); if (b) b.disabled = true;
    resultado(true);
    var r = raiz.querySelector("#ex-res"); if (r) r.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function resultado(guardarIntento) {
    var s = sesion, por = {}, total = 0;
    s.items.forEach(function (it) { var b = it.q.b; por[b] = por[b] || { p: 0, n: 0 }; por[b].p += it.puntos; por[b].n += 1; total += it.puntos; });
    var nota = 10 * total / s.items.length;
    var h = '<div class="ex-card"><div class="ex-nota">' + nota.toFixed(1) + ' <small>/ 10</small></div><p>' + (nota >= 5 ? "Aprobado." : "Todavía no llegas al 5.") +
      (s.items.some(function (i) { return i.tipo === "codigo"; }) ? " La nota de los ejercicios de código depende de las casillas que marques en la autoevaluación (sé honesto/a: es para ti)." : "") + "</p><strong>Por materia</strong>";
    var flojos = [];
    Object.keys(por).sort(function (a, b) { return por[a].p / por[a].n - por[b].p / por[b].n; }).forEach(function (b) {
      var x = por[b], pc = Math.round(100 * x.p / x.n), info = pesoDe(tema, b);
      h += '<div class="ex-bloq"><span>' + esc(info.n) + '</span><div class="ex-barra"><span style="width:' + pc + '%"></span></div><span>' + pc + " %</span></div>";
      if (pc < 70) flojos.push(info);
    });
    if (flojos.length) {
      h += "<p><strong>Qué repasar:</strong></p><ul>";
      flojos.forEach(function (f) { h += "<li>" + esc(f.n) + ": " + esc(f.ref) + "</li>"; });
      h += "</ul>";
    } else h += "<p>Vas bien en todas las materias. Repite con otro examen para afianzar.</p>";
    h += '<button class="ex-btn" id="ex-otra">Otro intento</button><button class="ex-btn sec" id="ex-menu">Volver al menú</button></div>';
    var r = raiz.querySelector("#ex-res"); r.innerHTML = h;
    r.querySelector("#ex-otra").onclick = function () { empezar(s.tipo); };
    r.querySelector("#ex-menu").onclick = menu;
    if (!guardarIntento) { var u = leer(); if (u.intentos.length) { u.intentos[u.intentos.length - 1].nota = nota; guardar(u); } }
    if (guardarIntento) {
      var d = leer(); var f = new Date();
      d.intentos.push({ fecha: f.toLocaleDateString("es-ES") + " " + f.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }), tema: "Tema " + tema.id, tipo: s.nombre + (modo === "repaso" ? " (repaso)" : ""), nota: nota });
      d.intentos = d.intentos.slice(-40); guardar(d);
    }
  }

  menu();
})();
