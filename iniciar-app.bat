@echo off
echo ====================================
echo   Help Desk IT - Iniciando App
echo ====================================
echo.

REM Verificar si Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js no esta instalado!
    echo Por favor instala Node.js desde: https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar si las dependencias están instaladas
if not exist "node_modules\" (
    echo [INFO] Instalando dependencias por primera vez...
    echo Esto puede tomar unos minutos...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Fallo la instalacion de dependencias
        pause
        exit /b 1
    )
)

echo [OK] Iniciando Help Desk IT...
echo.
echo La aplicacion se abrira en unos segundos...
echo Presiona Ctrl+C para cerrar la aplicacion
echo.

REM Iniciar la aplicación
call npm start

pause
