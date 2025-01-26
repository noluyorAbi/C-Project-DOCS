import os
import json
from openai import OpenAI
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

def load_category_json(path):
    """Lädt die _category_.json-Datei."""
    with open(path, "r", encoding="utf-8") as file:
        return json.load(file)

def save_category_json(path, data):
    """Speichert die aktualisierte _category_.json-Datei."""
    with open(path, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=2, ensure_ascii=False)

def analyze_markdown_content(file_path, client):
    """Analysiert den Markdown-Inhalt mit OpenAI."""
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()

    prompt = f"""Analysiere den folgenden Markdown-Inhalt und gib:

1. Eine deutsche Kurzbeschreibung (max. 12 Wörter)
2. Einen technischen englischen Dateinamen (kebab-case)

Format:
Zweck: [Deutsche Funktionsbeschreibung]
Dateiname: [englischer-technischer-begriff]

Regeln:
- Zweck NUR auf Deutsch OHNE Dateinamen
- Dateiname NUR auf Englisch mit fachlichen Begriffen
- Keine Übersetzungen im Dateinamen
- Keine Doppelungen von Konzepten

Beispielantwort:
Zweck: Verwaltung gemeinsam genutzter Speicherbereiche
Dateiname: shared-memory-management

Inhalt:\n\n{content}"""

    stream = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        stream=True,
    )

    summary = ""
    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
            summary += chunk.choices[0].delta.content

    return summary.strip()

def update_frontmatter(file_path, description):
    """Aktualisiert die Metadaten im YAML-Frontmatter der MD-Datei."""
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    frontmatter = {}
    body_content = content
    if content.startswith('---\n'):
        parts = content.split('---\n', 2)
        if len(parts) > 2:
            frontmatter_content = parts[1]
            body_content = parts[2]
            
            # Einfaches Frontmatter Parsing
            for line in frontmatter_content.split('\n'):
                if ':' in line:
                    key, val = line.split(':', 1)
                    frontmatter[key.strip()] = val.strip()

    # Update Description
    frontmatter['description'] = description

    # Neues Frontmatter erstellen
    new_content = '---\n'
    for key, value in frontmatter.items():
        new_content += f"{key}: {value}\n"
    new_content += f'---\n{body_content}'

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)

def process_directory(directory, category_path, client):
    """Verarbeitet ein Verzeichnis mit deutschen Beschreibungen."""
    category = load_category_json(category_path)
    markdown_dir = Path(directory)
    description_list = []

    for file in markdown_dir.glob("*.md"):
        try:
            if file.name == "_category_.json":
                continue

            print(f"Verarbeite: {file.name}")
            summary = analyze_markdown_content(file, client)
            
            # Extrahiere Metadaten
            if "Dateiname:" not in summary or "Zweck:" not in summary:
                print(f"Ungültiges Format in Antwort:\n{summary}")
                continue

            zweck = summary.split("Zweck:")[1].split("Dateiname:")[0].strip()
            filename = summary.split("Dateiname:")[1].strip().lower()
            filename = filename.replace(" ", "-").replace("_", "-") + ".md"
            new_path = file.with_name(filename)

            # Umbenennung durchführen
            if not new_path.exists():
                os.rename(file, new_path)
                print(f"Umbenannt zu: {filename}")
                
                # Frontmatter aktualisieren
                update_frontmatter(new_path, zweck)
                
                # Füge deutsche Beschreibung ohne Dateinamen hinzu
                description_list.append(f"- {zweck}")
            else:
                print(f"Überspringe existierende Datei: {filename}")

        except Exception as e:
            print(f"Fehler bei {file.name}: {str(e)}")

    # Aktualisiere Kategoriedatei
    if description_list:
        category["link"]["description"] = "\n".join(description_list)
        save_category_json(category_path, category)
        print(f"Kategoriebeschreibung aktualisiert in: {category_path}")

def main():
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    root_path = input("Hauptverzeichnispfad eingeben: ").strip()

    for root, dirs, files in os.walk(root_path):
        category_json = os.path.join(root, "_category_.json")
        if os.path.exists(category_json):
            print(f"\nVerarbeite Ordner: {root}")
            process_directory(root, category_json, client)

if __name__ == "__main__":
    main()