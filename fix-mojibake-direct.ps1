# Fix mojibake in app.jsx - Direct hex code approach
$ErrorActionPreference = 'Stop'

$file = "c:\Users\Zacha\Ged-Website\frontend\app.jsx"

Write-Host "Reading file..." -ForegroundColor Cyan
$bytes = [System.IO.File]::ReadAllBytes($file)
$content = [System.Text.Encoding]::UTF8.GetString($bytes)

Write-Host "Applying context-aware fixes..." -ForegroundColor Yellow

# U+FFFD is the replacement character - we need to replace it context-appropriately
$fffd = [char]0xFFFD
$count = ($content.ToCharArray() | Where-Object { $_ -eq $fffd }).Count
Write-Host "  Found $count replacement characters (U+FFFD)" -ForegroundColor Gray

# Replace based on context
# Superscript 2 for math formulas (a� + b� = c�)
$content = $content -replace '([abc])' + [regex]::Escape($fffd), '$1²'

# Superscript 3 for cubic units (cm�)
$content = $content -replace 'cm' + [regex]::Escape($fffd), 'cm³'

# Superscript 2 for squared units (m/s�)
$content = $content -replace '(m/s|m)' + [regex]::Escape($fffd), '$1²'

# Degree symbol for temperatures (�F, �C)
$content = $content -replace '(\d)' + [regex]::Escape($fffd) + '([FC])', '$1°$2'
$content = $content -replace '(\d\d)' + [regex]::Escape($fffd) + "(\d\d')", '$1°$2'

# Apostrophes in contractions
$content = $content -replace ([regex]::Escape($fffd)) + '([st])', "'`$1"

# Em dash
$content = $content -replace ([regex]::Escape($fffd)) + ([regex]::Escape($fffd)), '—'

# Copyright symbol
$content = $content -replace 'Copyright ' + [regex]::Escape($fffd), 'Copyright ©'

# Any remaining � might be bullets or other symbols - default to middle dot
# (Can refine later if needed)

$remainingCount = ($content.ToCharArray() | Where-Object { $_ -eq $fffd }).Count
Write-Host "  $remainingCount replacement characters remain (context-specific)" -ForegroundColor Gray

Write-Host "Saving as UTF-8 without BOM..." -ForegroundColor Yellow
$utf8NoBom = [System.Text.UTF8Encoding]::new($false)
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)

Write-Host "Done! Fixed $($count - $remainingCount) characters." -ForegroundColor Green
