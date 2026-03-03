import os, glob, re

files = glob.glob('*.html')
for file in files:
    if file in ['login.html', 'signup.html']:
        continue
        
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove Book Now from Desktop & Mobile
    content = re.sub(
        r'<li>\s*<a href="cabin-detail\.html"[^>]*>Book\s*Now</a>\s*</li>',
        '',
        content,
        flags=re.IGNORECASE | re.MULTILINE
    )

    # Remove old Dashboard link (catch active and non-active state)
    content = re.sub(
        r'<li>\s*<a href="dashboard\.html"[^>]*>Dashboard</a>\s*</li>',
        '',
        content,
        flags=re.IGNORECASE
    )

    # Remove old Login link
    content = re.sub(
        r'<li>\s*<a href="login\.html"[^>]*>Login</a>\s*</li>',
        '',
        content,
        flags=re.IGNORECASE
    )
    
    # Desktop
    desktop_insertion = '''
                <li class="flex items-center gap-2 ml-4">
                    <a href="dashboard.html" class="px-4 py-2 bg-stone-800 text-stone-200 border border-stone-700 rounded-full font-medium hover:bg-stone-700 transition text-sm">Dashboard</a>
                    <a href="login.html" class="px-5 py-2.5 bg-amber-500 text-stone-950 rounded-full font-semibold hover:bg-amber-400 transition text-sm">Login</a>
                </li>'''
    
    content = re.sub(
        r'(<!-- Theme & Direction Toggles -->[\s\S]*?</li>)',
        r'\1' + desktop_insertion,
        content,
        count=1
    )
    
    # Mobile
    mobile_insertion = '''
                <li class="flex flex-col gap-2 mt-4 border-t border-stone-700 pt-4">
                    <a href="dashboard.html" class="w-full text-center px-4 py-2 bg-stone-800 text-stone-200 border border-stone-700 rounded-lg font-medium hover:bg-stone-700 transition text-sm">Dashboard</a>
                    <a href="login.html" class="w-full text-center px-4 py-2.5 bg-amber-500 text-stone-950 rounded-lg font-semibold hover:bg-amber-400 transition text-sm">Login</a>
                </li>'''
                
    content = re.sub(
        r'(<li class="flex items-center gap-4 py-2 border-t border-stone-700 mt-2">[\s\S]*?</li>)',
        r'\1' + mobile_insertion,
        content,
        count=1
    )

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Nav updated")
