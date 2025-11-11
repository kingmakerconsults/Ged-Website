$file = "c:\Users\Zacha\Ged-Website\frontend\app.jsx"
$content = Get-Content $file -Raw -Encoding UTF8

# Fix the remaining characters
$content = $content -replace 'ðŸ"', '📝'
$content = $content -replace '–¼', '▼'
$content = $content -replace '–¶', '▶'

# Save as UTF-8 without BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)

Write-Host "✓ Fixed remaining characters:" -ForegroundColor Green
Write-Host "  ðŸ" → 📝" -ForegroundColor Gray
Write-Host "  –¼ → ▼" -ForegroundColor Gray
Write-Host "  –¶ → ▶" -ForegroundColor Gray
