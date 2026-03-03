import os, glob, re

files = glob.glob('*.html')
for file in files:
    if file in ['login.html', 'signup.html']:
        continue
        
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Capture the UL element
    ul_match = re.search(r'(<ul.*?role="list">.*?</ul>)', content, flags=re.DOTALL | re.IGNORECASE)
    if not ul_match:
        print(f"Skipping {file} no UL")
        continue
    ul_str = ul_match.group(1)
    
    # Remove toggles from inside UL
    ul_str_cleaned = re.sub(r'<!-- Theme & Direction Toggles -->[\s\S]*?</li>', '', ul_str)
    # Also clean if it's not commented
    ul_str_cleaned = re.sub(r'<li class="flex items-center gap-2 border-l border-stone-600[\s\S]*?</li>', '', ul_str_cleaned)
    ul_str_cleaned = re.sub(r'<li class="flex items-center gap-2 border-l border-stone-600 pl-4 ml-2 flex-shrink-0"[\s\S]*?</li>', '', ul_str_cleaned)
    # Generic catch just in case it's missed
    ul_str_cleaned = re.sub(r'<li[^>]*>\s*<button id="theme-toggle"[\s\S]*?</button>\s*<button id="direction-toggle"[\s\S]*?</button>\s*</li>', '', ul_str_cleaned)
    
    # Capture mobile menu
    mobile_menu_match = re.search(r'(<div id="mobile-menu"[\s\S]*?</div>)', content, flags=re.DOTALL)
    if not mobile_menu_match:
        print(f"Skipping {file} no Mobile")
        continue
    mobile_menu_str = mobile_menu_match.group(1)
    
    # Remove toggles from mobile menu
    mobile_menu_cleaned = re.sub(r'<li class="flex items-center gap-4 py-2 border-t border-stone-700 mt-2">[\s\S]*?</li>', '', mobile_menu_str)
    
    toggles_html = '''
      <div class="flex items-center gap-2 border-stone-600 pl-2 md:pl-4 md:border-l md:ml-2">
        <button id="theme-toggle" class="text-xl hover:scale-110 transition pr-2" aria-label="Toggle Light/Dark Theme">☀️</button>
        <button id="direction-toggle" class="text-xs font-semibold uppercase tracking-wider hover:text-amber-400 transition" aria-label="Toggle LTR/RTL Direction">RTL</button>
      </div>
      <button id="mobile-menu-btn" class="md:hidden text-stone-300 hover:text-amber-400 transition ml-4" aria-label="Toggle menu" aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>'''
      
    right_side_container = f'<div class="flex items-center">\n{ul_str_cleaned}\n{toggles_html}\n</div>'
    
    # Find the block from mobile-menu-btn to </ul>
    # Use re.sub with a custom pattern to encompass the hamburger and UL
    # Pattern: <button id="mobile-menu-btn" ... </button> ... <ul ... </ul>
    content_without_old_nav = re.sub(
        r'<button id="mobile-menu-btn"[^>]*>[\s\S]*?</button>\s*<ul class="hidden md:flex[^>]*>[\s\S]*?</ul>',
        right_side_container,
        content,
        flags=re.IGNORECASE | re.DOTALL,
        count=1
    )
    
    content_final = content_without_old_nav.replace(mobile_menu_str, mobile_menu_cleaned)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content_final)

print("done")
