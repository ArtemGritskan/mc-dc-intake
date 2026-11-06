param([string]$OutputDirectory = '', [string]$KeyFile = '')
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
if (-not $OutputDirectory) { $OutputDirectory = Join-Path $projectRoot 'dist' }
$outputRoot = [IO.Path]::GetFullPath($OutputDirectory)
[IO.Directory]::CreateDirectory($outputRoot) | Out-Null
$main = [IO.File]::ReadAllText((Join-Path $projectRoot 'mc-dc-intake.php'))
if ($main -notmatch 'Version:\s*([0-9.]+)') { throw 'Plugin version not found.' }
$archivePath = Join-Path $outputRoot ('mc-dc-intake-' + $Matches[1] + '.zip')
$items = @('mc-dc-intake.php','uninstall.php','mc-dc-intake.code-workspace','assets','config','includes','preview','scripts')
$privatePhp = $null
if ($KeyFile) {
    $keySource = [IO.File]::ReadAllText([IO.Path]::GetFullPath($KeyFile))
    if ($keySource -notmatch 'sk-or-v[0-9]+-[a-zA-Z0-9-]+') { throw 'API key not found in key file.' }
    $privatePhp = "<?php
// Private installation credential. Never publish this file.
defined('ABSPATH') || exit;
return '" + $Matches[0] + "';
"
}
$stream = [IO.File]::Open($archivePath, [IO.FileMode]::Create)
$archive = [IO.Compression.ZipArchive]::new($stream,[IO.Compression.ZipArchiveMode]::Create)
try {
    foreach ($item in $items) {
        $itemPath = Join-Path $projectRoot $item
        $files = if (Test-Path -LiteralPath $itemPath -PathType Container) { Get-ChildItem -LiteralPath $itemPath -Recurse -File } else { Get-Item -LiteralPath $itemPath }
        foreach ($file in $files) {
            if ($file.Name -eq 'private-key.php') { continue }
            $relative = $file.FullName.Substring($projectRoot.Length + 1).Replace('\','/')
            $entry = $archive.CreateEntry(('mc-dc-intake/' + $relative), [IO.Compression.CompressionLevel]::Optimal)
            $inputStream = $file.OpenRead()
            $outputStream = $entry.Open()
            try { $inputStream.CopyTo($outputStream) } finally { $outputStream.Dispose(); $inputStream.Dispose() }
        }
    }
    if ($privatePhp) {
        $entry = $archive.CreateEntry('mc-dc-intake/includes/private-key.php', [IO.Compression.CompressionLevel]::Optimal)
        $writer = [IO.StreamWriter]::new($entry.Open(), [Text.UTF8Encoding]::new($false))
        try { $writer.Write($privatePhp) } finally { $writer.Dispose() }
    }
} finally { $archive.Dispose(); $stream.Dispose() }
Write-Output $archivePath
