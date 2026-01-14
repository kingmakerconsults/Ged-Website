#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Audit large files in the Git repository

.DESCRIPTION
    Scans all Git-tracked files and reports any over the specified size threshold.
    Helps prevent accidentally committing large files to the repository.

.PARAMETER ThresholdMB
    Size threshold in megabytes. Default is 50MB.

.EXAMPLE
    .\audit-large-files.ps1
    
.EXAMPLE
    .\audit-large-files.ps1 -ThresholdMB 10
#>

param(
    [int]$ThresholdMB = 50
)

Write-Host "🔍 Auditing Git-tracked files for large assets..." -ForegroundColor Cyan
Write-Host "Threshold: $ThresholdMB MB`n" -ForegroundColor Yellow

$largeFiles = @()
$totalSize = 0

git ls-files | ForEach-Object {
    $filePath = $_
    $fileInfo = Get-Item $filePath -ErrorAction SilentlyContinue
    
    if ($fileInfo) {
        $sizeMB = [math]::Round($fileInfo.Length / 1MB, 2)
        
        if ($sizeMB -gt $ThresholdMB) {
            $largeFiles += [PSCustomObject]@{
                Path = $filePath
                SizeMB = $sizeMB
            }
        }
        
        $totalSize += $fileInfo.Length
    }
}

if ($largeFiles.Count -eq 0) {
    Write-Host "✓ No files found over $ThresholdMB MB" -ForegroundColor Green
} else {
    Write-Host "⚠ Found $($largeFiles.Count) file(s) over $ThresholdMB MB:`n" -ForegroundColor Yellow
    
    $largeFiles | Sort-Object SizeMB -Descending | Format-Table -AutoSize
    
    Write-Host "`n⚠ WARNING: These files may cause issues with GitHub (limit: 100MB)" -ForegroundColor Red
    Write-Host "Consider:" -ForegroundColor Yellow
    Write-Host "  - Optimizing images (convert to JPG, reduce dimensions)"
    Write-Host "  - Moving to external storage (CDN, Git LFS)"
    Write-Host "  - Excluding from Git if they're build artifacts"
}

$totalSizeMB = [math]::Round($totalSize / 1MB, 2)
Write-Host "`n📊 Total size of tracked files: $totalSizeMB MB" -ForegroundColor Cyan

# Check .gitignore coverage
Write-Host "`n🔍 Checking .gitignore configuration..." -ForegroundColor Cyan

$gitignorePath = ".gitignore"
if (Test-Path $gitignorePath) {
    $gitignoreContent = Get-Content $gitignorePath -Raw
    
    $expectedPatterns = @(
        "dist/",
        "*.zip",
        "*.7z",
        "*.tar",
        "*.gz"
    )
    
    $missingPatterns = @()
    foreach ($pattern in $expectedPatterns) {
        if ($gitignoreContent -notmatch [regex]::Escape($pattern)) {
            $missingPatterns += $pattern
        }
    }
    
    if ($missingPatterns.Count -eq 0) {
        Write-Host "✓ .gitignore includes build outputs and archives" -ForegroundColor Green
    } else {
        Write-Host "⚠ .gitignore missing patterns:" -ForegroundColor Yellow
        $missingPatterns | ForEach-Object { Write-Host "  - $_" }
    }
} else {
    Write-Host "⚠ .gitignore file not found" -ForegroundColor Yellow
}

Write-Host "`n✓ Audit complete" -ForegroundColor Green
