@echo off
title AgriSmart AI Launcher
echo ========================================================
echo             AgriSmart AI - Starting Servers
echo ========================================================
echo.

:: 1. Launch Flask Backend in a new window
echo [1/2] Starting Flask Backend on http://127.0.0.1:5000 ...
start "AgriSmart AI - Backend" cmd /k "cd /d "%~dp0" && call .\venv\Scripts\activate.bat && python app.py"

:: 2. Launch React Frontend dev server in a new window
echo [2/2] Starting Vite Frontend on http://localhost:5173 ...
start "AgriSmart AI - Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo ========================================================
echo  Both servers have been launched in separate windows on 0.0.0.0!
echo  Local:   http://localhost:5173
echo  Network: http://172.22.13.6:5173 (or your Wi-Fi IPv4)
echo ========================================================
echo.
pause
