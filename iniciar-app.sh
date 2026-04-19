#!/bin/bash

echo "===================================="
echo "  Help Desk IT - Iniciando App"
echo "===================================="
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js no está instalado!"
    echo "Por favor instala Node.js desde: https://nodejs.org/"
    exit 1
fi

# Verificar si las dependencias están instaladas
if [ ! -d "node_modules" ]; then
    echo "[INFO] Instalando dependencias por primera vez..."
    echo "Esto puede tomar unos minutos..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] Falló la instalación de dependencias"
        exit 1
    fi
fi

echo "[OK] Iniciando Help Desk IT..."
echo ""
echo "La aplicación se abrirá en unos segundos..."
echo "Presiona Ctrl+C para cerrar la aplicación"
echo ""

# Iniciar la aplicación
npm start
