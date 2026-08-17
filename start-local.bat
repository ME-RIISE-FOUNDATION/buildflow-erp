@echo off
title BuildFlow ERP - Local Server
echo ============================================
echo   BuildFlow ERP  -  Local Development Server
echo ============================================
echo.

echo [1/2] Starting MySQL (XAMPP)...
start "BuildFlow MySQL" /min "C:\xampp\mysql\bin\mysqld.exe" --defaults-file="C:\xampp\mysql\bin\my.ini"

echo      waiting for MySQL to be ready...
timeout /t 4 /nobreak >nul

echo [2/2] Starting PHP server at http://localhost:8000
echo.
echo   Open:   http://localhost:8000
echo   Login:  admin  /  Admin@123
echo.
echo   (Close this window to stop the server.)
echo.

start "" http://localhost:8000
"C:\xampp\php\php.exe" -S localhost:8000 -t "c:\Users\ME-RIISE\Documents\buildflow-erp\php-version"
