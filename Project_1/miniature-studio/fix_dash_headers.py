import os
import re

directory = r"c:\Users\abane\Music\Free_lancing\Free-lancing\Project_1\miniature-studio\pages"
files = ["dashboard-orders.html", "dashboard-cart.html", "dashboard-payment.html", "dashboard-profile.html"]

right_side_html = r'''
                <div class="flex items-center gap-4 mt-4 lg:mt-0">
                    <button class="w-10 h-10 border border-black/10 rounded-full flex items-center justify-center bg-white shadow-sm">🔔</button>
                    <div class="flex items-center gap-2 border-l border-black/10 pl-4 ml-4">
                        <button type="button" data-theme-toggle aria-pressed="false"
                            class="min-touch rounded-full border border-black/15 px-3 text-sm font-semibold flex items-center justify-center">☀️</button>
                        <button type="button" data-dir-toggle aria-pressed="false"
                            class="min-touch rounded-full border border-black/15 px-3 text-sm font-semibold hover:rotate-[360deg] transition-transform duration-500 flex items-center justify-center">LTR</button>
                    </div>
                </div>
'''

avatar_html = r'''<div class="w-10 h-10 bg-[var(--color-accent)] rounded-full border-2 border-white shadow-md"></div>'''

for f in files:
    path = os.path.join(directory, f)
    with open(path, "r", encoding="utf-8") as file:
        content = file.read()
    
    # We want to replace <header ...> ... </header> if it doesn't already have the toggles.
    header_match = re.search(r'<header[^>]*>.*?<h1[^>]*>(.*?)</h1>.*?<p[^>]*>(.*?)</p>.*?</header>', content, re.DOTALL)
    
    # Special case for orders, it might just have h1 and p
    if header_match and 'data-theme-toggle' not in content:
        h1_text = header_match.group(1).strip()
        p_text = header_match.group(2).strip()
        
        # We will build the new header
        # Using flex-col to flex-row for responsive
        new_header = f'''<header class="flex flex-col lg:flex-row items-center justify-between mb-10 text-center lg:text-left gap-4">
                <div>
                    <h1 class="text-3xl font-bold text-[var(--color-primary)]">{h1_text}</h1>
                    <p class="text-[var(--color-muted)]">{p_text}</p>
                </div>
                <div class="flex items-center gap-4 mt-4 lg:mt-0">
                    <button class="w-10 h-10 border border-black/10 rounded-full flex items-center justify-center bg-white shadow-sm">🔔</button>
                    <div class="flex items-center gap-2 border-l border-black/10 pl-4 ml-4">
                        <button type="button" data-theme-toggle aria-pressed="false"
                            class="min-touch rounded-full border border-black/15 px-3 text-sm font-semibold flex items-center justify-center">☀️</button>
                        <button type="button" data-dir-toggle aria-pressed="false"
                            class="min-touch rounded-full border border-black/15 px-3 text-sm font-semibold hover:rotate-[360deg] transition-transform duration-500 flex items-center justify-center">LTR</button>
                    </div>
                    {avatar_html}
                </div>
            </header>'''
            
        content = content[:header_match.start()] + new_header + content[header_match.end():]
        
    with open(path, "w", encoding="utf-8") as file:
        file.write(content)
        
css_path = r"c:\Users\abane\Music\Free_lancing\Free-lancing\Project_1\miniature-studio\assets\css\dark-mode.css"
with open(css_path, "a", encoding="utf-8") as file:
    file.write("\n\n/* Dashboard Specific Dark Mode Fixes */\n")
    file.write("html[data-theme=\"dark\"] .hover\\:bg-black\\/5:hover {\n")
    file.write("  background-color: rgba(255, 255, 255, 0.05) !important;\n")
    file.write("}\n\n")
    file.write("html[data-theme=\"dark\"] .profile-input {\n")
    file.write("  background-color: rgba(22, 32, 38, 0.9) !important;\n")
    file.write("  color: var(--color-text) !important;\n")
    file.write("  border-color: rgba(255, 255, 255, 0.1) !important;\n")
    file.write("}\n")
    file.write("html[data-theme=\"dark\"] .payment-method {\n")
    file.write("  background-color: rgba(22, 32, 38, 0.9) !important;\n")
    file.write("  border-color: rgba(255, 255, 255, 0.1) !important;\n")
    file.write("}\n")
