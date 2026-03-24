import os
import re

def standardize_nav():
    root_dir = r'c:\Users\abane\Music\Free_lancing\Free-lancing\Project 5\historic-restoration-website\historic-restoration-template'
    home2_path = os.path.join(root_dir, 'home2.html')
    
    with open(home2_path, 'r', encoding='utf-8') as f:
        home2_content = f.read()
    
    # Extract Nav and Mobile Menu template
    nav_match = re.search(r'<nav id="navbar".*?</nav>', home2_content, re.DOTALL)
    mobile_menu_match = re.search(r'<div id="mobile-menu".*?</div>', home2_content, re.DOTALL)
    
    nav_template = nav_match.group(0)
    mobile_template = mobile_menu_match.group(0)
    
    html_files = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
                
    for file_path in html_files:
        if file_path == home2_path:
            continue
            
        filename = os.path.basename(file_path)
        is_in_pages = 'pages' in os.path.dirname(file_path)
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        prefix = '../' if is_in_pages else ''
        current_nav = nav_template
        current_mobile = mobile_template
        
        # 1. Path Replacements
        current_nav = current_nav.replace('src="assets/logo.png"', f'src="{prefix}assets/logo.png"')
        current_nav = current_nav.replace('href="index.html"', f'href="{prefix}index.html"')
        current_nav = current_nav.replace('href="home2.html"', f'href="{prefix}home2.html"')
        current_mobile = current_mobile.replace('href="index.html"', f'href="{prefix}index.html"')
        current_mobile = current_mobile.replace('href="home2.html"', f'href="{prefix}home2.html"')
        
        if is_in_pages:
            current_nav = current_nav.replace('href="pages/', 'href="')
            current_mobile = current_mobile.replace('href="pages/', 'href="')

        # 2. Reset All Links
        # Desktop
        current_nav = re.sub(r'text-primary font-medium transition-colors border-b-2 border-primary', 'text-secondary transition-colors', current_nav)
        
        # Mobile: normalize all to hover:text-primary
        # Match matches text-primary when NOT preceded by hover:
        current_mobile = re.sub(r'(?<!hover:)text-primary', 'hover:text-primary', current_mobile)

        # 3. Set Active State
        target_href = f'{prefix}{filename}' if not is_in_pages and filename == 'index.html' else filename
        if filename == 'index.html' and is_in_pages:
             target_href = '../index.html'
             
        # Desktop Active
        current_nav = current_nav.replace(f'href="{target_href}" class="nav-link text-secondary transition-colors', f'href="{target_href}" class="nav-link text-primary font-medium transition-colors border-b-2 border-primary')
        
        # Mobile Active
        # Find the link and replace its hover:text-primary with text-primary
        mobile_active_pattern = f'(href="{target_href}" class="mobile-menu-link[^"]*?)hover:text-primary'
        current_mobile = re.sub(mobile_active_pattern, r'\1text-primary', current_mobile)

        # 4. Inject
        new_content = re.sub(r'<nav id="navbar".*?</nav>', current_nav, content, flags=re.DOTALL)
        new_content = re.sub(r'<div id="mobile-menu".*?</div>', current_mobile, new_content, flags=re.DOTALL)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
            
    print("Standardization complete.")

if __name__ == '__main__':
    standardize_nav()
