$files = Get-ChildItem -Path '.' -Recurse -Filter *.html
foreach ($file in $files) {
    if ($file.Name -match "login|signup") { continue }
    
    $content = Get-Content $file.FullName -Raw
    
    # Remove the Preferences block entirely
    $content = $content -replace '(?s)<div class="flex items-center justify-between pb-2 border-b" style="border-color:var\(--border\)">\s*<span class="text-sm font-medium".*?</button>\s*</div>\s*</div>', ''
    
    Set-Content -Path $file.FullName -Value $content
}
