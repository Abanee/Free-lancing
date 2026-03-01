import os
import re

directory = r"c:\Users\abane\Music\Free_lancing\Free-lancing\Project_1\miniature-studio\pages"

header_logo_old = r'<a href="index\.html" class="font-display text-3xl text-\[var\(--color-primary\)\] sm:text-4xl">Miniature Studio</a>'
header_logo_new = r'''<a href="index.html" class="relative group block flex items-center justify-center">
          <div class="absolute -inset-2 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-500 group-hover:duration-200 pointer-events-none"></div>
          <img src="../assets/images/logo.png" alt="Miniature Studio Logo" class="relative max-h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(252,211,77,0.8)]">
        </a>'''

footer_logo_old = r'<div style="display: flex; align-items: center; gap: 0\.5rem;">\s*<h3 style="font-size: 1\.25rem; font-weight: bold; margin: 0;">Miniature Studio</h3>\s*</div>'
footer_logo_new = r'''<a href="index.html" style="display: inline-flex; align-items: center; justify-content: center; position: relative; text-decoration: none;">
            <div style="position: absolute; top: -10px; bottom: -10px; left: -10px; right: -10px; background: radial-gradient(ellipse at center, rgba(255,215,0,0.6) 0%, rgba(255,140,0,0) 70%); border-radius: 50%; filter: blur(8px); transition: opacity 0.3s; opacity: 0.9; pointer-events: none;"></div>
            <img src="../assets/images/logo.png" alt="Miniature Studio Logo" style="position: relative; max-height: 54px; width: auto; object-fit: contain; filter: drop-shadow(0 0 12px rgba(255,215,0,1)); transition: filter 0.3s;" onmouseover="this.style.filter='drop-shadow(0 0 20px rgba(255,215,0,1))'" onmouseout="this.style.filter='drop-shadow(0 0 12px rgba(255,215,0,1))'">
          </a>'''

def process_file(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace header logo
    content = re.sub(header_logo_old, header_logo_new, content)
    
    # Replace footer logo
    content = re.sub(footer_logo_old, footer_logo_new, content)
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

html_files = [f for f in os.listdir(directory) if f.endswith(".html")]
for f in html_files:
    process_file(os.path.join(directory, f))
    print(f"Updated {f}")
