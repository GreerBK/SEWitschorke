param(
  [Parameter(Mandatory = $true)][string]$InPath,
  [Parameter(Mandatory = $true)][string]$OutPath,
  [int]$Quality = 92
)

$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName PresentationCore

function Convert-ToJpeg {
  param(
    [Parameter(Mandatory = $true)][string]$InputPath,
    [Parameter(Mandatory = $true)][string]$OutputPath,
    [int]$QualityLevel = 92
  )

  $inStream = [System.IO.File]::OpenRead($InputPath)
  try {
    $decoder = [System.Windows.Media.Imaging.BitmapDecoder]::Create(
      $inStream,
      [System.Windows.Media.Imaging.BitmapCreateOptions]::PreservePixelFormat,
      [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad
    )

    $frame = $decoder.Frames[0]

    $source = $frame
    if ($frame.Format -ne [System.Windows.Media.PixelFormats]::Bgr24) {
      $converted = New-Object System.Windows.Media.Imaging.FormatConvertedBitmap
      $converted.BeginInit()
      $converted.Source = $frame
      $converted.DestinationFormat = [System.Windows.Media.PixelFormats]::Bgr24
      $converted.EndInit()
      $source = $converted
    }

    $encoder = New-Object System.Windows.Media.Imaging.JpegBitmapEncoder
    $encoder.QualityLevel = $QualityLevel
    $encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($source))

    $outDir = Split-Path -Parent $OutputPath
    if ($outDir) {
      New-Item -ItemType Directory -Force -Path $outDir | Out-Null
    }

    $outStream = [System.IO.File]::Open($OutputPath, [System.IO.FileMode]::Create)
    try {
      $encoder.Save($outStream)
    }
    finally {
      $outStream.Close()
    }
  }
  finally {
    $inStream.Close()
  }
}

Convert-ToJpeg -InputPath $InPath -OutputPath $OutPath -QualityLevel $Quality

