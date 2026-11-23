Add-Type -AssemblyName System.Drawing
$srcPath = "C:\Users\sutar\.gemini\antigravity\brain\d1d7a362-86ce-44a4-929c-beb8f6722d96\.user_uploaded\media_1795408007104_66ad3269.jpg"
$img = [System.Drawing.Image]::FromFile($srcPath)
Write-Host "Image size: $($img.Width)x$($img.Height)"

# Crop the full banner right-side building
$cropX = [int]($img.Width * 0.44)
$cropY = [int]($img.Height * 0.10)
$cropW = [int]($img.Width * 0.55)
$cropH = [int]($img.Height * 0.28)

$bmp = New-Object System.Drawing.Bitmap $cropW, $cropH
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$srcRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
$destRect = New-Object System.Drawing.Rectangle 0, 0, $cropW, $cropH
$g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$bmp.Save("public\images\gec-building.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)

# Also crop the logo from the top-left sidebar
$logoX = [int]($img.Width * 0.015)
$logoY = [int]($img.Height * 0.02)
$logoW = [int]($img.Width * 0.13)
$logoH = [int]($img.Height * 0.12)
$logoBmp = New-Object System.Drawing.Bitmap $logoW, $logoH
$logoG = [System.Drawing.Graphics]::FromImage($logoBmp)
$logoG.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$logoSrcRect = New-Object System.Drawing.Rectangle $logoX, $logoY, $logoW, $logoH
$logoDestRect = New-Object System.Drawing.Rectangle 0, 0, $logoW, $logoH
$logoG.DrawImage($img, $logoDestRect, $logoSrcRect, [System.Drawing.GraphicsUnit]::Pixel)
$logoBmp.Save("public\images\gec-logo.png", [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
$logoG.Dispose()
$logoBmp.Dispose()
$img.Dispose()
Write-Host "Successfully saved public\images\gec-building.jpg and public\images\gec-logo.png"
