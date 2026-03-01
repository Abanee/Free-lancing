import os
import re
import shutil

root_dir = r"c:\Users\abane\Music\Free_lancing\Free-lancing\Project_1\miniature-studio"
pages_dir = os.path.join(root_dir, "pages")

# 1. Move `pages/index.html` to `index.html`
old_index = os.path.join(pages_dir, "index.html")
new_index = os.path.join(root_dir, "index.html")

if os.path.exists(old_index):
    shutil.move(old_index, new_index)

# 2. Update links inside the newly moved `index.html`
with open(new_index, "r", encoding="utf-8") as f:
    content = f.read()

# Change asset links: ../assets/ -> ./assets/ or just assets/
content = content.replace('href="../assets/', 'href="assets/')
content = content.replace('src="../assets/', 'src="assets/')

# Change page links: href="about.html" -> href="pages/about.html" (except index.html)
# First replace href="index.html" with a placeholder to avoid replacing it during generic page replacement
content = content.replace('href="index.html"', 'href="__SELF__"')

# Find all <a> hrefs and replace if they are just "filename.html" 
# Example: href="about.html" -> href="pages/about.html"
def replace_page_link(match):
    target = match.group(1)
    # If it has a slash, it's already a path or external url. If it's empty or fragment, ignore.
    if '/' not in target and target.endswith('.html') and target != '__SELF__':
        return f'href="{target if target.startswith("pages/") else "pages/" + target}"'
    return match.group(0)

content = re.sub(r'href="([^"]+)"', replace_page_link, content)

# Restore index.html self-links
content = content.replace('href="__SELF__"', 'href="index.html"')

with open(new_index, "w", encoding="utf-8") as f:
    f.write(content)

# 3. Update all files in `pages/` to point to `../index.html`
for file_name in os.listdir(pages_dir):
    if not file_name.endswith('.html'):
        continue
    file_path = os.path.join(pages_dir, file_name)
    with open(file_path, "r", encoding="utf-8") as f:
        page_content = f.read()

    # We need to change `href="index.html"` to `href="../index.html"`
    # There could be elements like `<a href="index.html">` 
    page_content = re.sub(r'href="(index\.html)"', r'href="../\1"', page_content)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(page_content)

print("Moved index.html and updated all links.")
