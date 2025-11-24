# Fix mojibake in LegacyRootApp.jsx
$ErrorActionPreference = 'Stop'

$file = "c:\Users\Zacha\Ged-Website\frontend\src\legacy\LegacyRootApp.jsx"

Write-Host "Reading file..." -ForegroundColor Cyan  
$content = Get-Content $file -Raw -Encoding UTF8

$fffd = [char]0xFFFD
$count = ($content.ToCharArray() | Where-Object { $_ -eq $fffd }).Count
Write-Host "Found $count replacement characters (U+FFFD)" -ForegroundColor Yellow

if ($count -eq 0) {
    Write-Host "No U+FFFD characters found. Checking for other mojibake patterns..." -ForegroundColor Yellow
    
    # Look for common mojibake byte sequences that render as multiple characters
    $patterns = @(
        @{Pattern = '∩┐╜'; Name = 'Superscript/Subscript mojibake'},
        @{Pattern = '�'; Name = 'Diamond question mark'}
    )
    
    foreach ($p in $patterns) {
        $matches = ([regex]::Matches($content, [regex]::Escape($p.Pattern))).Count
        if ($matches -gt 0) {
            Write-Host "  Found $matches instances of $($p.Name): $($p.Pattern)" -ForegroundColor Gray
        }
    }
}

Write-Host "`nApplying fixes..." -ForegroundColor Cyan

# Mathematical superscripts
$content = $content -replace 'ax([��∩┐╜' + $fffd + '])', 'ax²'
$content = $content -replace '([abc])([��∩┐╜' + $fffd + ']) \+', '$1² +'  
$content = $content -replace '= c([��∩┐╜' + $fffd + '])\.', '= c².'

# Cubic centimeters  
$content = $content -replace 'cm([��∩┐╜' + $fffd + '])', 'cm³'
$content = $content -replace 'g/cm([��∩┐╜' + $fffd + '])', 'g/cm³'

# Degree symbols
$content = $content -replace '([��∩┐╜' + $fffd + '])C', '°C'
$content = $content -replace "36([��∩┐╜' + $fffd + '])30([��∩┐╜' + $fffd + '])([��∩┐╜' + $fffd + '])", "36°30'"

# Not equal sign
$content = $content -replace '([��∩┐╜' + $fffd + '])([��∩┐╜' + $fffd + ']) 0', '≠ 0'
$content = $content -replace 'wrong ([��∩┐╜' + $fffd + '])([��∩┐╜' + $fffd + '])', 'wrong –'
$content = $content -replace 'not max ([��∩┐╜' + $fffd + '])([��∩┐╜' + $fffd + '])', 'not max –'

# En-dash and em-dash
$content = $content -replace '([��∩┐╜' + $fffd + '])([��∩┐╜' + $fffd + '])(\d)', '–$3'  # range dash
$content = $content -replace '([��∩┐╜' + $fffd + '])([��∩┐╜' + $fffd + '])([��∩┐╜' + $fffd + '])([��∩┐╜' + $fffd + '])', '—'  # em-dash

# H2O subscript
$content = $content -replace 'H([��∩┐╜' + $fffd + '])([��∩┐╜' + $fffd + '])O', 'H₂O'

# Right arrow
$content = $content -replace 'pp ([��∩┐╜' + $fffd + '])([��∩┐╜' + $fffd + '])', 'pp →'

# Bullet/separator
$content = $content -replace ' ([��∩┐╜' + $fffd + '])([��∩┐╜' + $fffd + ']) ', ' • '

# Ellipsis
$content = $content -replace 'topic([��∩┐╜' + $fffd + '])([��∩┐╜' + $fffd + '])', 'topic…'

# Sparkle emoji (just remove it)
$content = $content -replace ' ([��∩┐╜' + $fffd + '])([��∩┐╜' + $fffd + '])️', ''

# Smart quotes/apostrophes - these are trickier, need to handle carefully  
# Only replace when NOT inside single-quoted strings
$content = $content -replace "([a-z])([��∩┐╜' + $fffd + '])([��∩┐╜' + $fffd + '])s\b", "`$1's"

Write-Host "Saving..." -ForegroundColor Cyan
$utf8NoBom = [System.Text.UTF8Encoding]::new($false)
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)

$newCount = ($content.ToCharArray() | Where-Object { $_ -eq $fffd }).Count
Write-Host "Done! Reduced from $count to $newCount replacement characters." -ForegroundColor Green
