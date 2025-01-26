---
description: Verwaltung von TCP-Verbindungen und Spielphasen
---
# Tcp_Performconnection

# Dokumentation des Verzeichnisses `tcp_performConnection`

## Übersicht und Zweck

Das Verzeichnis `tcp_performConnection` enthält eine Sammlung von Header- und Quellcodedateien, die die Funktionalität zur Erstellung und Verwaltung von TCP-Verbindungen mit einem Spielserver bereitstellen. Es umfasst die Implementierung von Kommunikationsprotokollen, die für den Austausch von Nachrichten in verschiedenen Spielphasen erforderlich sind. Das Hauptziel ist es, eine stabile Verbindung zum Server herzustellen, Spielinformationen auszutauschen und den Spielablauf durch den Empfang und die Verarbeitung von Nachrichten zu steuern.

### Enthaltene Dateien

- `performConnection.h`: Deklariert Funktionen für die Verbindungsausführung und die Nachrichtenübertragung.
- `tcp_connection.h`: Deklariert die Funktion zur Erstellung einer TCP-Verbindung.
- `gameplay.h`: Deklariert Funktionen zur Handhabung der verschiedenen Spielphasen.
- `tcp_connection.c`: Implementiert die Logik zur Erstellung einer TCP-Verbindung und zur Durchführung des Verbindungsprotokolls.
- `performConnection.c`: Implementiert die Funktionen für die Nachrichtenübertragung und die Verbindungsausführung.
- `gameplay.c`: Implementiert die Funktionen zur Handhabung der Spielphasen.
- `README.md`: Bietet eine Übersicht über den Ordnerinhalt und die Funktionalität.

## Wichtige Funktionen

### createConnection

- **Zweck**: Baut eine Verbindung zum Spielserver auf und führt das Kommunikationsprotokoll durch.
- **Eingabeparameter**:
  - `GAME_ID` (char*): Die Spiel-ID, die bei der Verbindung genutzt wird.
  - `piece_data` (char*): Ein Puffer zur Speicherung des Spielzustands.
- **Rückgabewerte**: Gibt `EXIT_SUCCESS` bei erfolgreicher Ausführung oder `EXIT_FAILURE` im Fehlerfall zurück.

### performConnection

- **Zweck**: Führt die Verbindung gemäß dem Kommunikationsprotokoll aus.
- **Eingabeparameter**:
  - `sockfd` (int): Der Dateideskriptor für die TCP-Verbindung.
  - `GAME_ID` (char*): Die Spiel-ID.
  - `piece_data` (char*): Ein Puffer zur Speicherung des Spielzustands.
- **Rückgabewerte**: Gibt `EXIT_SUCCESS` bei erfolgreicher Ausführung oder `EXIT_FAILURE` im Fehlerfall zurück.

### sendMessage

- **Zweck**: Sendet eine Nachricht über den Socket.
- **Eingabeparameter**:
  - `sockfd` (int): Der Socket-Dateideskriptor.
  - `message` (const char*): Die zu sendende Nachricht.
- **Rückgabewerte**: Gibt `EXIT_SUCCESS` bei erfolgreicher Ausführung oder `EXIT_FAILURE` im Fehlerfall zurück.

### receiveMessage

- **Zweck**: Empfängt eine Nachricht über den Socket.
- **Eingabeparameter**:
  - `sockfd` (int): Der Socket-Dateideskriptor.
  - `buffer` (char*): Der Puffer zum Speichern der empfangenen Nachricht.
  - `buffer_size` (size_t): Die Größe des Puffers.
- **Rückgabewerte**: Gibt `EXIT_SUCCESS` bei erfolgreicher Ausführung oder `EXIT_FAILURE` im Fehlerfall zurück.

### handleWait, handleMove, handleGameover

- **Zweck**: Diese Funktionen verwalten die jeweiligen Spielphasen (WAIT, MOVE, GAMEOVER).
- **Eingabeparameter**:
  - `sockfd` (int): Der Socket-Dateideskriptor.
  - Ein spezifischer Parameter (`waitLine`, `moveLine`, `gameoverLine`), der die jeweilige Phasen-spezifische Eingabe enthält.
  - `piece_data` (char*): Ein Puffer zur Speicherung des Spielzustands (für MOVE und GAMEOVER).
- **Rückgabewerte**: Gibt `EXIT_SUCCESS` bei erfolgreicher Ausführung oder `EXIT_FAILURE` im Fehlerfall zurück.

## Schnittstellen

Die Dateien im Verzeichnis interagieren durch Funktionsaufrufe und gemeinsame Header-Dateien. `tcp_connection.c` nutzt die Funktionen aus `performConnection.h`, um den Verbindungsaufbau und die Protokollabwicklung zu implementieren. `gameplay.c` verwendet die Funktionen aus `performConnection.h` zur Nachrichtenübertragung während der Spielphasen.

Globale Variablen wie `shmid_info` und `shm_info` in `performConnection.h` sowie `shm` und `pipe_fd` in `gameplay.h` ermöglichen den Zugriff auf gemeinsam genutzte Speichersegmente und Interprozesskommunikationsmechanismen.

## Implementierungsdetails

### TCP-Verbindung

Die Implementierung in `tcp_connection.c` verwendet die POSIX-API, um eine TCP-Verbindung herzustellen. Es nutzt `getaddrinfo`, um Netzwerkadressen zu ermitteln, und versucht, eine Verbindung durch die Iteration über die ermittelten Adressen herzustellen. Die Verbindung wird durch die Funktion `performConnection` weitergeführt, die die Protokollkommunikation abwickelt.

### Nachrichtenübertragung

Die Nachrichtenübertragung wird durch `sendMessage` und `receiveMessage` in `performConnection.c` realisiert. Diese Funktionen verwenden `send` und `recv`, um Daten über den Socket zu senden und zu empfangen, und implementieren grundlegende Fehlerbehandlung.

### Spielphasen

`gameplay.c` implementiert die Verwaltung der Spielphasen. Jede Funktion für die Spielphasen sendet und empfängt Nachrichten, um mit dem Spielserver zu interagieren und den Spielstatus zu aktualisieren.

## Beispielaufrufe

Ein typisches Beispiel zur Nutzung der Hauptfunktionalitäten könnte wie folgt aussehen:

```c
char GAME_ID[] = "example_game_id";
char piece_data[BUFFER_SIZE];
if (createConnection(GAME_ID, piece_data) == EXIT_SUCCESS) {
    printf("Connection established successfully.\n");
} else {
    fprintf(stderr, "Failed to establish connection.\n");
}
```

Dieses Beispiel zeigt, wie eine Verbindung mittels `createConnection` aufgebaut wird. Der Erfolg oder Misserfolg des Verbindungsversuchs wird durch die Rückgabewerte der Funktion signalisiert, und die Ausgabe erfolgt entsprechend.