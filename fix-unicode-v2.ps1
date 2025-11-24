# Fix Unicode corruption using byte patterns
$filePath = "c:\Users\Zacha\Ged-Website\frontend\src\legacy\LegacyRootApp.jsx"

Write-Host "Reading file as UTF-8..."
$bytes = [System.IO.File]::ReadAllBytes($filePath)
$content = [System.Text.Encoding]::UTF8.GetString($bytes)

Write-Host "File size: $($content.Length) characters"

# Use Unicode escape sequences to avoid corruption
$content = $content -replace 'ax\u00B2', 'ax²'  # superscript 2
$content = $content -replace 'a\u00B2', 'a²'
$content = $content -replace 'b\u00B2', 'b²'
$content = $content -replace 'c\u00B2', 'c²'
$content = $content -replace 'cm\u00B3', 'cm³'  # superscript 3
$content = $content -replace 'g/cm\u00B3', 'g/cm³'

# Math operators
$content = $content -replace '\u2260', '≠'  # not equal
$content = $content -replace '\u2013', '–'  # en-dash
$content = $content -replace '\u2014', '—'  # em-dash
$content = $content -replace '\u2192', '→'  # right arrow

# Degree symbol
$content = $content -replace '\u00B0C', '°C'
$content = $content -replace '36\u00B030\u2019', "36°30'"

# Chemical subscripts
$content = $content -replace 'H\u2082O', 'H₂O'

# Smart quotes to straight quotes (for code consistency)
$content = $content -replace '\u2019s', "'s"  # right single quote + s

# Bullet point
$content = $content -replace ' \u2022 ', ' • '

# Ellipsis
$content = $content -replace 'topic\u2026', 'topic…'
$content = $content -replace "\.trim\(\) \+ '\u2026'", ".trim() + '…'"

Write-Host "Writing back..."
$outBytes = [System.Text.Encoding]::UTF8.GetBytes($content)
[System.IO.File]::WriteAllBytes($filePath, $outBytes)

Write-Host "Done!"
