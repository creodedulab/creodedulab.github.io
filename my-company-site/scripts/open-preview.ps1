param(
  [int]$Port = 4173,
  [string]$Path = "/contents/",
  [switch]$SkipBuild,
  [switch]$NoOpen
)

$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$logDir = Join-Path $root ".preview"
$outLog = Join-Path $logDir "preview.out.log"
$errLog = Join-Path $logDir "preview.err.log"
$url = "http://127.0.0.1:$Port$Path"

function Test-PreviewPort {
  param([int]$PortToCheck)

  $connection = Get-NetTCPConnection -LocalPort $PortToCheck -State Listen -ErrorAction SilentlyContinue |
    Select-Object -First 1

  return $null -ne $connection
}

function Wait-PreviewReady {
  param(
    [string]$HealthUrl,
    [int]$TimeoutSeconds = 30
  )

  $deadline = (Get-Date).AddSeconds($TimeoutSeconds)

  while ((Get-Date) -lt $deadline) {
    try {
      $response = Invoke-WebRequest -Uri $HealthUrl -UseBasicParsing -TimeoutSec 2
      if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
        return $true
      }
    } catch {
      Start-Sleep -Milliseconds 500
    }
  }

  return $false
}

Set-Location $root
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

if (-not $SkipBuild) {
  npm.cmd run build

  if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Preview was not opened."
    exit $LASTEXITCODE
  }
}

if (-not (Test-PreviewPort -PortToCheck $Port)) {
  $node = (Get-Command node.exe).Source
  $previewScript = Join-Path $root "preview-static.js"

  $env:PREVIEW_PORT = "$Port"
  Start-Process -FilePath $node `
    -ArgumentList "`"$previewScript`"" `
    -WorkingDirectory $root `
    -RedirectStandardOutput $outLog `
    -RedirectStandardError $errLog `
    -WindowStyle Hidden | Out-Null
}

if (-not (Wait-PreviewReady -HealthUrl $url)) {
  Write-Host "Preview server did not become ready."
  Write-Host "stdout: $outLog"
  Write-Host "stderr: $errLog"
  exit 1
}

if (-not $NoOpen) {
  Start-Process $url | Out-Null
  Write-Host "Preview opened: $url"
} else {
  Write-Host "Preview ready: $url"
}
