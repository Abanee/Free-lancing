import os
import glob
import re

files = glob.glob('pages/*.html') + ['index.html']

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Track if we made changes
    original = content
    
    # 1. Fix odd bg colors using bg-[var(--color-primary)] for large banners/blocks
    # Replace it with bg-[#12343b] which is dark teal and stays dark.
    # Exclude text-[var(--color-primary)] which shouldn't change.
    
    content = content.replace('bg-[var(--color-primary)]', 'bg-[#12343b]')
    
    # Also fix the weird glass-card-premium in dashboard-payment
    content = content.replace('glass-card-premium', 'bg-white/85')
    
    # Also in dashboard-payment saved cards, the gradient is from-[var(--color-primary)]
    # which is bright teal now. Let's make it from-[#12343b] 
    content = content.replace('from-[var(--color-primary)]', 'from-[#12343b]')

    # 2. Fix Navbar wrapping
    # The navbar ul is typically: <ul class="flex items-center gap-6 text-sm font-medium">
    # Let's replace gap-6 with gap-2 lg:gap-4 xl:gap-6.
    content = content.replace('gap-6 text-sm font-medium', 'gap-2 lg:gap-4 xl:gap-6 text-[13px] xl:text-sm font-medium')
    
    # 3. Logo might be too big, taking up space
    # "h-12 sm:h-16 w-auto" -> "h-10 sm:h-12 w-auto" ?
    # Let's gently reduce the logo size in the navbar
    content = content.replace('h-12 sm:h-16 w-auto object-contain', 'h-10 sm:h-12 xl:h-14 w-auto object-contain')
    
    # Also "whitespace-nowrap" on the Tools or Techs link might be forcing an overflow.
    # The user specifically mentioned "while in adjusting the tools or tech is going to next line fix it"
    # Actually, if I just reduce the gaps and font size slightly it should fit.

    if content != original:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated {f}")

print("Done fixing UI.")
