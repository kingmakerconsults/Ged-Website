Write-Host "`n=== Testing Vocabulary Endpoint ===" -ForegroundColor Green
Write-Host "Waiting for server..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3002/api/vocabulary/all" -Method Get -ErrorAction Stop
    
    Write-Host "`n SUCCESS! Full vocabulary database retrieved" -ForegroundColor Green
    Write-Host "`nWord counts by subject:" -ForegroundColor Cyan
    
    $response.PSObject.Properties | ForEach-Object {
        Write-Host "  $($_.Name): $($_.Value.Count) words" -ForegroundColor White
    }
    
    Write-Host "`n Sample words from each subject:" -ForegroundColor Cyan
    $response.PSObject.Properties | ForEach-Object {
        $subj = $_.Name
        $firstWord = $_.Value[0]
        if ($firstWord) {
            Write-Host "  $subj - First word: $($firstWord.term)" -ForegroundColor Gray
        }
    }
    
} catch {
    Write-Host "`n ERROR: Could not connect to vocabulary endpoint" -ForegroundColor Red
    Write-Host "  Make sure the backend server is running on port 3002" -ForegroundColor Yellow
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
