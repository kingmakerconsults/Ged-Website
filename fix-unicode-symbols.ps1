# Fix Unicode corruption in LegacyRootApp.jsx
$filePath = "c:\Users\Zacha\Ged-Website\frontend\src\legacy\LegacyRootApp.jsx"

Write-Host "Reading file..."
$content = Get-Content $filePath -Raw -Encoding UTF8

Write-Host "Original file size: $($content.Length) characters"

# Count occurrences before
$diamondCount = ([regex]::Matches($content, '��')).Count
Write-Host "Found $diamondCount instances of �� symbols"

# Replace corrupted Unicode characters with proper ones
$replacements = @{
    # Mathematical superscripts
    'ax�' = 'ax²'
    'a�' = 'a²'
    'b�' = 'b²'
    'c�' = 'c²'
    'cm�' = 'cm³'
    'g/cm�' = 'g/cm³'
    
    # Mathematical operators
    'a ��' = 'a ≠'
    ' �� ' = ' ≠ '
    ' �� ' = ' – '  # en-dash
    '����' = '—'    # em-dash
    'PP, Pp, Pp, pp ��' = 'PP, Pp, Pp, pp →'
    
    # Temperature/degree symbols
    '�C' = '°C'
    '36�30��' = "36°30'"
    
    # Chemical formulas
    'H��O' = 'H₂O'
    
    # Punctuation - smart quotes / apostrophes (these are actually RIGHT SINGLE QUOTATION MARK U+2019)
    'rock��s' = "rock's"
    'car��s' = "car's"
    'runner��s' = "runner's"
    'That��s' = "That's"
    
    # Em-dashes in prose
    'freedom��the' = 'freedom—the'
    'frontier��a' = 'frontier—a'
    'wilderness'��had' = 'wilderness'—had'
    'ions��charged' = 'ions—charged'
    'sterling��something' = 'sterling—something'
    'wood, and I��' = 'wood, and I—'
    'intermittency��it' = 'intermittency—it'
    'slide'��the' = 'slide'—the'
    'review��ensuring' = 'review—ensuring'
    'certiorari��an' = 'certiorari—an'
    'powers��powers' = 'powers—powers'
    'fuels��coal' = 'fuels—coal'
    
    # Bullet points / separators
    ' �� ' = ' • '
    
    # Ellipsis
    'topic��' = 'topic…'
    ".trim() + '��'" = ".trim() + '…'"
    
    # Backslash (for code patterns)
    "base.startsWith('��')" = "base.startsWith('\\')"
    
    # Dividers array
    "[':', '��', '��', '-', '|']" = "[':', '–', '—', '-', '|']"
    
    # Comments/ranges
    '0��4' = '0–4'
    '5��11' = '5–11'
    'A��Z' = 'A–Z'
    
    # Console message
    'not found �� using' = 'not found – using'
    
    # Emoji/decorative (remove)
    ' ��️' = ''
    '��️' = ''
}

Write-Host "`nApplying replacements..."
foreach ($find in $replacements.Keys) {
    $replace = $replacements[$find]
    $before = $content.Length
    $content = $content.Replace($find, $replace)
    $after = $content.Length
    if ($before -ne $after) {
        Write-Host "  Replaced: '$find' -> '$replace'"
    }
}

# Now handle remaining standalone diamond symbols with context-aware replacements
# These need to be done carefully to avoid breaking code

Write-Host "`nWriting fixed content back to file..."
Set-Content $filePath -Value $content -Encoding UTF8 -NoNewline

Write-Host "`nDone! File has been updated."
Write-Host "New file size: $($content.Length) characters"

# Count remaining diamonds
$remainingDiamonds = ([regex]::Matches($content, '��')).Count
Write-Host "Remaining �� symbols: $remainingDiamonds"
