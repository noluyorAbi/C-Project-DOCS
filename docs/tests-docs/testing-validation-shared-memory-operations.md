---
description: Testen und Validieren von Shared-Memory-Operationen
---
# Test_Sharedmemory

# Dokumentation für das Verzeichnis `test_sharedMemory`

## Übersicht und Zweck

Das Verzeichnis `test_sharedMemory` dient der Überprüfung und Validierung der Funktionalität von Shared-Memory-Operationen in einem Softwareprojekt. Shared Memory ermöglicht die gemeinsame Nutzung von Speicherbereichen zwischen verschiedenen Prozessen, was insbesondere in Mehrspieler-Spielen zur Verwaltung von Spielerdaten nützlich ist. Das Verzeichnis enthält drei Hauptdateien:

- **test_sharedMemory.bash**: Ein Shell-Skript, das für die Kompilierung, Ausführung und Protokollierung von Testergebnissen verantwortlich ist.
- **test_sharedMemory.c**: Eine C-Quelldatei, die verschiedene Testfälle zur Verifizierung von Shared-Memory-Operationen implementiert.
- **README.md**: Eine beschreibende Datei, die grundlegende Informationen über die Struktur und Funktionalität des Verzeichnisses enthält.

## Wichtige Funktionen

### test_sharedMemory.bash

- **Kompilierung**: Das Skript überprüft die Existenz notwendiger Dateien und führt eine Kompilierung des Testprogramms `test_sharedMemory.c` mit GCC durch. Es stellt sicher, dass die Header-Datei `shared_memory.h` vorhanden ist und kompiliert den Testcode bei Bedarf neu.
  
- **Ausführung der Tests**: Nach erfolgreicher Kompilierung wird das Testprogramm ausgeführt, wobei die Ausgaben in Log-Dateien gespeichert werden. Die Testergebnisse werden im Verzeichnis `logs` abgelegt.
  
- **Fehlerbehandlung**: Das Skript enthält Mechanismen zur Bereinigung verbliebener Shared-Memory-Segmente vor und nach der Ausführung der Tests, um eine saubere Testumgebung zu gewährleisten.
  
- **Protokollierung**: Alle Testausgaben werden in separaten Log-Dateien (`test_sharedMemory.out` und `test_sharedMemory.err`) gespeichert. Am Ende des Tests wird der Benutzer gefragt, ob diese Dateien gelöscht werden sollen, um Speicherplatz zu sparen.

### test_sharedMemory.c

- **Initialisierung und Berichterstattung der Teststatistiken**: Enthält Funktionen zur Initialisierung von Teststatistiken und zur Berichterstattung von Testergebnissen.
  
  - `init_test_stats`: Initialisiert die Struktur `TestStats`, die die Anzahl der bestandenen und fehlgeschlagenen Tests speichert.
  
  - `report_test`: Berichtet über die Ergebnisse einzelner Tests, indem es den Namen des Tests, das Ergebnis (bestanden oder fehlgeschlagen) und eine Nachricht ausgibt.

- **Bereinigung von Shared Memory**: Bietet Funktionen zur sicheren Bereinigung von Shared-Memory-Segmenten nach Tests.

  - `cleanup_shared_memory`: Entfernt Shared-Memory-Segmente und protokolliert die Ergebnisse der Bereinigung. Diese Funktion stellt sicher, dass alle Ressourcen ordnungsgemäß freigegeben werden.

## Schnittstellen

### Interaktion zwischen Dateien

- **test_sharedMemory.bash** interagiert mit der C-Quelldatei `test_sharedMemory.c`, indem es diese kompiliert und ausführt. Es stellt sicher, dass alle notwendigen Header-Dateien im Pfad `../../modules/shared_memory` verfügbar sind.

- **Header-Datei**: `test_sharedMemory.c` inkludiert die Datei `shared_memory.h`, um Zugriff auf die Definitionen und Funktionen zur Verwaltung von Shared-Memory-Segmenten zu erhalten.

## Implementierungsdetails

### Wichtige Algorithmen und Datenstrukturen

- **TestStatistik-Struktur**: Die Struktur `TestStats` verfolgt die Anzahl der bestandenen und fehlgeschlagenen Tests, um eine Übersicht über die Testergebnisse zu ermöglichen.
  
- **Shared Memory Test Parameter**: Die Struktur `SharedMemoryTestParams` wird verwendet, um die Parameter für die Shared-Memory-Tests zu bündeln, darunter Anzahl der Spieler, Name des Spiels, Spielernummer sowie die PIDs des Denk- und Verbindungsspielers.

### Logik und Ablauf

- **Kompilierung und Ausführung**: Das Shell-Skript stellt sicher, dass alle Voraussetzungen für die Kompilierung erfüllt sind, und führt das kompakte Testprogramm aus. Es bereinigt alte Shared-Memory-Segmente, um Konflikte zu vermeiden, und protokolliert alle relevanten Informationen.

- **Fehlerbehandlung**: Das Skript verfügt über Mechanismen zur Identifizierung und Behebung von Fehlern während der Kompilierung und Ausführung des Testprogramms.

## Beispielaufrufe

### Shell-Skript

Um die Tests durchzuführen, kann das Shell-Skript mit folgendem Befehl ausgeführt werden:

```bash
./test_sharedMemory.bash
```

Dies führt zur Kompilierung und Ausführung der Tests sowie zur Erstellung der Protokolldateien im `logs`-Verzeichnis.

### C-Testprogramm

Das C-Programm `test_sharedMemory.c` wird automatisch durch das Shell-Skript kompiliert und ausgeführt. Es enthält keine direkten Eingabemechanismen für den Benutzer, sondern wird vollständig durch das Skript gesteuert.

**Hinweis**: Diese Dokumentation basiert vollständig auf den bereitgestellten Informationen und ist für die Nutzung der Dateien im Verzeichnis `test_sharedMemory` konzipiert. Sie sollte als einzige Quelle für die Implementierung und Nutzung der darin enthaltenen Funktionen dienen.