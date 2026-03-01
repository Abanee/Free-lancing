import os
import re

directory = r"c:\Users\abane\Music\Free_lancing\Free-lancing\Project_1\miniature-studio\pages"
dashboard_files = [f for f in os.listdir(directory) if f.startswith("dashboard") and f.endswith(".html")]

toggles_html = r'''
                <div class="flex items-center gap-2 border-l border-black/10 pl-4 ml-4">
                    <button type="button" data-theme-toggle aria-pressed="false"
                        class="min-touch rounded-full border border-black/15 px-3 text-sm font-semibold flex items-center justify-center">☀️</button>
                    <button type="button" data-dir-toggle aria-pressed="false"
                        class="min-touch rounded-full border border-black/15 px-3 text-sm font-semibold hover:rotate-[360deg] transition-transform duration-500 flex items-center justify-center">LTR</button>
                </div>
'''

for f in dashboard_files:
    file_path = os.path.join(directory, f)
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()

    # 1. Add theme/dir script to head
    if 'data-theme=' not in content:
        theme_script = r'''
    <script>
        (() => {
            try {
                const theme = localStorage.getItem("studio-theme");
                const direction = localStorage.getItem("studio-dir");
                if (theme) document.documentElement.setAttribute("data-theme", theme);
                if (direction) document.documentElement.setAttribute("dir", direction);
            } catch (_) { }
        })();
    </script>'''
        content = content.replace('</head>', theme_script + '\n</head>')

    # 2. Add main.js
    if 'main.js' not in content:
        content = content.replace('</head>', '    <script src="../assets/js/main.js" defer></script>\n</head>')

    # 3. Add toggles to header area
    # Current header right side: <div class="w-10 h-10 bg-[var(--color-accent)] rounded-full border-2 border-white shadow-md"></div>
    # Let's insert the toggles before this avatar
    avatar_regex = r'(<div class="w-10 h-10 bg-\[var\(--color-accent\)\].*?</div>)'
    
    if 'data-theme-toggle' not in content:
        content = re.sub(avatar_regex, toggles_html + r'\1', content)

    # 4. Fix off-brand blue/green bg.
    # It seems to be using an explicit bg-[var(--color-primary)] combined with old Tailwind config OR an inline style.
    # Looking at the code: class="... bg-[var(--color-primary)] ..." 
    # But dashboard html uses `<body class="... bg-slate-50">`
    # In earlier versions of this project, primary was a deep teal ("#0f4c5c"). 
    # If the user says it's an "off-brand blue/green", that IS the old primary color. 
    # Let's change these cards to use standard card styling: `bg-white` and use text-[var(--color-primary)] appropriately, 
    # or keep the solid color but use `var(--color-accent)`? 
    # Actually, the user says "fix the color of this error... to adhere to the theme" 
    # Let's change the problematic solid green/blue cards to match the standard white/glass cards and use text for highlighting.
    
    # "Total Points" card
    content = content.replace(
        'class="stat-card bg-[var(--color-primary)] p-6 rounded-3xl border border-white/10 shadow-xl"',
        'class="stat-card bg-white p-6 rounded-3xl border border-black/5 shadow-sm"'
    )
    content = content.replace(
        '<span class="block text-white/60 text-sm font-bold uppercase tracking-wider mb-2">Total',
        '<span class="block text-[var(--color-muted)] text-sm font-bold uppercase tracking-wider mb-2">Total'
    )
    # The point value
    content = content.replace(
        '<span class="text-4xl font-display text-white">4,250</span>',
        '<span class="text-4xl font-display text-[var(--color-primary)]">4,250</span>'
    )

    # "Palette of the Day" card
    # <div data-animate style="transition-delay: 0.1s" class="bg-[var(--color-primary)] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
    potd_bg = r'class="bg-\[var\(--color-primary\)\] rounded-3xl (p-8.*?) text-white shadow-xl relative overflow-hidden"'
    content = re.sub(potd_bg, r'class="bg-white rounded-3xl \1 border border-black/5 shadow-sm relative overflow-hidden"', content)
    
    content = content.replace('<h2 class="text-xl font-bold mb-4">Palette of the Day</h2>', '<h2 class="text-xl font-bold mb-4 text-[var(--color-primary)]">Palette of the Day</h2>')
    content = content.replace('<p class="text-sm text-white/70 mb-6">', '<p class="text-sm text-[var(--color-muted)] mb-6">')
    # Button inside Palette of the Day
    content = content.replace(
        '<button\n                            class="w-full py-3 bg-white text-[var(--color-primary)] rounded-2xl font-bold text-sm hover:scale-[1.02] transition-transform">',
        '<button\n                            class="w-full py-3 btn-primary text-white rounded-2xl font-bold text-sm hover:scale-[1.02] transition-transform">'
    )

    # 5. Fix hover colors on lists/cards inside the dashboard
    # Current hover: hover:bg-slate-50
    # Change to standard hover: hover:bg-black/5 for consistent readable gray. 
    # Wait, the prompt says "is type of white gray color fix the hover color and make revel cover to see the texts"
    # Actually, hover:bg-slate-50 is very light. hover:bg-black/5 (or hover:bg-gray-100 dark:hover:bg-white/10) is better.
    content = content.replace('hover:bg-slate-50', 'hover:bg-black/5')

    with open(file_path, "w", encoding="utf-8") as file:
        file.write(content)
    print(f"Updated {f}")
