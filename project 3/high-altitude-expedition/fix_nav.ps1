$files = Get-ChildItem -Path '.' -Recurse -Filter *.html
foreach ($file in $files) {
    if ($file.Name -match "login|signup") { continue }
    
    $content = Get-Content $file.FullName -Raw
    
    # 1. Change the outer div
    $content = $content -replace '<div class="hidden md:flex items-center gap-3">', '<div class="flex items-center gap-1 sm:gap-3">'
    
    # 2. Wrap login/signup
    $content = $content -replace '(<a href="[^"]*login.html"[^>]*>Login</a>\s*<a href="[^"]*signup.html"[^>]*>Sign Up</a>)', '<div class="hidden md:flex gap-3">$1</div>'
    
    # 3. Move the closing </div>
    $content = $content -replace '</div>(\s*<button id="hamburger"[\s\S]*?</button>)', '$1`n        </div>'
    
    Set-Content -Path $file.FullName -Value $content
}
