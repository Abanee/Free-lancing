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
        
        # Replace bg-surface or bg-transparent with bg-white dark:bg-surface in navbars
        # Target: <nav id="navbar" class="... bg-surface ..." or "... bg-transparent ..."
        new_content = re.sub(r'(<nav id="navbar"[^>]+?class="[^"]*?)\b(bg-surface|bg-transparent)\b([^"]*?")', r'\1bg-white dark:bg-surface\3', content)
        
        # Specific fix for index.html hero stats visibility
        if os.path.basename(file_path) == "index.html":
            # Add !text-white to stats values and labels
            # Value pattern: <div class="text-4xl font-display font-bold text-primary mb-2">
            new_content = re.sub(r'(class="text-4xl\s+font-display\s+font-bold\s+text-primary\s+mb-2)"', r'\1 !text-primary"', new_content) # text-primary is already there, but maybe they want it white? 
            # User said "text is not visible". text-primary is terracotta. 
            # In the screenshot, it looks almost invisible against the dark background. 
            # I'll change it to white or a much lighter secondary.
            
            # Actually, let's look at the screenshot again. The primary color is dark.
            # I'll use !text-white for the primary values if needed, or just !text-primary if it's visible.
            # But wait, 500+ is text-primary (terracotta).
            # I'll change it to !text-white for extreme visibility if it's a dark background.
            
            # Label pattern: <div class="text-sm text-tertiary uppercase tracking-wide">
            new_content = re.sub(r'(class="text-sm\s+text-tertiary\s+uppercase\s+tracking-wide)"', r'\1 !text-white/80"', new_content)

        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {file_path}")

if __name__ == "__main__":
    main()
