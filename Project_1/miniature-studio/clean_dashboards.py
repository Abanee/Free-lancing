import os
import re

directory = r"c:\Users\abane\Music\Free_lancing\Free-lancing\Project_1\miniature-studio\pages"
dashboard_files = ["dashboard.html", "dashboard-orders.html", "dashboard-cart.html", "dashboard-profile.html", "dashboard-payment.html"]

for f in dashboard_files:
    file_path = os.path.join(directory, f)
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()

    # The footer starts with <!-- Custom Visual Footer: Ride The Wind --> or <!-- Custom Footer -->
    # and ends with </footer>

    # Search and remove footer block
    # This regex looks for <!-- Custom Footer or Visual Footer and removes everything up through </footer>
    content = re.sub(r'<!--\s*Custom\s+(Visual\s+)?Footer.*?</form>.*?</footer>', '', content, flags=re.DOTALL)
    content = re.sub(r'<!--\s*Custom\s+(Visual\s+)?Footer.*?</footer>', '', content, flags=re.DOTALL)

    # Replace the text MS in the sidebar with the logo 
    # Current code: <a href="index.html" class="font-display text-4xl text-[var(--color-primary)]">MS</a>
    logo_replacement = r'''<a href="index.html" class="flex flex-col items-center justify-center gap-2 group text-decoration-none">
                <img src="../assets/images/logo.png" alt="Miniature Studio Logo" class="h-12 w-auto object-contain drop-shadow-[0_0_6px_rgba(252,211,77,0.9)] group-hover:drop-shadow-[0_0_15px_rgba(252,211,77,1)] transition-all duration-300">
                <span class="font-display text-xl text-[var(--color-primary)] leading-none">Miniature Studio</span>
            </a>'''
            
    content = re.sub(r'<a href="index\.html" class="font-display text-4xl text-\[var\(--color-primary\)]">MS</a>', logo_replacement, content)

    # Some of the old dashboard files might not have been fully clean, so let's also ensure no public header 
    # <header class="sticky top-0 z-50 ..."> (if the 20fab7b somehow had them, though it shouldn't)
    content = re.sub(r'<header class="sticky top-0 z-50.*?</header>', '', content, flags=re.DOTALL)

    with open(file_path, "w", encoding="utf-8") as file:
        file.write(content)
    print(f"Cleaned {f}")
