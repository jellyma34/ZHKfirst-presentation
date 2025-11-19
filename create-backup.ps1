# PowerShell скрипт для создания бекапа проекта

$date = Get-Date -Format "yyyy-MM-dd_HHmm"
$backupName = "architectural-website-backup-$date.zip"

Write-Host "🗜️ Создание бекапа проекта..." -ForegroundColor Cyan
Write-Host "📦 Имя архива: $backupName" -ForegroundColor Yellow
Write-Host ""

# Список файлов и папок для архивации
$itemsToBackup = @(
    "src",
    "PUBLIC", 
    "package.json",
    "package-lock.json",
    "vite.config.js",
    "tailwind.config.js",
    "postcss.config.js",
    "index.html",
    "README.md"
)

# Добавляем все .md файлы
$mdFiles = Get-ChildItem -Filter "*.md" -File | Select-Object -ExpandProperty Name
$itemsToBackup += $mdFiles

Write-Host "📋 Архивируемые элементы:" -ForegroundColor Green
foreach ($item in $itemsToBackup) {
    if (Test-Path $item) {
        Write-Host "  ✅ $item" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️ $item (не найден)" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "⏳ Создание архива..." -ForegroundColor Cyan

try {
    # Создаем временный список существующих элементов
    $existingItems = $itemsToBackup | Where-Object { Test-Path $_ }
    
    # Создаем архив
    Compress-Archive -Path $existingItems -DestinationPath $backupName -CompressionLevel Optimal -Force
    
    $fileSize = (Get-Item $backupName).Length / 1MB
    $fileSizeFormatted = [math]::Round($fileSize, 2)
    
    Write-Host ""
    Write-Host "✅ Бекап успешно создан!" -ForegroundColor Green
    Write-Host "📁 Файл: $backupName" -ForegroundColor Cyan
    Write-Host "📊 Размер: $fileSizeFormatted MB" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📦 Включено:" -ForegroundColor Yellow
    Write-Host "  - Исходный код (src/)" -ForegroundColor White
    Write-Host "  - Публичные файлы (PUBLIC/)" -ForegroundColor White
    Write-Host "  - Конфигурационные файлы" -ForegroundColor White
    Write-Host "  - Документация (*.md)" -ForegroundColor White
    Write-Host ""
    Write-Host "⏭️ Исключено:" -ForegroundColor Yellow
    Write-Host "  - node_modules/ (восстановить: npm install)" -ForegroundColor Gray
    Write-Host "  - dist/ (пересобрать: npm run build)" -ForegroundColor Gray
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "❌ Ошибка создания бекапа:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
}

Write-Host "Нажмите любую клавишу для продолжения..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

