# Fix mojibake in app.jsx - Enhanced version
$ErrorActionPreference = 'Stop'

$filePath = "c:\Users\Zacha\Ged-Website\frontend\app.jsx"

Write-Host "Reading file with UTF-8 encoding..." -ForegroundColor Cyan
$bytes = [System.IO.File]::ReadAllBytes($filePath)
$content = [System.Text.Encoding]::UTF8.GetString($bytes)

Write-Host "Original file size: $($content.Length) characters" -ForegroundColor Gray

# Define replacements (searching for actual problem characters)
$replacements = @{
    # Superscript 2 (for squared)
    [char]0xFFFD + '' = '²'  # replacement character
    'a�' = 'a²'
    'b�' = 'b²'  
    'c�' = 'c²'
    'cm�' = 'cm³'
    'm/s�' = 'm/s²'
    
    # Em dash
    '��' = '—'
    
    # Apostrophe  
    '�s' = "'s"
    '�t' = "'t"
    '�re' = "'re"
    '�ll' = "'ll"
    '�ve' = "'ve"
    '�m' = "'m"
    
    # Degree symbol
    '�F' = '°F'
    '�C' = '°C'
    '30�' = "30°"
    '36�' = "36°"
    
    # Copyright
    'Copyright �' = 'Copyright ©'
    
    # Bullet
    ' � ' = ' • '
    
    # Ellipsis
    'I�' = 'I—'
}

$totalReplacements = 0

foreach ($key in $replacements.Keys) {
    $before = $content
    $content = $content.Replace($key, $replacements[$key])
    $count = ($before.Length - $content.Length + $replacements[$key].Length - $key.Length) / ($key.Length - $replacements[$key].Length + 1)
    if ($content -ne $before) {
        $matches = ([regex]::Matches($before, [regex]::Escape($key))).Count
        Write-Host "  Replaced '$key' -> '$($replacements[$key])' : $matches times" -ForegroundColor Yellow
        $totalReplacements += $matches
    }
}

Write-Host "`nWriting corrected file..." -ForegroundColor Cyan
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)

Write-Host "Done! Made $totalReplacements total replacements." -ForegroundColor Green
Write-Host "New file size: $($content.Length) characters" -ForegroundColor Gray
