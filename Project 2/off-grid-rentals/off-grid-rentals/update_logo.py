import os
import glob

directory = r"c:\Users\abane\Music\Free_lancing\Free-lancing\Project 2\off-grid-rentals\off-grid-rentals"
html_files = glob.glob(os.path.join(directory, "*.html"))

for file_path in html_files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace logo in nav
    old_logo_html_1 = """<a href="index.html" class="logo text-2xl font-display font-bold tracking-tight text-amber-400">\n        OffGrid<span class="text-stone-100">.</span>\n      </a>"""
    old_logo_html_2 = """<a href="index.html" class="logo text-2xl font-display font-bold tracking-tight text-amber-400">
        OffGrid<span class="text-stone-100">.</span>
      </a>"""
    
    new_logo_html = """<a href="index.html" class="logo flex items-center gap-2">
        <img src="assets/images/logo.png" alt="OffGrid Logo" class="h-10 w-auto" />
        <span class="text-2xl font-display font-bold tracking-tight text-amber-400 hidden sm:inline-block">OffGrid<span class="text-stone-100">.</span></span>
      </a>"""
      
    # Fallback to replace exact inner HTML if spacing differs
    inner_logo_old = """OffGrid<span class="text-stone-100">.</span>"""
    
    # Actually, let's just use regex or exact replace for the first chunk we know exists
    if old_logo_html_2 in content:
        content = content.replace(old_logo_html_2, new_logo_html)
    elif old_logo_html_1 in content:
         content = content.replace(old_logo_html_1, new_logo_html)
    else:
        # maybe spacing is different, let's replace the a tag contents
        a_tag_start = '<a href="index.html" class="logo text-2xl font-display font-bold tracking-tight text-amber-400">'
        if a_tag_start in content:
             content = content.replace(
                a_tag_start + '\n        OffGrid<span class="text-stone-100">.</span>\n      </a>',
                new_logo_html
             )
             
             content = content.replace(
                a_tag_start + '\r\n        OffGrid<span class="text-stone-100">.</span>\r\n      </a>',
                new_logo_html
             )

    # Replace favicon
    favicon_tag = '<link rel="icon" href="assets/images/logo.png" type="image/png" />\n</head>'
    if '<link rel="icon"' not in content:
        content = content.replace('</head>', favicon_tag)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated {os.path.basename(file_path)}")
