---
description: Automatisiertes Testen der Client-Konfiguration und Argumentenverarbeitung
---
# Test_Clientconf

# Dokumentation für das Verzeichnis `test_clientConf`

## 1. Übersicht und Zweck

Das Verzeichnis `test_clientConf` dient der automatisierten Testdurchführung für die Konfigurationsdatei `client.conf` und die Argumentenverarbeitung des Programms `sysprak-client`. Es besteht aus zwei Hauptbestandteilen: der Datei `README.md`, die eine Einführung und Anleitung zur Nutzung des Verzeichnisses bietet, sowie dem Bash-Skript `test_clientConf.sh`, das die eigentlichen Tests implementiert.

### Dateien im Verzeichnis:
- **README.md**: Dokumentiert den Zweck und die Verwendung des Verzeichnisses und des Skripts.
- **test_clientConf.sh**: Ein Bash-Skript zur Durchführung von Testszenarien für `sysprak-client`.

## 2. Wichtige Funktionen

### 2.1 `run_test` Funktion im `test_clientConf.sh`

- **Zweck**: Führt ein einzelnes Testszenario aus, indem es das Programm `sysprak-client` mit verschiedenen Konfigurationen und Argumenten testet.
- **Eingabeparameter**:
  - `test_name`: Der Name des Tests, der zur Kennzeichnung der Ausgaben verwendet wird.
  - `config_file`: Der Pfad zur verwendeten Konfigurationsdatei. Der Wert "NONE" bedeutet, dass keine Konfigurationsdatei angegeben wird, während "EMPTY" eine leere Datei angibt.
  - `args`: Zusätzliche Argumente, die an das `sysprak-client` Programm übergeben werden.
  - `expected_output`: Die erwartete Ausgabe des Programms, die mit der tatsächlichen verglichen wird.
  - `expected_exit_code`: Der erwartete Exit-Code des Programms, um die Korrektheit der Ausführung zu überprüfen.
- **Rückgabewerte**: Kein expliziter Rückgabewert, aber es schreibt die Ausgaben und Fehler des Programms in Log-Dateien im `logs` Verzeichnis.
- **Besondere Hinweise**: Diese Funktion ist entscheidend für die Validierung der Robustheit und Fehlerbehandlung des `sysprak-client`.

## 3. Schnittstellen

### Zwischen `test_clientConf.sh` und `sysprak-client`
- **Interaktion**: `test_clientConf.sh` führt das `sysprak-client` Programm aus, das sich im Verzeichnis `../../bin/` befinden muss. Es übergibt Konfigurationsdateien und Argumente an das Programm und prüft die Ausgaben und Exit-Codes.
- **Globale Variablen innerhalb `test_clientConf.sh`**:
  - `SCRIPT_DIR`: Der Verzeichnispfad, in dem das Skript sich befindet.
  - `PROGRAM`: Der vollständige Pfad zum ausführbaren `sysprak-client`.
  - `CONFIG_DIR`: Der Pfad, in dem die Konfigurationsdateien gespeichert sind.
  - `LOG_DIR`: Verzeichnis für die Ablage der Log-Dateien, das automatisch erstellt wird, falls es nicht existiert.

## 4. Implementierungsdetails

### `test_clientConf.sh` Logik

- **Verzeichnisverwaltung**: Stellt sicher, dass alle benötigten Verzeichnisse (z.B. `logs`) existieren, bevor Tests ausgeführt werden.
- **Konfigurationsdateien**: Enthält eine Liste von Konfigurationsdateien, die verschiedene Szenarien abdecken, wie z.B. fehlerhafte Formatierungen oder fehlende Parameter.
- **Testausführung**: Die Funktion `run_test` wird verwendet, um das `sysprak-client` mit den verschiedenen Konfigurationsdateien und Argumenten auszuführen. Es vergleicht die tatsächlichen Ergebnisse mit den erwarteten Werten und protokolliert die Ergebnisse.
- **Ergebnisprotokollierung**: Für jedes Testszenario werden die Standard- und Fehlerausgaben in separaten Log-Dateien gespeichert.

## 5. Beispielaufrufe

### Ausführen des Testskripts
Um alle Testszenarien durchzuführen, führen Sie das Skript aus der Kommandozeile wie folgt aus:

```bash
bash test_clientConf.sh
```

Voraussetzung ist, dass das `sysprak-client` Programm im Verzeichnis `../../bin/` vorhanden und ausführbar ist.

### Beispielszenario
Ein typisches Szenario, das mit der Funktion `run_test` im Skript getestet wird, könnte wie folgt aussehen:

- **Testname**: `test_missing_param`
- **Konfigurationsdatei**: `missing_required_param.conf`
- **Argumente**: Keine zusätzlichen Argumente
- **Erwartete Ausgabe**: Fehlermeldung über fehlende Parameter
- **Erwarteter Exit-Code**: Nicht-Null-Wert, der einen Fehler signalisiert

Dieses Szenario wird im Skript durch einen Funktionsaufruf der `run_test` Funktion mit den entsprechenden Parametern umgesetzt, wobei die Ergebnisse in den Log-Dateien gespeichert und auf Richtigkeit überprüft werden.

Diese Dokumentation bietet eine vollständige und präzise Anleitung zur Nutzung des `test_clientConf` Verzeichnisses und erläutert die Funktionsweise der enthaltenen Dateien im Detail.