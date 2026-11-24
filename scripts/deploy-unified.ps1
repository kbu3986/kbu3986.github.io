param(
    [ValidateSet("all", "hub", "wattcheck", "worthmove", "puregram")]
    [string]$Site = "all",

    [string]$Owner = "kbu3986",

    [string]$RepoName = "kbu3986.github.io",

    [string]$PagesBranch = "main",

    [switch]$SkipBuild,

    [switch]$SkipInstall,

    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

$RootDir = Split-Path -Parent $PSScriptRoot
$DistDir = Join-Path $RootDir "dist"
$RemoteUrl = "https://github.com/$Owner/$RepoName.git"
$RootLiveUrl = "https://$Owner.github.io"

function Invoke-NativeQuiet {
    param([scriptblock]$Command)
    $oldEap = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    try {
        & $Command 2>&1 | Out-Null
        return $LASTEXITCODE
    } finally {
        $ErrorActionPreference = $oldEap
    }
}

function Invoke-NativeChecked {
    param(
        [scriptblock]$Command,
        [string]$ErrorMessage = "Native command failed"
    )
    $oldEap = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    try {
        $output = & $Command 2>&1
        $code = $LASTEXITCODE
        if ($output) {
            $output | Where-Object {
                $_ -notmatch 'LF will be replaced by CRLF' -and $_ -notmatch '^\s*create mode 100644 '
            } | ForEach-Object { Write-Host "  $_" }
        }
        if ($code -ne 0) {
            throw "$ErrorMessage (exit code $code)"
        }
    } finally {
        $ErrorActionPreference = $oldEap
    }
}

function Read-LocalEnvMap {
    param([string]$DirPath)
    $map = @{}
    foreach ($name in @(".env.production.local", ".env.local", ".env")) {
        $filePath = Join-Path $DirPath $name
        if (-not (Test-Path $filePath)) { continue }
        foreach ($raw in (Get-Content -Path $filePath -Encoding UTF8)) {
            $line = $raw.Trim()
            if (-not $line -or $line.StartsWith("#")) { continue }
            $idx = $line.IndexOf("=")
            if ($idx -lt 1) { continue }
            $k = $line.Substring(0, $idx).Trim()
            $v = $line.Substring($idx + 1).Trim().Trim('"').Trim("'")
            if (-not $map.ContainsKey($k) -and $v) {
                $map[$k] = $v
            }
        }
    }
    return $map
}

function Copy-TreeClean {
    param(
        [string]$Source,
        [string]$Destination,
        [string[]]$ExcludeDirs = @(".git")
    )
    New-Item -ItemType Directory -Force -Path $Destination | Out-Null
    $argsList = @($Source, $Destination, "/E", "/NFL", "/NDL", "/NJH", "/NJS", "/NC", "/NS", "/NP")
    if ($ExcludeDirs -and $ExcludeDirs.Count -gt 0) {
        $argsList += "/XD"
        $argsList += $ExcludeDirs
    }
    & robocopy @argsList | Out-Null
    if ($LASTEXITCODE -ge 8) {
        throw "robocopy failed copying '$Source' -> '$Destination' (exit code $LASTEXITCODE)"
    }
}

function Optimize-SubAppExport {
    param(
        [string]$SitePath,
        [string]$SubPath,
        [hashtable]$EnvMap
    )
    $OutDir = Join-Path $SitePath "out"
    $BasePath = "/$SubPath"
    $LiveUrl = "$RootLiveUrl/$SubPath"

    New-Item -ItemType File -Force -Path (Join-Path $OutDir ".nojekyll") | Out-Null

    $PublicAdsTxt = Join-Path $SitePath "public\ads.txt"
    if ((Test-Path $PublicAdsTxt) -and -not (Test-Path (Join-Path $OutDir "ads.txt"))) {
        Copy-Item -Path $PublicAdsTxt -Destination (Join-Path $OutDir "ads.txt") -Force
    }

    $GscToken = if ($EnvMap.ContainsKey("NEXT_PUBLIC_GSC_VERIFICATION")) { $EnvMap["NEXT_PUBLIC_GSC_VERIFICATION"] } else { $env:NEXT_PUBLIC_GSC_VERIFICATION }
    $NaverToken = if ($EnvMap.ContainsKey("NEXT_PUBLIC_NAVER_VERIFICATION")) { $EnvMap["NEXT_PUBLIC_NAVER_VERIFICATION"] } else { $env:NEXT_PUBLIC_NAVER_VERIFICATION }
    $AdsenseToken = if ($EnvMap.ContainsKey("NEXT_PUBLIC_ADSENSE_ID")) { $EnvMap["NEXT_PUBLIC_ADSENSE_ID"] } else { $env:NEXT_PUBLIC_ADSENSE_ID }

    $ExtraMeta = ""
    if ($GscToken) { $ExtraMeta += "  <meta name=`"google-site-verification`" content=`"$GscToken`" />`n" }
    if ($NaverToken) { $ExtraMeta += "  <meta name=`"naver-site-verification`" content=`"$NaverToken`" />`n" }
    if ($AdsenseToken) { $ExtraMeta += "  <meta name=`"google-adsense-account`" content=`"$AdsenseToken`" />`n" }

    $RootIndex = Join-Path $OutDir "index.html"
    $RedirectTarget = "$BasePath/en"
    $RootHtml = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Redirecting to $SubPath…</title>
$ExtraMeta  <meta http-equiv="refresh" content="0; url=$RedirectTarget" />
  <link rel="canonical" href="$LiveUrl/en" />
  <script>window.location.replace("$RedirectTarget" + window.location.search + window.location.hash);</script>
</head>
<body style="font-family:system-ui,sans-serif;padding:2rem;color:#334155;">
  <p>Redirecting to <a href="$RedirectTarget">$LiveUrl/en</a>…</p>
</body>
</html>
"@

    if (-not (Test-Path $RootIndex)) {
        Set-Content -Path $RootIndex -Value $RootHtml -Encoding UTF8
    } else {
        $existingIndex = Get-Content -Path $RootIndex -Raw -Encoding UTF8
        if ($existingIndex -match '__next_error__|NEXT_REDIRECT') {
            Set-Content -Path $RootIndex -Value $RootHtml -Encoding UTF8
            Write-Host "  Patched Next.js root redirect index.html -> $RedirectTarget" -ForegroundColor Green
        } elseif ($existingIndex -match 'url=/en(?![a-zA-Z0-9_-])' -and $existingIndex -notmatch [regex]::Escape($RedirectTarget)) {
            $patchedIndex = $existingIndex -replace 'url=/en', "url=$RedirectTarget"
            Set-Content -Path $RootIndex -Value $patchedIndex -Encoding UTF8
        }
    }

    # Mirror <route>.html -> <route>/index.html so both /route and /route/ resolve HTTP 200 on GitHub Pages
    $HtmlFiles = Get-ChildItem -Path $OutDir -Filter "*.html" -Recurse | Where-Object {
        $_.Name -ne "index.html" -and $_.Name -ne "404.html"
    }
    foreach ($file in $HtmlFiles) {
        $routeDir = Join-Path $file.DirectoryName $file.BaseName
        $routeIndex = Join-Path $routeDir "index.html"
        if (-not (Test-Path $routeIndex)) {
            New-Item -ItemType Directory -Force -Path $routeDir | Out-Null
            Copy-Item -Path $file.FullName -Destination $routeIndex -Force
        }
    }
    Write-Host "  Optimized $SubPath ($($HtmlFiles.Count) mirrored HTML routes)." -ForegroundColor Green
}

$RootEnvMap = Read-LocalEnvMap -DirPath $RootDir

$Sites = @(
    @{ Key = "hub";       Dir = Join-Path $RootDir "site0-hub";       SubPath = "";                 IsNext = $false },
    @{ Key = "wattcheck"; Dir = Join-Path $RootDir "site1-wattcheck"; SubPath = "wattcheck-global"; IsNext = $true  },
    @{ Key = "worthmove"; Dir = Join-Path $RootDir "site2-worthmove"; SubPath = "worthmove-global"; IsNext = $true  },
    @{ Key = "puregram";  Dir = Join-Path $RootDir "site3-puregram";  SubPath = "puregram-global";  IsNext = $true  }
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Unified GitHub Pages Build & Deploy ($Owner/$RepoName)" -ForegroundColor Cyan
Write-Host " Target Site: $Site | Branch: $PagesBranch | DryRun: $DryRun" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Seed unified dist/ from live origin/main to preserve untouched sites, root ownership files & prior _next/static chunks
$StageCloneDir = Join-Path $env:TEMP ("unified-pages-stage-" + [guid]::NewGuid().ToString("N").Substring(0, 8))
$HasStageClone = $false

try {
    if (Test-Path $DistDir) {
        Remove-Item -Recurse -Force $DistDir
    }
    New-Item -ItemType Directory -Force -Path $DistDir | Out-Null

    Write-Host "[1/5] Fetching current $PagesBranch baseline from $RemoteUrl..." -ForegroundColor Yellow
    $cloneCode = Invoke-NativeQuiet { git clone --quiet --depth 1 --branch $PagesBranch $RemoteUrl $StageCloneDir }
    if ($cloneCode -eq 0) {
        $HasStageClone = $true
        Copy-TreeClean -Source $StageCloneDir -Destination $DistDir -ExcludeDirs @(".git")
        Write-Host "  Seeded dist/ from existing $PagesBranch baseline." -ForegroundColor Green
    } else {
        Write-Warning "Could not clone existing $PagesBranch baseline; assembling dist/ from scratch."
    }

    # 2. Build selected site(s) and merge into unified dist/
    Write-Host "[2/5] Building selected site(s)..." -ForegroundColor Yellow
    foreach ($s in $Sites) {
        if ($Site -ne "all" -and $Site -ne $s.Key) { continue }
        if (-not (Test-Path $s.Dir)) {
            throw "Site directory not found: $($s.Dir)"
        }

        $SiteEnvMap = Read-LocalEnvMap -DirPath $s.Dir
        $MergedEnv = @{}
        foreach ($k in $RootEnvMap.Keys) { $MergedEnv[$k] = $RootEnvMap[$k] }
        foreach ($k in $SiteEnvMap.Keys) { $MergedEnv[$k] = $SiteEnvMap[$k] }

        $OutDir = Join-Path $s.Dir "out"
        $BasePath = if ($s.SubPath) { "/$($s.SubPath)" } else { "" }
        $LiveUrl = if ($s.SubPath) { "$RootLiveUrl/$($s.SubPath)" } else { $RootLiveUrl }

        Write-Host "--- Building $($s.Key) -> $LiveUrl ---" -ForegroundColor Cyan
        Push-Location $s.Dir
        $InjectedKeys = @()
        try {
            foreach ($k in $MergedEnv.Keys) {
                if (-not (Test-Path "Env:$k")) {
                    Set-Item -Path "Env:$k" -Value $MergedEnv[$k]
                    $InjectedKeys += $k
                }
            }

            if ($s.IsNext) {
                $env:STATIC_EXPORT = "true"
                $env:NEXT_PUBLIC_BASE_PATH = $BasePath
                $env:NEXT_PUBLIC_SITE_URL = $LiveUrl
                $env:NEXT_PUBLIC_BASE_URL = $LiveUrl
                $env:SITE_URL = $LiveUrl
            } else {
                $env:SITE_URL = $LiveUrl
            }

            if (-not $SkipBuild) {
                if ($s.IsNext -and -not $SkipInstall -and -not (Test-Path (Join-Path $s.Dir "node_modules"))) {
                    Write-Host "  Installing dependencies in $($s.Key)..." -ForegroundColor DarkGray
                    if (Test-Path (Join-Path $s.Dir "package-lock.json")) {
                        Invoke-NativeChecked -Command { npm ci } -ErrorMessage "npm ci failed in $($s.Key)"
                    } else {
                        Invoke-NativeChecked -Command { npm install } -ErrorMessage "npm install failed in $($s.Key)"
                    }
                }
                if (Test-Path $OutDir) {
                    Remove-Item -Recurse -Force $OutDir
                }
                Invoke-NativeChecked -Command { npm run build } -ErrorMessage "npm run build failed in $($s.Key)"
            }

            if (-not (Test-Path $OutDir)) {
                throw "Expected static output folder '$OutDir' does not exist."
            }

            if ($s.IsNext) {
                Optimize-SubAppExport -SitePath $s.Dir -SubPath $s.SubPath -EnvMap $MergedEnv
                $TargetSubDir = Join-Path $DistDir $s.SubPath
                $PrevStaticBackup = Join-Path $env:TEMP ("prev-static-$($s.Key)-" + [guid]::NewGuid().ToString("N").Substring(0, 8))
                try {
                    # Retain previous _next/static chunks for zero-downtime CDN swap
                    $ExistingStatic = Join-Path $TargetSubDir "_next\static"
                    if (Test-Path $ExistingStatic) {
                        Copy-TreeClean -Source $ExistingStatic -Destination $PrevStaticBackup
                    }
                    if (Test-Path $TargetSubDir) {
                        Remove-Item -Recurse -Force $TargetSubDir
                    }
                    New-Item -ItemType Directory -Force -Path $TargetSubDir | Out-Null
                    if (Test-Path $PrevStaticBackup) {
                        Copy-TreeClean -Source $PrevStaticBackup -Destination (Join-Path $TargetSubDir "_next\static")
                    }
                    Copy-TreeClean -Source $OutDir -Destination $TargetSubDir -ExcludeDirs @(".git")
                } finally {
                    Remove-Item -Recurse -Force $PrevStaticBackup -ErrorAction SilentlyContinue
                }
            } else {
                # Overlay root hub files while preserving sub-app folders and existing ads.txt if env was not set
                $ExistingRootAds = Join-Path $DistDir "ads.txt"
                $HadRootAds = Test-Path $ExistingRootAds
                $SavedAdsContent = if ($HadRootAds) { Get-Content -Path $ExistingRootAds -Raw -Encoding UTF8 } else { "" }

                Copy-TreeClean -Source $OutDir -Destination $DistDir -ExcludeDirs @(".git", "wattcheck-global", "worthmove-global", "puregram-global")

                if ($HadRootAds -and -not (Test-Path (Join-Path $OutDir "ads.txt"))) {
                    Set-Content -Path $ExistingRootAds -Value $SavedAdsContent -Encoding UTF8 -NoNewline
                }
            }
        } finally {
            Remove-Item Env:STATIC_EXPORT -ErrorAction SilentlyContinue
            Remove-Item Env:NEXT_PUBLIC_BASE_PATH -ErrorAction SilentlyContinue
            Remove-Item Env:NEXT_PUBLIC_SITE_URL -ErrorAction SilentlyContinue
            Remove-Item Env:NEXT_PUBLIC_BASE_URL -ErrorAction SilentlyContinue
            Remove-Item Env:SITE_URL -ErrorAction SilentlyContinue
            foreach ($k in $InjectedKeys) {
                Remove-Item "Env:$k" -ErrorAction SilentlyContinue
            }
            Pop-Location
        }
    }

    # 3. Guarantee root .nojekyll and zero nested .git directories
    Write-Host "[3/5] Verifying unified dist/ integrity..." -ForegroundColor Yellow
    New-Item -ItemType File -Force -Path (Join-Path $DistDir ".nojekyll") | Out-Null
    $NestedGit = Get-ChildItem -Path $DistDir -Recurse -Force | Where-Object { $_.Name -eq ".git" }
    if ($NestedGit) {
        throw "Found nested .git path inside dist/: $($NestedGit[0].FullName)"
    }
    foreach ($req in @(".nojekyll", "index.html", "wattcheck-global\index.html", "worthmove-global\index.html", "puregram-global\index.html")) {
        if (-not (Test-Path (Join-Path $DistDir $req))) {
            Write-Warning "Expected artifact not found in dist/: $req"
        }
    }

    if ($DryRun) {
        $TotalFiles = (Get-ChildItem -Path $DistDir -Recurse -File -Force).Count
        Write-Host "[DRY RUN] Unified dist/ ready at '$DistDir' ($TotalFiles files). Skipping push." -ForegroundColor Green
        return
    }

    # 4. Sync dist/ into staging clone of $PagesBranch and push
    Write-Host "[4/5] Committing and pushing unified $PagesBranch branch..." -ForegroundColor Yellow
    if (-not $HasStageClone) {
        New-Item -ItemType Directory -Force -Path $StageCloneDir | Out-Null
        Push-Location $StageCloneDir
        try {
            Invoke-NativeChecked -Command { git -c core.autocrlf=false init -q -b $PagesBranch }
            Invoke-NativeChecked -Command { git remote add origin $RemoteUrl }
        } finally {
            Pop-Location
        }
    }

    # Mirror dist/ into $StageCloneDir while preserving $StageCloneDir/.git
    & robocopy $DistDir $StageCloneDir /MIR /XD .git /NFL /NDL /NJH /NJS /NC /NS /NP | Out-Null
    if ($LASTEXITCODE -ge 8) {
        throw "robocopy /MIR to staging clone failed (exit code $LASTEXITCODE)"
    }

    $PushedSha = ""
    Push-Location $StageCloneDir
    try {
        Invoke-NativeChecked -Command { git -c core.autocrlf=false add -A }
        $diffCode = Invoke-NativeQuiet { git diff --cached --quiet }
        if ($diffCode -eq 0) {
            $PushedSha = (git rev-parse HEAD).Trim()
            Write-Host "  No static changes detected on $PagesBranch (HEAD $PushedSha)." -ForegroundColor Green
        } else {
            Invoke-NativeChecked -Command { git -c core.autocrlf=false commit -q -m "deploy: unified Pages update ($Site) $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" }
            $PushedSha = (git rev-parse HEAD).Trim()
            Invoke-NativeChecked -Command { git push -q origin $PagesBranch } -ErrorMessage "Failed pushing $PagesBranch"
            Write-Host "  Pushed $PagesBranch commit $PushedSha." -ForegroundColor Green
        }
    } finally {
        Pop-Location
    }

    # 5. Wait for GitHub Pages build & verify live HTTP 200 across all 4 sites
    Write-Host "[5/5] Waiting for GitHub Pages build ($($PushedSha.Substring(0,7))) & verifying live URLs..." -ForegroundColor Yellow
    $maxAttempts = 40
    $builtConfirmed = $false
    $oldEap = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    try {
        for ($i = 1; $i -le $maxAttempts; $i++) {
            $latestJson = gh api "repos/$Owner/$RepoName/pages/builds/latest" 2>$null
            if ($LASTEXITCODE -eq 0 -and $latestJson) {
                $buildObj = $latestJson | ConvertFrom-Json
                if ($buildObj.commit -eq $PushedSha -and $buildObj.status -eq "built") {
                    $builtConfirmed = $true
                    Write-Host "  GitHub Pages built commit $($PushedSha.Substring(0,7))!" -ForegroundColor Green
                    break
                }
            }
            Write-Host "  [$i/$maxAttempts] Waiting for Pages build..." -ForegroundColor DarkGray
            Start-Sleep -Seconds 3
        }
    } finally {
        $ErrorActionPreference = $oldEap
    }

    $VerifyUrls = @(
        "$RootLiveUrl/",
        "$RootLiveUrl/ads.txt",
        "$RootLiveUrl/wattcheck-global/en",
        "$RootLiveUrl/worthmove-global/en",
        "$RootLiveUrl/puregram-global/en"
    )
    $ts = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
    $allOk = $true
    foreach ($u in $VerifyUrls) {
        try {
            $resp = Invoke-WebRequest -Uri "${u}?v=$ts" -Method Get -UseBasicParsing -MaximumRedirection 5 -Headers @{ "Cache-Control" = "no-cache" } -TimeoutSec 15 -ErrorAction Stop
            Write-Host ("  [HTTP {0}] {1}" -f [int]$resp.StatusCode, $u) -ForegroundColor Green
        } catch {
            $allOk = $false
            Write-Warning "  [FAIL] $u -> $($_.Exception.Message)"
        }
    }

    if (-not $builtConfirmed -or -not $allOk) {
        Write-Warning "Deployment finished pushing $PushedSha, but CDN propagation or endpoint checks need a follow-up check."
    }
} finally {
    Remove-Item -Recurse -Force $StageCloneDir -ErrorAction SilentlyContinue
}
