# Apuntes de lenguajes

🌐 **Web: https://apuntes-dam.github.io/apuntes-lenguajes/**

Apuntes y ejercicios de programación para **Dart / Flutter, Java, Kotlin y Python**, con la misma estructura en los cuatro lenguajes: de la unidad 1 (primer programa) a la unidad 9 (bases de datos), con **175 ejercicios** adaptados y soluciones modelo bloqueadas.

## Las webs

| Tema | Web | Repositorio |
|---|---|---|
| Dart y Flutter | https://apuntes-dam.github.io/dart-flutter-apuntes/ | [dart-flutter-apuntes](https://github.com/apuntes-dam/dart-flutter-apuntes) |
| Java | https://apuntes-dam.github.io/java-apuntes/ | [java-apuntes](https://github.com/apuntes-dam/java-apuntes) |
| Kotlin | https://apuntes-dam.github.io/kotlin-apuntes/ | [kotlin-apuntes](https://github.com/apuntes-dam/kotlin-apuntes) |
| Python | https://apuntes-dam.github.io/python-apuntes/ | [python-apuntes](https://github.com/apuntes-dam/python-apuntes) |
| Git y GitHub | https://apuntes-dam.github.io/git-apuntes/ | [git-apuntes](https://github.com/apuntes-dam/git-apuntes) |
| Android y apps móviles | https://apuntes-dam.github.io/android-apuntes/ | [android-apuntes](https://github.com/apuntes-dam/android-apuntes) |
| HTML, CSS y JavaScript | https://apuntes-dam.github.io/web-apuntes/ | [web-apuntes](https://github.com/apuntes-dam/web-apuntes) |
| Procesos y planificación de la CPU | https://apuntes-dam.github.io/procesos-apuntes/ | [procesos-apuntes](https://github.com/apuntes-dam/procesos-apuntes) |

## Qué hay en este repositorio

* **Portada** para elegir lenguaje.
* **[Fundamentos](https://apuntes-dam.github.io/apuntes-lenguajes/fundamentos/)**: algoritmos y pseudocódigo, comunes a todos los lenguajes.
* **[Pasar de uno a otro](https://apuntes-dam.github.io/apuntes-lenguajes/pasar/)**: «estoy en Dart y quiero pasar a Kotlin», con equivalencias lado a lado.

Cada web tiene un selector de lenguaje en la cabecera que lleva a **la misma página** en otro lenguaje.

## Cómo está hecho

Webs estáticas con [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) publicadas con GitHub Pages (el workflow de `.github/workflows/pages.yml` construye y despliega al hacer push a `main`). Para verlo en local:

```bash
pip install mkdocs-material
mkdocs serve
```
