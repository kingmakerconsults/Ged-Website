# Fix mojibake encoding issues in app.jsx
# This script replaces common mojibake sequences with correct Unicode characters

$filePath = "c:\Users\Zacha\Ged-Website\frontend\app.jsx"

Write-Host "Reading file..." -ForegroundColor Cyan
$content = Get-Content -Path $filePath -Raw -Encoding UTF8

Write-Host "Fixing encoding issues..." -ForegroundColor Cyan

# Count replacements
$replacementCount = 0

# Fix superscript 2 (squared)
$before = $content
$content = $content -replace '�(?=\s|[^0-9a-zA-Z]|$)', '²'
if ($content -ne $before) { $replacementCount += ([regex]::Matches($before, '�(?=\s|[^0-9a-zA-Z]|$)')).Count; $before = $content }

# Fix superscript 3 (cubed)  
$content = $content -replace '�(?=\s|[^0-9a-zA-Z]|$)', '³'
if ($content -ne $before) { $replacementCount += ([regex]::Matches($before, '�(?=\s|[^0-9a-zA-Z]|$)')).Count; $before = $content }

# Fix em dash (common double-character mojibake)
$content = $content -replace '��', '—'
if ($content -ne $before) { $replacementCount += ([regex]::Matches($before, '��')).Count; $before = $content }

# Fix apostrophe/single quote
$content = $content -replace '�(?=[a-zA-Z])', "'"
if ($content -ne $before) { $replacementCount += ([regex]::Matches($before, '�(?=[a-zA-Z])')).Count; $before = $content }

# Fix copyright symbol
$content = $content -replace '�(?=\s|</)', '©'
if ($content -ne $before) { $replacementCount += ([regex]::Matches($before, '�(?=\s|</)')).Count; $before = $content }

# Fix ellipsis
$content = $content -replace '�(?=\s|</|$)', '…'
if ($content -ne $before) { $replacementCount += ([regex]::Matches($before, '�(?=\s|</|$)')).Count; $before = $content }

# Fix degree symbol (for temperature)
$content = $content -replace '�(?=[CF])', '°'
if ($content -ne $before) { $replacementCount += ([regex]::Matches($before, '�(?=[CF])')).Count; $before = $content }

# Fix bullet points
$content = $content -replace '�(?=\s)', '•'
if ($content -ne $before) { $replacementCount += ([regex]::Matches($before, '�(?=\s)')).Count; $before = $content }

# Fix any remaining standalone � that might be degree symbols in other contexts
$content = $content -replace '(?<=\d)�(?=\s|''|"|<)', '°'
if ($content -ne $before) { $replacementCount += ([regex]::Matches($before, '(?<=\d)�(?=\s|''|"|<)')).Count; $before = $content }

Write-Host "Writing fixed content..." -ForegroundColor Cyan
$content | Set-Content -Path $filePath -Encoding UTF8 -NoNewline

Write-Host "Done! Fixed $replacementCount encoding issues." -ForegroundColor Green
Write-Host "File: $filePath" -ForegroundColor Gray
