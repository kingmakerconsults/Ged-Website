# Comprehensive mojibake fix for app.jsx
$file = "c:\Users\Zacha\Ged-Website\frontend\app.jsx"

Write-Host "Reading app.jsx..." -ForegroundColor Cyan
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

Write-Host "Fixing all mojibake characters..." -ForegroundColor Yellow

# Common replacements
$replacements = @{
    '€¢' = '•'      # bullet point
    '€"' = '—'      # em dash
    '€™' = "'"      # right single quotation mark (apostrophe)
    '€²' = '′'      # prime (or use ′ for proper prime symbol)
    '‰ˆ' = '≈'      # approximately equal to
    'â€¢' = '•'     # alternate encoding of bullet
    'â€"' = '—'     # alternate encoding of em dash
    'â€™' = "'"     # alternate encoding of apostrophe
    'â€"' = '–'     # en dash
    'â‰ˆ' = '≈'     # alternate encoding of approx equal
}

foreach ($old in $replacements.Keys) {
    $new = $replacements[$old]
    $count = ([regex]::Matches($content, [regex]::Escape($old))).Count
    if ($count -gt 0) {
        Write-Host "  Replacing '$old' → '$new' ($count occurrences)" -ForegroundColor Gray
        $content = $content.Replace($old, $new)
    }
}

Write-Host "Saving as UTF-8 without BOM..." -ForegroundColor Yellow
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)

Write-Host "`n✓ Complete! All mojibake characters fixed." -ForegroundColor Green
Write-Host "  File saved as UTF-8 without BOM" -ForegroundColor Green
