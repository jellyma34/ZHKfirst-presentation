@echo off
echo Creating project backup...

set BACKUP_NAME=architectural-website-backup-%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%
set BACKUP_NAME=%BACKUP_NAME: =0%

echo Backup name: %BACKUP_NAME%.zip

powershell -Command "Compress-Archive -Path 'src','PUBLIC','package.json','package-lock.json','vite.config.js','tailwind.config.js','postcss.config.js','index.html','README.md','*.md' -DestinationPath '%BACKUP_NAME%.zip' -CompressionLevel Optimal -Force"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Backup created successfully: %BACKUP_NAME%.zip
    echo.
    echo Backup includes:
    echo - Source code (src/)
    echo - Public files (PUBLIC/)
    echo - Configuration files
    echo - Documentation (*.md)
    echo.
    echo Excluded:
    echo - node_modules/ (restore with: npm install)
    echo - dist/ (rebuild with: npm run build)
    echo.
) else (
    echo.
    echo ❌ Backup failed
    echo.
)

pause

