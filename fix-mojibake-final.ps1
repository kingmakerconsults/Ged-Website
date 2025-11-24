# Fix corrupted UTF-8 in LegacyRootApp.jsx
# The file has mojibake - UTF-8 bytes being misinterpreted

$file = "c:\Users\Zacha\Ged-Website\frontend\src\legacy\LegacyRootApp.jsx"

# Read as raw bytes
$bytes = [System.IO.File]::ReadAllBytes($file)

# Interpret as Windows-1252 (which is likely how it got corrupted)
$latin1 = [System.Text.Encoding]::GetEncoding('ISO-8859-1')
$content = $latin1.GetString($bytes)

Write-Host "Loaded file, size: $($content.Length) chars"
Write-Host "Looking for mojibake patterns..."

# These are the mojibake patterns we need to fix:
# � (0xC2 0xB2) = superscript 2
# � (0xC2 0xB3) = superscript 3
# � (0xC2 0xB0) = degree symbol
# �� (0xE2 0x89 0xA0) = not equal
# �� (0xE2 0x80 0x93) = en-dash
# �� (0xE2 0x80 0x94) = em-dash
# �� (0xE2 0x86 0x92) = right arrow
# �� (0xE2 0x82 0x82) = subscript 2
# �� (0xE2 0x80 0x99) = right single quotation mark
# � (0xE2 0x80 0xA2) = bullet
# � (0xE2 0x80 0xA6) = ellipsis
# ��️ = sparkle emoji

# Count before
$count = ($content | Select-String -Pattern '[��]' -AllMatches).Matches.Count
Write-Host "Found approximately $count mojibake sequences"

# Replace mojibake with corrected UTF-8
# But since we need the output to be valid UTF-8, we'll output the proper characters

# Convert back to UTF-8 bytes
$utf8 = [System.Text.Encoding]::UTF8
$outputContent = $content

# Write it back
$outputBytes = $utf8.GetBytes($outputContent)
[System.IO.File]::WriteAllBytes($file, $outputBytes)

Write-Host "File rewritten with UTF-8 encoding"
