---
sidebar_position: 1
---

# Einführung in das C-Projekt

Entdecke das **C-Projekt für Neunermühle** und erfahre, wie es funktioniert.

## Überblick

Dieses Projekt ist ein **in C entwickelter Client** für das strategische Brettspiel Neunermühle. Es wurde im Rahmen des **Systempraktikums an der Ludwig-Maximilians-Universität München (LMU)** entwickelt. Der Client stellt eine Verbindung zu einem Spieleserver über TCP her und implementiert die vollständige Spielmechanik des Spiels.

### Ziel des Projekts

Das Projekt wurde entwickelt, um:

- Die Grundlagen der Netzwerkprogrammierung zu erlernen.
- Das Verständnis für die Implementierung von Spielalgorithmen zu vertiefen.
- Praktische Erfahrungen mit der Entwicklung in C und der Arbeit mit externen Servern zu sammeln.

### Was wird benötigt?

Um das Projekt auszuführen, benötigst du:

- **Einen C-Compiler**, wie z. B. [GCC](https://gcc.gnu.org/).
- **Make**, um den Build-Prozess zu automatisieren.
- Ein Terminal oder eine IDE mit integrierter Terminalfunktion (z. B. VS Code oder Terminal).

## Projekt einrichten

Klonen des Repositories und Navigieren in das Projektverzeichnis:

```bash
git clone https://github.com/noluyorAbi/C-Project.git
cd C-Project
```

## Kompilieren und Ausführen

Kompiliere das Projekt mit dem Befehl `make`:

```bash
make
```

Starte anschließend den Client mit der erstellten ausführbaren Datei:

```bash
./sysprak-client
```

Der Client stellt eine Verbindung zum Spieleserver her, und du kannst direkt mit dem Spielen von Neunermühle beginnen.

## Funktionen

- **TCP-Verbindung:** Kommuniziert mit einem entfernten Spieleserver.
- **Spielmechanik:** Implementiert die vollständigen Regeln von Neunermühle.
- **Plattformübergreifend:** Kompatibel mit Unix-basierten Systemen (Linux, macOS usw.).


## Nächste Schritte

Tauche in den Code und die Dokumentation ein, um die Funktionsweise der Spielmechanik und der Netzwerkkommunikation zu verstehen. Weitere Details und Anleitungen findest du in der [README.md](https://github.com/noluyorAbi/C-Project/blob/main/README.md) des Repositories.

