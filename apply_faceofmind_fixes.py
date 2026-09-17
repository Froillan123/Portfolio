import os
import sys
import json

faceofmind_dir = r"C:\Users\Admin\Documents\Faceofmind"

def scan():
    if not os.path.exists(faceofmind_dir):
        print(f"Directory not found: {faceofmind_dir}")
        return

    print(f"Scanning: {faceofmind_dir}")
    structure = {}
    for root, dirs, files in os.walk(faceofmind_dir):
        # Skip heavy folders
        if any(skip in root for skip in [".git", "node_modules", ".pytest_cache", ".idea", ".vscode", "UnityGames"]):
            continue
        rel_root = os.path.relpath(root, faceofmind_dir)
        structure[rel_root] = files

    output_path = r"c:\Users\Admin\Documents\Portfolio\faceofmind_structure.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(structure, f, indent=2)
    print(f"Wrote structure to {output_path}")

if __name__ == "__main__":
    scan()
