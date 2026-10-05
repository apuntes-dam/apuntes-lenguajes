# Fundamentos: algoritmos y pseudocódigo

Esta página es **común a todos los lenguajes**. Aquí está la idea; cada web ([Dart](https://dopemmanuel.github.io/dart-flutter-apuntes/u01/01-programa/), [Java](https://dopemmanuel.github.io/java-apuntes/u01/01-programa/), [Kotlin](https://dopemmanuel.github.io/kotlin-apuntes/u01/01-programa/), [Python](https://dopemmanuel.github.io/python-apuntes/u01/01-programa/)) muestra cómo se traduce a su lenguaje.

## Qué es un programa

Un **programa** es una secuencia de instrucciones que un ordenador ejecuta para resolver un problema. Antes de escribirlo hay que tener claro el **algoritmo**: los pasos, en orden, que llevan de unos datos de entrada a un resultado.

Un buen algoritmo es:

| Propiedad | Significa |
|---|---|
| **Preciso** | cada paso está claro y no admite dudas |
| **Finito** | termina en algún momento |
| **Definido** | con los mismos datos de entrada da siempre el mismo resultado |
| **General** | sirve para cualquier dato válido, no solo para un ejemplo |

## Ciclo de desarrollo

1. **Analizar** el problema: qué entra, qué debe salir y qué casos raros hay.
2. **Diseñar** el algoritmo (pseudocódigo o diagrama de flujo).
3. **Codificar** en un lenguaje de programación.
4. **Probar** con datos normales, límite y erróneos, y corregir.
5. **Documentar** y mantener.

!!! tip "Entradas, proceso y salidas"
    Antes de escribir una línea, anota tres listas: **entradas** (qué datos recibe), **proceso** (qué se hace con ellos) y **salidas** (qué se muestra o devuelve).

## Pseudocódigo

El **pseudocódigo** describe el algoritmo con palabras, sin la sintaxis de ningún lenguaje. No hay un estándar único; estas convenciones bastan:

| Idea | Pseudocódigo |
|---|---|
| Leer un dato | `LEER nombre` |
| Mostrar un dato | `ESCRIBIR "Hola", nombre` |
| Asignar | `total <- precio * unidades` |
| Condición | `SI edad >= 18 ENTONCES ... SINO ... FIN SI` |
| Bucle con condición | `MIENTRAS cuenta > 0 HACER ... FIN MIENTRAS` |
| Bucle con contador | `PARA i DESDE 1 HASTA 5 HACER ... FIN PARA` |
| Función | `FUNCION doble(x) DEVOLVER x * 2 FIN FUNCION` |

### Ejemplo 1: área de un rectángulo

```text
ALGORITMO areaRectangulo
  LEER base
  LEER altura
  area <- base * altura
  ESCRIBIR "Área:", area
FIN
```

### Ejemplo 2: ¿mayor de edad? (decisión)

```text
ALGORITMO mayorDeEdad
  LEER edad
  SI edad >= 18 ENTONCES
    ESCRIBIR "Mayor de edad"
  SINO
    ESCRIBIR "Menor de edad"
  FIN SI
FIN
```

### Ejemplo 3: suma de 1 a n (repetición)

```text
ALGORITMO sumaHastaN
  LEER n
  suma <- 0
  PARA i DESDE 1 HASTA n HACER
    suma <- suma + i
  FIN PARA
  ESCRIBIR "Suma:", suma
FIN
```

## Errores típicos al diseñar

* **Olvidar un caso**: la base cero, un número negativo, una cadena vacía.
* **Usar una variable sin darle valor** antes (por ejemplo, la suma sin inicializar a 0).
* **Bucles que no terminan**: la condición nunca deja de cumplirse.
* **Mezclar tipos** sin convertir: tratar como número un texto leído del teclado.
* **Resolver solo el ejemplo** en lugar del caso general.

## Pruébalo tú

Escribe en pseudocódigo **antes** de programar:

1. Dado un número, mostrar si es par o impar.
2. Dados tres números, mostrar el mayor.
3. Contar cuántas vocales tiene una palabra.

Después tradúcelos a un lenguaje con ayuda de la tabla [Pasar de uno a otro](../pasar/).
