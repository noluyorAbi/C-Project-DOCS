---
description: Integrationstest für performConnection-Funktion in TCP-Kommunikationsmodul
---
# Test_Performconnection

# Dokumentation für das Verzeichnis `test_performConnection`

## 1. Übersicht und Zweck

Das Verzeichnis `test_performConnection` beherbergt einen Integrationstest, der die Funktionalität der `performConnection`-Funktion aus dem TCP-Kommunikationsmodul überprüft. Diese Tests sind entscheidend, um die korrekte Implementierung der Prolog-Phase der Kommunikation zwischen einem Client und einem Gameserver sicherzustellen, indem ein festgelegtes Protokoll simuliert und getestet wird. Der Test simuliert einen Server und überprüft die Interaktionen mit einem Client, um so die Robustheit und Korrektheit der `performConnection`-Funktion zu validieren.

### Enthaltene Dateien:
- **`test_performConnection.c`**: Implementiert den Integrationstest für die `performConnection`-Funktion.
- **`README.md`**: Bietet eine grundlegende Beschreibung des Verzeichnisses und seiner Funktionalität.

## 2. Wichtige Funktionen

Der Integrationstest in `test_performConnection.c` enthält mehrere entscheidende Funktionen:

### 2.1 `mock_server`

- **Zweck**: Simuliert einen Gameserver, der Nachrichten sendet und empfängt, um die Interaktion mit der `performConnection`-Funktion zu testen.
- **Eingabeparameter**:
  - `void *arg`: Ein Zeiger auf den Server-Socket, der für die Kommunikation verwendet wird.
- **Rückgabewert**: `void*`: Diese Funktion gibt keinen Wert zurück; sie wird als Thread-Funktion verwendet.
- **Besondere Hinweise**: Diese Funktion läuft in einem separaten Thread und simuliert die Serverantworten, die ein Client während der Prolog-Phase erwarten würde.

## 3. Schnittstellen

### 3.1 Abhängigkeiten

- **Header-Datei**: `performConnection.h` aus dem Verzeichnis `../../modules/tcp_performConnection/` definiert die Schnittstelle der `performConnection`-Funktion. Diese Funktion wird im Test verwendet, um den Verbindungsaufbau zwischen Client und Server zu initiieren und zu überprüfen.
- **Standardbibliotheken**: Die Datei verwendet eine Vielzahl von Standardbibliotheken für die Socket-Programmierung (`<arpa/inet.h>`, `<netdb.h>`, `<netinet/in.h>`, `<sys/socket.h>`, `<unistd.h>`) und Thread-Verwaltung (`<pthread.h>`), sowie zur Datenmanipulation (`<stdio.h>`, `<stdlib.h>`, `<string.h>`).

## 4. Implementierungsdetails

### 4.1 Ablauf des Tests

1. **Initialisierung**: Ein Kommunikationskanal zwischen Mock-Server und Client wird mithilfe von `socketpair()` eingerichtet, was eine direkte Kommunikation zwischen diesen ermöglicht.
   
2. **Server-Thread**: Der Mock-Server wird in einem separaten Thread ausgeführt. Dieser Thread sendet initial eine Begrüßungsnachricht an den Client und erwartet bestimmte Antworten gemäß dem Protokoll.

3. **Nachrichtenübertragung**:
   - **Begrüßung**: Der Mock-Server sendet eine Begrüßungsnachricht („+ MNM Gameserver“) und erwartet die Empfangsbestätigung der Client-Version.
   - **Versionstest**: Der Server überprüft, ob der empfangene String mit „VERSION“ beginnt und sendet entsprechend eine Bestätigung („+ Client version accepted“) oder Ablehnung („- Unsupported version“).

### 4.2 Technische Details

- Der Test ist so konzipiert, dass er die Interaktion zwischen einem Mock-Server und einem Client simuliert, um die Integrität der `performConnection`-Funktion zu überprüfen.
- Fehlermeldungen werden auf die Standardausgabe geschrieben, um bei der Fehlerbehebung zu helfen. Dies ist entscheidend, um Probleme in der Interaktion zwischen Client und Server zu diagnostizieren.

## 5. Beispielaufrufe

### 5.1 Kompilieren und Ausführen des Tests

Um den Test `test_performConnection.c` auszuführen, sollte ein geeignetes Build-System wie `make` verwendet werden. Ein typisches Kommando im Hauptverzeichnis des Projekts könnte wie folgt aussehen:

```bash
make test
```

Dieses Kommando kompiliert den Test und führt ihn aus, wobei die detaillierten Protokolle des Nachrichtenaustauschs zwischen dem Mock-Server und dem Client ausgegeben werden. Diese Protokolle bieten wertvolle Einblicke in die Funktionsweise der `performConnection`-Funktion und helfen bei der Validierung der erfolgreichen Durchführung der Prolog-Phase.

---

Diese Dokumentation stellt sicher, dass Entwickler die Struktur und Funktion der Dateien im `test_performConnection`-Verzeichnis verstehen und nutzen können, um die `performConnection`-Funktion korrekt zu testen und zu validieren. Alle genannten Aspekte basieren auf den Inhalten der bereitgestellten Dateien und Auszüge.