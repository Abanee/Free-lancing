import os
import re

directory = r"c:\Users\abane\Music\Free_lancing\Free-lancing\Project_1\miniature-studio\pages"

def process_file(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Regex to find the header logo block from the previous step
    # We basically want to replace:
    # <a href="index.html" class="relative group block flex items-center justify-center">
    #   <div class="absolute -inset-2 bg-gradient-to-r...</div>
    #   <img src="../assets/images/logo.png" ...>
    # </a>
    
    header_logo_pattern = r'<a href="index\.html" class="relative group block flex items-center justify-center">\s*<div class="absolute -inset-2[^>]*></div>\s*<img src="\.\./assets/images/logo\.png"[^>]*>\s*</a>'
    
    header_logo_new = r'''<a href="index.html" class="flex items-center gap-3 relative group">
          <img src="../assets/images/logo.png" alt="Miniature Studio Logo" class="h-12 sm:h-16 w-auto object-contain drop-shadow-[0_0_6px_rgba(252,211,77,0.9)] group-hover:drop-shadow-[0_0_15px_rgba(252,211,77,1)] transition-all duration-300">
          <span class="font-display text-3xl sm:text-4xl text-[var(--color-primary)] leading-none pt-1 hidden sm:block">Miniature Studio</span>
        </a>'''

    # For the footer logo block:
    footer_logo_pattern = r'<a href="index\.html" style="display: inline-flex; align-items: center; justify-content: center; position: relative; text-decoration: none;">\s*<div style="position: absolute;[^>]*></div>\s*<img src="\.\./assets/images/logo\.png"[^>]*>\s*</a>'
    
    footer_logo_new = r'''<a href="index.html" style="display: inline-flex; align-items: center; gap: 1rem; text-decoration: none;">
            <img src="../assets/images/logo.png" alt="Miniature Studio Logo" style="height: 64px; width: auto; object-fit: contain; filter: drop-shadow(0 0 6px rgba(255,215,0,0.9)); transition: filter 0.3s;" onmouseover="this.style.filter='drop-shadow(0 0 15px rgba(255,215,0,1))'" onmouseout="this.style.filter='drop-shadow(0 0 6px rgba(255,215,0,0.9))'">
            <h3 style="font-size: 2rem; font-family: 'Bebas Neue', sans-serif; margin: 0; color: white; padding-top: 5px;">Miniature Studio</h3>
          </a>'''

    new_content = re.sub(header_logo_pattern, header_logo_new, content)
    new_content = re.sub(footer_logo_pattern, footer_logo_new, new_content)

    if new_content != content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated {os.path.basename(file_path)}")

if __name__ == "__main__":
    html_files = [f for f in os.listdir(directory) if f.endswith(".html")]
    for f in html_files:
        process_file(os.path.join(directory, f))
