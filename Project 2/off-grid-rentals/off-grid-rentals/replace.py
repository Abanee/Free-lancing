import os
import glob
import re

files = glob.glob('*.html')
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Desktop Theme Toggle Regex
    content = re.sub(
        r'<button id="theme-toggle"[^>]*>[\s\S]*?</button>',
        '<button id="theme-toggle" class="text-xl hover:scale-110 transition pr-2" aria-label="Toggle Light/Dark Theme">☀️</button>',
        content
    )

    # Mobile Theme Toggle Regex
    content = re.sub(
        r'<button id="theme-toggle-mobile"[^>]*>[\s\S]*?</button>',
        '<button id="theme-toggle-mobile" class="text-xl hover:scale-110 transition" aria-label="Toggle Light/Dark Theme">☀️ Theme</button>',
        content
    )

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
print("done")
