param (
    $shellName = 'pwsh'
)

$commands = @(
    [PSCustomObject]@{
        Path = '.'
        Command = 'npm run preprocess -- --watch'
        Window = 'new-tab'
    }
    [PSCustomObject]@{
        Path = '.'
        Command = 'npm run dev'
        Window = 'new-tab'
    }
)

$argList = $commands |
    ForEach-Object {
        $cmd = $_
        $fullPath = Join-Path $PSScriptRoot $cmd.Path -Resolve
        @(
            $cmd.Window
            "-p $shellName"
            "-d $fullPath"
            "pwsh -noexit -command $($cmd.Command)"
        ) -join " "
    } |
    Join-String -Separator " ; "

Start-Process -FilePath "wt.exe" -ArgumentList $argList
