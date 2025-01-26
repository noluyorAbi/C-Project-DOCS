---
description: Berechnung des nächsten Spielzugs in einem Brettspiel
---
# Think

# Dokumentation des Verzeichnisses `think`

## Übersicht und Zweck

Das Verzeichnis `think` enthält den Code zur Berechnung des nächsten Spielzuges in einem strategischen Brettspiel. Das System verwendet geteilte Speichersegmente für den Datenaustausch und Interprozesskommunikation. Die enthaltenen Dateien und ihre Hauptfunktionen sind:

- `think.h`: Deklariert die Schnittstellen für das Modul `think`.
- `think.c`: Implementiert die Logik zur Berechnung eines nächsten Spielzugs.
- `util.h` und `util.c`: Helferfunktionen zur Spielfeldverwaltung.
- `nmm.h` und `nmm.c`: Funktionalitäten zur Verwaltung des Spiels "Nine Men's Morris".
- `README.md`: Beschreibt das Modul `think` und seine Funktionalität.

## Wichtige Funktionen

### think Funktion (think.c)
- **Zweck**: Berechnet den nächsten Zug basierend auf dem aktuellen Spielzustand.
- **Parameter**: 
  - `char *gameState`: Zeiger auf den Spielzustand im Shared Memory.
- **Rückgabewert**: 
  - `int`: Gibt `EXIT_SUCCESS` bei Erfolg und `EXIT_FAILURE` bei Fehler zurück.
- **Hinweise**: Nutzt Pipes zur Kommunikation zwischen Prozessen.

### get_board_index (util.c)
- **Zweck**: Berechnet den Index eines gegebenen Spielbrettplatzes.
- **Parameter**: 
  - `const char *position`: Position auf dem Spielbrett als Zeichenkette.
- **Rückgabewert**: 
  - `int`: Index auf dem Spielbrett oder `-1` bei ungültiger Eingabe.

### count_pieces (nmm.c)
- **Zweck**: Zählt die Anzahl der Spielsteine eines bestimmten Typs auf dem Brett.
- **Parameter**: 
  - `const char *board`: Das aktuelle Spielfeld als Zeichenkette.
  - `char symbol`: Der zu zählende Spielstein.
- **Rückgabewert**: 
  - `int`: Anzahl der Spielsteine.

### is_game_over (nmm.c)
- **Zweck**: Bestimmt, ob das Spiel beendet ist.
- **Parameter**: 
  - `const char *board`: Das Spielfeld.
  - `char myPiece`: Der Spielstein des Spielers.
  - `char opponentPiece`: Der Spielstein des Gegners.
- **Rückgabewert**: 
  - `bool`: `true`, wenn das Spiel vorbei ist, sonst `false`.

## Schnittstellen

### Header-Dateien
- **think.h**: Deklariert die Funktion `think`.
- **util.h**: Deklariert Hilfsfunktionen zur Spielfeldmanipulation.
- **nmm.h**: Deklariert Funktionen für die Spiellogik von "Nine Men's Morris".

### Globale Variablen
- **pipe_fd[2]** (think.h): Datei-Deskriptoren für die Pipe, zur Interprozesskommunikation genutzt.

## Implementierungsdetails

### Logik in think.c
- **Adjazenzliste**: Statische Struktur zur Repräsentation von Verbindungen zwischen Spielbrettpositionen.
- **Shared Memory**: Nutzt einen gemeinsamen Speicherbereich, um den Spielzustand zwischen Prozessen zu teilen.
- **IPC mit Pipes**: Kommuniziert mit anderen Prozessen über Pipes, um Spielzüge weiterzugeben.

### Hilfsfunktionen in util.c
- **Spielfeldverwaltung**: Funktionen zur Umwandlung von Brettpositionen und Überprüfung von Zügen.

### Spiellogik in nmm.c
- **Spielende-Bedingungen**: Prüft, ob ein Spieler weniger als drei Steine hat oder keine Züge möglich sind.
- **Zugbestimmung**: Bestimmt die nächste Aktion basierend auf den platzierten Steinen und dem Zugzähler.

## Beispielaufrufe

### Aufruf der Funktion `think`
```c
char *gameState = /* Zeiger auf den Spielzustand im Shared Memory */;
int result = think(gameState);
if (result == EXIT_SUCCESS) {
    // Erfolgreiche Berechnung des nächsten Zugs
} else {
    // Fehlerbehandlung
}
```

### Nutzung der Funktion `get_board_index`
```c
const char *position = "A1";
int index = get_board_index(position);
if (index != -1) {
    // Gültiger Index
} else {
    // Fehlerhafte Position
}
```

Diese Dokumentation bietet eine umfassende Übersicht über die Struktur und Funktionalität des Verzeichnisses `think`. Entwickler können diese Informationen nutzen, um das Modul in ein größeres System zu integrieren oder zu modifizieren.