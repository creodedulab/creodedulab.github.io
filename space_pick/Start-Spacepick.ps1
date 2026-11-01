param([switch]$NoBrowser)
$ErrorActionPreference = 'Stop'
$spacepickUrl = 'http://127.0.0.1:8947/'
$spacepickReady = $false
try {
    $spacepickHealth = Invoke-RestMethod -Uri ($spacepickUrl + '_spacepick_health') -TimeoutSec 2
    if ($spacepickHealth.app -ne 'spacepick' -or $spacepickHealth.root -ne $PSScriptRoot) { throw 'This port belongs to another application.' }
    $spacepickReady = $true
} catch {}
if (-not $spacepickReady) {
    $spacepickNode = (Get-Command node -ErrorAction Stop).Source
    $spacepickServer = Join-Path $PSScriptRoot 'serve.cjs'
    Start-Process -FilePath $spacepickNode -ArgumentList @('"' + $spacepickServer + '"') -WorkingDirectory $PSScriptRoot -WindowStyle Hidden
    for ($spacepickAttempt = 0; $spacepickAttempt -lt 30; $spacepickAttempt++) {
        Start-Sleep -Milliseconds 150
        try {
            $spacepickHealth = Invoke-RestMethod -Uri ($spacepickUrl + '_spacepick_health') -TimeoutSec 1
            if ($spacepickHealth.app -eq 'spacepick' -and $spacepickHealth.root -eq $PSScriptRoot) { $spacepickReady = $true; break }
        } catch {}
    }
}
if (-not $spacepickReady) { throw 'SPACEPICK local server could not start.' }
if (-not $NoBrowser) {
    $spacepickBrowsers = @(
        'C:\Program Files\Google\Chrome\Application\chrome.exe',
        'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe',
        'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
        'C:\Program Files\Microsoft\Edge\Application\msedge.exe'
    )
    $spacepickBrowser = $spacepickBrowsers | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
    if (-not $spacepickBrowser) { throw 'SPACEPICK requires Chrome or Edge.' }
    $spacepickProfile = Join-Path $PSScriptRoot '.spacepick-browser'
    $spacepickArguments = @(
        ('--user-data-dir="' + $spacepickProfile + '"'),
        '--autoplay-policy=no-user-gesture-required',
        '--no-first-run',
        '--no-default-browser-check',
        ('--app=' + $spacepickUrl)
    )
    Start-Process -FilePath $spacepickBrowser -ArgumentList $spacepickArguments -WindowStyle Normal
}
Write-Output $spacepickUrl
