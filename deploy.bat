@echo off
REM ============================================
REM   NextReach - Quick Deployment Script
REM   Run this to deploy to GitHub Pages
REM ============================================

echo.
echo ========================================
echo   NextReach Website - Quick Deploy
echo ========================================
echo.

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/5] Checking current directory...
cd /d "%~dp0"
echo Current folder: %CD%
echo.

echo [2/5] Initializing Git repository...
if not exist ".git" (
    git init
    echo Git initialized!
) else (
    echo Git already initialized.
)
echo.

echo [3/5] Adding all files...
git add .
echo Files added!
echo.

echo [4/5] Creating commit...
git commit -m "Deploy NextReach website - %DATE% %TIME%"
echo.

echo [5/5] Next steps:
echo.
echo 1. Create repository on GitHub:
echo    - Go to: https://github.com/new
echo    - Name: nextreach-website
echo    - Click "Create repository"
echo.
echo 2. Run these commands (replace YOUR_USERNAME):
echo.
echo    git remote add origin https://github.com/YOUR_USERNAME/nextreach-website.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Enable GitHub Pages:
echo    - Go to: Settings ^> Pages
echo    - Source: main branch
echo    - Save
echo.
echo 4. Your site will be live at:
echo    https://YOUR_USERNAME.github.io/nextreach-website/
echo.
echo ========================================
echo   Ready to Deploy!
echo ========================================
echo.
pause
