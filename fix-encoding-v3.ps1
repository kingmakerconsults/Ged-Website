# Fix mojibake in app.jsx - Simple and direct
$ErrorActionPreference = 'Stop'

$filePath = "c:\Users\Zacha\Ged-Website\frontend\app.jsx"

Write-Host "Reading file..." -ForegroundColor Cyan
$content = Get-Content -Path $filePath -Raw

Write-Host "Applying fixes..." -ForegroundColor Cyan

$totalChanges = 0

# Fix all instances - using actual character patterns
$patterns = @(
    @{ Find = 'a²'; Replace = 'a²' },
    @{ Find = 'b²'; Replace = 'b²' },
    @{ Find = 'c²'; Replace = 'c²' },
    @{ Find = 'cm³'; Replace = 'cm³' },
    @{ Find = 'm/s²'; Replace = 'm/s²' },
    @{ Find = '—'; Replace = '—' },
    @{ Find = ''s'; Replace = "'s" },
    @{ Find = ''t'; Replace = "'t" },
    @{ Find = ''re'; Replace = "'re" },
    @{ Find = ''ll'; Replace = "'ll" },
    @{ Find = ''ve'; Replace = "'ve" },
    @{ Find = ''m'; Replace = "'m" },
    @{ Find = '°F'; Replace = '°F' },
    @{ Find = '°C'; Replace = '°C' },
    @{ Find = 'Copyright ©'; Replace = 'Copyright ©' },
    @{ Find = ' • '; Replace = ' • ' },
    @{ Find = 'I—'; Replace = 'I—' },
    @{ Find = '…'; Replace = '…' }
)

foreach ($pattern in $patterns) {
    $before = $content
    $content = $content -replace [regex]::Escape($pattern.Find), $pattern.Replace
    if ($content -ne $before) {
        $count = ([regex]::Matches($before, [regex]::Escape($pattern.Find))).Count
        if ($count -gt 0) {
            Write-Host "  Fixed: $($pattern.Find) -> $($pattern.Replace) ($count instances)" -ForegroundColor Yellow
            $totalChanges += $count
        }
    }
}

if ($totalChanges -eq 0) {
    Write-Host "No changes needed - file is already correct!" -ForegroundColor Green
} else {
    Write-Host "`nWriting corrected file..." -ForegroundColor Cyan
    $content | Set-Content -Path $filePath -NoNewline -Encoding UTF8
    Write-Host "Done! Fixed $totalChanges instances." -ForegroundColor Green
}
