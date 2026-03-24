import os
import re

def main():
    root_dir = r"c:\Users\abane\Music\Free_lancing\Free-lancing\Project 5\historic-restoration-website\historic-restoration-template"
    
    html_files = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(".html"):
                html_files.append(os.path.join(root, file))
    
    for file_path in html_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace bg-transparent with bg-surface in navbars
        # Target: <nav id="navbar" class="... bg-transparent ..."
        new_content = re.sub(r'(<nav id="navbar"[^>]+?class="[^"]*?)\bbg-transparent\b([^"]*?")', r'\1bg-surface\2', content)
        
        # Specific fix for index.html hero text visibility
        if os.path.basename(file_path) == "index.html":
            # Add !text-white to the h1 in hero section
            # Target line in index.html: <h1 class="font-display text-5xl...
            h1_pattern = r'(<h1 class="font-display\s+text-5xl\s+sm:text-6xl\s+lg:text-7xl\s+font-bold\s+mb-6\s+italic\s+leading-tight)"'
            new_content = re.sub(h1_pattern, r'\1 !text-white"', new_content)
            
            # Also add it to the badge and p tags in hero if possible
            new_content = re.sub(r'(<p class="text-xl\s+opacity-90\s+mb-10\s+max-w-2xl\s+mx-auto\s+leading-relaxed)"', r'\1 !text-white"', new_content)
            new_content = re.sub(r'(<div\s+class="inline-flex\s+items-center\s+gap-2\s+px-4\s+py-2\s+rounded-full\s+bg-primary/10\s+text-primary\s+text-sm\s+font-semibold\s+mb-6)"', r'\1 !text-primary"', new_content) # Ensure badge text-primary is visible
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {file_path}")

if __name__ == "__main__":
    main()
