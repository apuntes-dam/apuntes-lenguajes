# Pasar de un lenguaje a otro

Elige el lenguaje en el que ya programas (**Estoy en**) y al que quieres pasar (**Quiero pasar a**). Verás cada idea **lado a lado**, con su código resaltado y un botón para copiarlo. Puedes intercambiar origen y destino, filtrar por palabra o saltar a una idea del índice.

<div class="pasar-sel" id="pasar-sel">
  <div class="grupo"><b>Estoy en</b><span id="sel-from" class="pasar-btns"></span></div>
  <button type="button" id="pasar-cambiar" class="pasar-cambiar" title="Intercambiar origen y destino" aria-label="Intercambiar origen y destino"></button>
  <div class="grupo"><b>Quiero pasar a</b><span id="sel-to" class="pasar-btns"></span></div>
  <input type="search" id="pasar-filtro" class="pasar-filtro" placeholder="Filtrar ideas…" aria-label="Filtrar ideas">
</div>

<details class="pasar-indice" id="pasar-indice"><summary>Ir a una idea</summary><div class="pi-lista"></div></details>

<div id="pasar-tabla"></div>

!!! note "Notas"
    * Son equivalencias para empezar, no traducciones exactas: cada lenguaje tiene su forma idiomática.
    * Todos los fragmentos se han ejecutado en Dart 3, Java 25, Kotlin, Python 3.13 y C# (.NET 10).
