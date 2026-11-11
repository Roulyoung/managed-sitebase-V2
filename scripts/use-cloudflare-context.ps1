param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("zone", "pages", "shared-worker")]
  [string]$Context,

  [string]$SiteKey = ""
)

function Get-RequiredEnvValue {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Name
  )

  $value = [System.Environment]::GetEnvironmentVariable($Name, "User")
  if ([string]::IsNullOrWhiteSpace($value)) {
    throw "Required user environment variable not found: $Name"
  }
  return $value
}

$normalizedSiteKey = ($SiteKey -replace "[^A-Za-z0-9]", "_").ToUpperInvariant()

switch ($Context) {
  "zone" {
    if ([string]::IsNullOrWhiteSpace($normalizedSiteKey)) {
      throw "SiteKey is required for zone context"
    }
    $env:CLOUDFLARE_API_TOKEN = Get-RequiredEnvValue -Name "CF_TOKEN_ZONE_$normalizedSiteKey"
    Remove-Item Env:CLOUDFLARE_ACCOUNT_ID -ErrorAction SilentlyContinue
  }
  "pages" {
    if ([string]::IsNullOrWhiteSpace($normalizedSiteKey)) {
      throw "SiteKey is required for pages context"
    }
    $env:CLOUDFLARE_API_TOKEN = Get-RequiredEnvValue -Name "CF_TOKEN_PAGES_$normalizedSiteKey"
    Remove-Item Env:CLOUDFLARE_ACCOUNT_ID -ErrorAction SilentlyContinue
  }
  "shared-worker" {
    $env:CLOUDFLARE_API_TOKEN = Get-RequiredEnvValue -Name "CF_TOKEN_SHARED_WORKER"
    $env:CLOUDFLARE_ACCOUNT_ID = Get-RequiredEnvValue -Name "CF_ACCOUNT_ID_SHARED_WORKER"
  }
}

Write-Host "Active Cloudflare context: $Context"
if ($normalizedSiteKey) {
  Write-Host "Site key: $normalizedSiteKey"
}
if ($env:CLOUDFLARE_ACCOUNT_ID) {
  Write-Host "Account ID: $($env:CLOUDFLARE_ACCOUNT_ID)"
}

Write-Host ""
Write-Host "Next step:"
Write-Host "npx wrangler whoami"
