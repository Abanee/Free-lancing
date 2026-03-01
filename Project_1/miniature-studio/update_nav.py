import os
import re

directory = r"c:\Users\abane\Music\Free_lancing\Free-lancing\Project_1\miniature-studio\pages"

def update_navs():
    index_file = os.path.join(directory, "index.html")
    with open(index_file, "r", encoding="utf-8") as f:
        content = f.read()

    # Extract header block from index.html
    header_pattern = re.compile(r'(<header class="sticky top-0 z-50 border-b border-black/10 surface-glass">.*?</header>)', re.DOTALL)
    match = header_pattern.search(content)
    if not match:
        print("Header not found in index.html")
        return
    template_header = match.group(1)

    html_files = [f for f in os.listdir(directory) if f.endswith(".html") and f != "index.html"]

    for file_name in html_files:
        file_path = os.path.join(directory, file_name)
        with open(file_path, "r", encoding="utf-8") as f:
            file_content = f.read()

        # Generate a page-specific header if we want to update the active item
        page_header = template_header

        # First, remove active class from Home since we copied from index.html
        # Desktop Home
        page_header = page_header.replace(
            '''class="text-[var(--color-primary)] underline decoration-[var(--color-accent)] decoration-2 underline-offset-4"\n                href="index.html"''',
            '''class="hover:text-[var(--color-primary)]" href="index.html"'''
        )
        # However, looking at the exact text in index.html:
        page_header = re.sub(
            r'class="text-\[var\(--color-primary\)\] underline decoration-\[var\(--color-accent\)\] decoration-2 underline-offset-4"\s*href="index\.html"',
            r'class="hover:text-[var(--color-primary)]" href="index.html"',
            page_header
        )
        
        # Mobile Home
        page_header = page_header.replace(
            'class="block rounded-lg px-3 py-2 bg-black/5" href="index.html"',
            'class="block rounded-lg px-3 py-2 hover:bg-black/5" href="index.html"'
        )

        # Now, add active class to the current page if it exists in the nav
        desktop_active = r'class="text-[var(--color-primary)] underline decoration-[var(--color-accent)] decoration-2 underline-offset-4" href="\1"'
        mobile_active = r'class="block rounded-lg px-3 py-2 bg-black/5" href="\1"'

        # E.g. class="hover:text-[var(--color-primary)]" href="about.html"
        page_header = re.sub(
            r'class="hover:text-\[var\(--color-primary\)\]" href="(' + re.escape(file_name) + r')"',
            desktop_active,
            page_header
        )
        
        # E.g. class="block rounded-lg px-3 py-2 hover:bg-black/5" href="about.html"
        page_header = re.sub(
            r'class="block rounded-lg px-3 py-2 hover:bg-black/5" href="(' + re.escape(file_name) + r')"',
            mobile_active,
            page_header
        )

        # Replace the entire header block in the target file
        # Note: the target file might have a slightly different header, but it should start with <header ... and end with </header>
        # Let's use a very broad match for <header ... </header> if there is only one in the body.
        # But wait, there's only one header in each file.
        new_file_content = re.sub(r'<header.*?</header>', page_header, file_content, flags=re.DOTALL)
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_file_content)
        print(f"Updated {file_name}")

if __name__ == "__main__":
    update_navs()
