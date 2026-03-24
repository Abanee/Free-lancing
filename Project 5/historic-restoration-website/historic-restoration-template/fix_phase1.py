import os
import re

def main():
    root_dir = r"c:\Users\abane\Music\Free_lancing\Free-lancing\Project 5\historic-restoration-website\historic-restoration-template"
    
    html_files = []
    for root, dirs, files in os.walk(root_dir):
        if '.gemini' in root: continue
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))

    for file_path in html_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original_content = content
        
        # 1. Fix tailwind config text colors
        if 'textColor:' not in content:
            content = re.sub(
                r"(colors:\s*{[^}]+})", 
                r"\1,\n          textColor: {\n            primary: 'var(--color-text-primary)',\n            secondary: 'var(--color-text-secondary)',\n            tertiary: 'var(--color-text-tertiary)',\n            inverse: 'var(--color-text-inverse)',\n          }", 
                content
            )

        # 2. Fix Navbar Background
        content = content.replace('bg-surface/80', 'bg-transparent')
        
        # 3. Fix Navbar breakpoint lg -> xl
        nav_match = re.search(r'<nav id="navbar".*?</nav>', content, re.DOTALL)
        if nav_match:
            nav_html = nav_match.group(0)
            nav_html = nav_html.replace('hidden lg:flex', 'hidden xl:flex')
            nav_html = nav_html.replace('lg:hidden', 'xl:hidden')
            content = content[:nav_match.start()] + nav_html + content[nav_match.end():]

        # 4. Fix Footer Logo Link
        prefix = '../' if 'pages' in file_path.replace('\\', '/') else ''
        footer_logo_pattern = r'<div class="flex items-center gap-3 mb-6">\s*<div class="w-12 h-12 flex items-center justify-center overflow-hidden">\s*<img src="[^"]*logo\.png"[^>]*>\s*</div>\s*<div>\s*<h3[^>]*>HeritageCraft</h3>\s*<p[^>]*>Since 1985</p>\s*</div>\s*</div>'
        
        replacement = f'<a href="{prefix}index.html" class="flex items-center gap-3 mb-6 hover:opacity-90 transition-opacity">\n            <div class="w-12 h-12 flex items-center justify-center overflow-hidden">\n              <img src="{prefix}assets/logo.png" alt="HeritageCraft Logo" class="w-full h-full object-contain">\n            </div>\n            <div>\n              <h3 class="font-display font-bold text-lg">HeritageCraft</h3>\n              <p class="text-xs text-tertiary">Since 1985</p>\n            </div>\n          </a>'
        
        content = re.sub(footer_logo_pattern, replacement, content, flags=re.DOTALL)

        if content != original_content:
            print(f"Updated {os.path.basename(file_path)}")
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)

if __name__ == '__main__':
    main()
