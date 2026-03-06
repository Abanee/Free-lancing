$files = Get-ChildItem -Path '.' -Recurse -Filter *.html
foreach ($file in $files) {
    # Skip pages we already fixed manually or that don't need it
    if ($file.FullName -match "index\.html|contact\.html|login\.html|signup\.html") { continue }
    
    $content = Get-Content $file.FullName -Raw
    
    # Remove stray `n and closing div issue
    $content = $content -replace '</button>`n        </div>', '</button>'
    
    # Fix the hidden md:flex buttons inside mobile menu (remove redundancy)
    $content = $content -replace '(?s)<div class="flex gap-3 pt-2">.*?<div class="hidden md:flex gap-3"><a href="login\.html" class="btn-outline-dark text-sm px-4 py-2">Login</a>\s*<a href="signup\.html" class="btn-primary text-sm px-4 py-2">Sign Up</a></div>\s*</div>', '<div class="flex gap-3 pt-2 md:hidden"><a href="login.html" class="btn-outline-dark text-sm px-4 py-2">Login</a><a href="signup.html" class="btn-primary text-sm px-4 py-2">Sign Up</a></div>'
    
    # Also handle index relative paths if any
    $content = $content -replace '(?s)<div class="flex gap-3 pt-2">.*?<div class="hidden md:flex gap-3"><a href="pages/login\.html" class="btn-outline-dark text-sm px-4 py-2">Login</a>\s*<a href="pages/signup\.html" class="btn-primary text-sm px-4 py-2">Sign Up</a></div>\s*</div>', '<div class="flex gap-3 pt-2 md:hidden"><a href="pages/login.html" class="btn-outline-dark text-sm px-4 py-2">Login</a><a href="pages/signup.html" class="btn-primary text-sm px-4 py-2">Sign Up</a></div>'

    Set-Content -Path $file.FullName -Value $content
}
