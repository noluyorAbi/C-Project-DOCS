---
description: Verwaltung gemeinsamen Speichers in Mehrprozess-Systemen
---
# Shared_Memory

# Shared Memory Modul

## Übersicht und Zweck

Das Verzeichnis `shared_memory` stellt ein Modul bereit, das die Verwaltung von gemeinsam genutztem Speicher (Shared Memory) in einem Mehrprozess-System ermöglicht. Dieses Modul ist insbesondere für die Speicherung und Verwaltung von Spiel- und Spielerinformationen konzipiert. Die enthaltenen Dateien sind:

1. **shared_memory.c**: Diese Datei implementiert die grundlegenden Operationen zur Verwaltung von Shared Memory, wie die Erstellung, Anbindung, Loslösung, und Entfernung von Shared Memory Segmenten.
2. **shared_memory.h**: Die Header-Datei definiert die Schnittstelle für die in `shared_memory.c` enthaltenen Funktionen und enthält die notwendigen Deklarationen und Definitionen.
3. **README.md**: Diese Datei liefert eine Übersicht über die Funktionalitäten des Moduls und beschreibt die Nutzung und Abhängigkeiten.

## Wichtige Funktionen

### 1. `createSharedMemory(int numPlayers)`

- **Zweck**: Erstellt ein Shared Memory Segment für eine definierte Anzahl von Spielern.
- **Eingabeparameter**: 
  - `int numPlayers`: Die Anzahl der Spieler, für die Speicher reserviert werden soll. Muss zwischen 1 und `MAX_PLAYERS_TEST` (100) liegen.
- **Rückgabewerte**: 
  - Liefert die ID des erstellten Shared Memory Segments bei Erfolg.
  - Gibt einen negativen Fehlercode (`SHM_ERROR_CREATION`) bei Fehlschlag zurück.
- **Besondere Hinweise**: Stellt sicher, dass die Spieleranzahl innerhalb der gültigen Grenzen liegt, bevor Speicher allokiert wird.

### 2. `attachSharedMemory(int shmid)`

- **Zweck**: Bindet ein Shared Memory Segment an den aktuellen Prozess.
- **Eingabeparameter**:
  - `int shmid`: Die ID des Shared Memory Segments, das angebunden werden soll.
- **Rückgabewerte**: 
  - Gibt einen Zeiger auf das Shared Memory Segment bei Erfolg zurück.
  - Gibt `NULL` bei Fehlschlag zurück.
- **Besondere Hinweise**: Funktioniert nicht, wenn die Segment-ID ungültig ist oder das Segment nicht existiert.

### 3. `detachSharedMemory(SharedMemory *shm)`

- **Zweck**: Trennt ein Shared Memory Segment vom aktuellen Prozess.
- **Eingabeparameter**:
  - `SharedMemory *shm`: Ein Zeiger auf das Shared Memory Segment, das getrennt werden soll.
- **Rückgabewerte**:
  - Gibt `SHM_SUCCESS` bei Erfolg zurück.
  - Gibt einen negativen Fehlercode (`SHM_ERROR_DETACH`) bei Fehlschlag zurück.
- **Besondere Hinweise**: Der Zeiger darf nicht `NULL` sein, andernfalls tritt ein Fehler auf.

## Schnittstellen

Die Dateien interagieren miteinander durch die Verwendung der Header-Datei `shared_memory.h`, die alle notwendigen Deklarationen und Definitionen bereitstellt. Diese Datei enthält Definitionen wichtiger Strukturen wie `SharedMemory` und `Player`, sowie Konstanten und Fehlercodes, die bei der Verwaltung von Shared Memory verwendet werden.

- **Globale Variablen und Konfigurationen**:
  - `MAX_PLAYERS_TEST`: Definiert die maximale Anzahl an Spielern, die im Shared Memory gespeichert werden können.
  - `SHM_PERMISSIONS`: Setzt die Berechtigungen für Shared Memory Segmente.
  - `INITIAL_SIZE`: Gibt die anfängliche Größe für spielbezogene Daten im Shared Memory an.

## Implementierungsdetails

### Datenstrukturen

- **`Player` Struktur**: Speichert Informationen zu einzelnen Spielern, einschließlich ihrer Nummer, Namen, und Registrierungsstatus.
- **`SharedMemory` Struktur**: Speichert allgemeine Spieleinformationen und eine dynamische Liste von Spielern. Die Struktur enthält auch Prozess-IDs für spezifische Rollen im Spielmanagement.
- **`shm_data_t` Struktur**: Wird verwendet, um Spielzustandsdaten zu speichern. Diese Struktur enthält ein Flag, das anzeigt, ob eine neue Spielaktion berechnet werden muss.

### Implementierung

- **Shared Memory Management**: Die Implementierung verwendet Systemaufrufe wie `shmget`, `shmat`, `shmdt`, um Speichersegmente zu erstellen, anzubinden, zu trennen und zu entfernen. Diese Operationen basieren auf den standardisierten Schnittstellen von `sys/shm.h`.

## Beispielaufrufe

### Erstellen und Anbinden von Shared Memory

```c
int shmid = createSharedMemory(10);
if (shmid < 0) {
    // Fehlerbehandlung
}

SharedMemory *shm = attachSharedMemory(shmid);
if (shm == NULL) {
    // Fehlerbehandlung
}
```

### Loslösung und Entfernung von Shared Memory

```c
if (detachSharedMemory(shm) != SHM_SUCCESS) {
    // Fehlerbehandlung
}

// Entfernen eines Shared Memory Segments
if (shmctl(shmid, IPC_RMID, NULL) == -1) {
    // Fehlerbehandlung
}
```

Diese Beispiele zeigen die grundlegende Nutzung der Hauptfunktionen des Moduls. Entwickler sollten sicherstellen, dass sie entsprechende Fehlerprüfungen und Ressourcenfreigaben implementieren, um Speicherlecks und andere Probleme zu vermeiden.