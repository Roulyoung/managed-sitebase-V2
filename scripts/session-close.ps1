param([string]$Note = "")

$ErrorActionPreference = "Stop"
Write-Host "Run SESSION_CLOSE.md and record the rollback target before finalizing."
Write-Host "Project: managed-sitebase-V2"
if (-not [string]::IsNullOrWhiteSpace($Note)) { Write-Host "Note: $Note" }
