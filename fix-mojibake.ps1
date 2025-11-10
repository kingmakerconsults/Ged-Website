# Fix mojibake characters in app.jsx
$file = "c:\Users\Zacha\Ged-Website\frontend\app.jsx"

Write-Host "Reading app.jsx..." -ForegroundColor Yellow
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

Write-Host "Fixing mojibake characters..." -ForegroundColor Yellow
$content = $content.Replace('â€¢', '•')  # bullet
$content = $content.Replace('â€"', '–')  # en dash
$content = $content.Replace('â€"', '—')  # em dash  
$content = $content.Replace('â€™', "'")  # right single quote
$content = $content.Replace('â‰ˆ', '≈')  # approximately equal

Write-Host "Saving as UTF-8..." -ForegroundColor Yellow
[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)

Write-Host "✓ Done! Mojibake fixed and saved as UTF-8" -ForegroundColor Green
