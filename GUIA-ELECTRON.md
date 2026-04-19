# 🖥️ Guía de Aplicación de Escritorio (Electron)

## ¿Qué es esto?

Ahora tu Help Desk IT puede ejecutarse como una **aplicación de escritorio** independiente, sin necesidad de abrir el navegador. Funciona como cualquier otra aplicación en tu computadora (como Word, Excel, etc.).

---

## 🚀 Modo 1: Ejecutar en Modo Desarrollo

### Instalación Rápida

1. **Abre la terminal** en la carpeta del proyecto

2. **Instala las dependencias** (incluye Electron):
   ```bash
   npm install
   ```

3. **Inicia la aplicación:**
   ```bash
   npm start
   ```

¡Eso es todo! La aplicación se abrirá en su propia ventana. 🎉

### Ventajas de la App de Escritorio

- ✅ Se abre como una aplicación normal (no necesitas navegador)
- ✅ Tiene su propio ícono en la barra de tareas
- ✅ Menú propio con atajos de teclado
- ✅ Funciona exactamente igual que la versión web
- ✅ Puedes minimizar, maximizar y cerrar como cualquier app
- ✅ Alt+Tab para cambiar entre aplicaciones

---

## 📦 Modo 2: Crear Instalador (Compilar)

Si quieres distribuir la aplicación o instalarla permanentemente, puedes crear un instalador.

### Para Windows

```bash
npm run build:win
```

Esto creará un instalador `.exe` en la carpeta `dist/`

### Para macOS

```bash
npm run build:mac
```

Esto creará un archivo `.dmg` en la carpeta `dist/`

### Para Linux

```bash
npm run build:linux
```

Esto creará archivos `.AppImage` y `.deb` en la carpeta `dist/`

### Para todas las plataformas

```bash
npm run build
```

---

## ⌨️ Atajos de Teclado

La aplicación incluye varios atajos útiles:

| Atajo | Acción |
|-------|--------|
| `Ctrl+N` (o `Cmd+N` en Mac) | Crear nuevo ticket |
| `Ctrl+1` | Ir a Ver Tickets |
| `Ctrl+2` | Ir a Crear Ticket |
| `Ctrl+R` | Refrescar aplicación |
| `Ctrl+Q` | Cerrar aplicación |
| `F11` | Pantalla completa |
| `F12` | Abrir herramientas de desarrollo |

---

## 🎯 Diferencias entre Versión Web y App

### Versión Web (navegador)
- Abres el navegador manualmente
- Vas a `http://localhost:3000`
- Necesitas mantener la terminal abierta
- El servidor corre por separado

### Versión App (Electron)
- Se abre automáticamente en su propia ventana
- No necesitas abrir navegador
- El servidor se inicia automáticamente
- Se cierra completamente al cerrar la ventana
- Tiene menú propio y atajos de teclado

---

## 🔧 Solución de Problemas

### La aplicación no inicia

1. Verifica que instalaste todo:
   ```bash
   npm install
   ```

2. Verifica que no haya otro servidor corriendo en el puerto 3000:
   - Cierra cualquier otra instancia de la aplicación
   - O cambia el puerto en `main.js` y `server.js`

### Error al compilar el instalador

- Asegúrate de tener espacio en disco (al menos 500MB libres)
- En Windows, puede que necesites permisos de administrador
- La primera compilación puede tomar varios minutos

### La aplicación se ve en blanco

- Espera unos segundos (el servidor tarda en iniciarse)
- Presiona `Ctrl+R` para refrescar
- Si persiste, abre las herramientas de desarrollo (`F12`) para ver errores

---

## 📂 Archivos de la Aplicación

### Archivos principales de Electron

- **`main.js`** → Controla la ventana de la aplicación y el menú
- **`package.json`** → Actualizado con dependencias de Electron
- **`public/icon.svg`** → Ícono de la aplicación

### Cómo funciona

1. Al ejecutar `npm start`:
   - Electron lee `main.js`
   - `main.js` inicia el servidor (`server.js`)
   - Espera 2 segundos a que el servidor esté listo
   - Abre una ventana apuntando a `http://localhost:3000`
   - Cuando cierras la ventana, también cierra el servidor

---

## 🎨 Personalización

### Cambiar el tamaño de la ventana

Edita `main.js` (líneas 32-34):
```javascript
mainWindow = new BrowserWindow({
    width: 1400,  // Cambia el ancho
    height: 900,  // Cambia la altura
    // ...
});
```

### Cambiar el título de la aplicación

Edita `main.js` (línea 40):
```javascript
title: 'Tu Título Aquí'
```

### Agregar tu propio ícono

1. Crea una imagen PNG de 512x512 píxeles
2. Guárdala como `public/icon.png`
3. Para Windows: convierte a `.ico` usando https://convertio.co/es/png-ico/
4. Para Mac: convierte a `.icns` usando https://cloudconvert.com/png-to-icns

---

## 📊 Tamaño de la Aplicación

- **Modo desarrollo:** Usa las dependencias de `node_modules` (~200MB)
- **App compilada:** ~100-150MB (incluye Node.js y Chrome integrado)

Esto es normal para aplicaciones Electron. Apps como VS Code, Slack, Discord también usan Electron y tienen tamaños similares.

---

## 🆚 ¿Cuándo usar cada versión?

### Usa la versión WEB si:
- Quieres acceder desde cualquier dispositivo en tu red
- Prefieres usar tu navegador favorito
- Tienes poca RAM o espacio en disco

### Usa la versión APP si:
- Quieres una experiencia de aplicación nativa
- Prefieres no tener que abrir el navegador
- Quieres tener atajos de teclado
- Vas a usar la aplicación frecuentemente

---

## 🎓 Para Aprender Más

Si quieres aprender cómo funciona Electron:
- Documentación oficial: https://www.electronjs.org/docs
- Tutorial en español: https://www.electron.build/

---

## ✅ Checklist de Inicio

- [ ] Ejecuté `npm install`
- [ ] La aplicación se abre con `npm start`
- [ ] Puedo crear tickets
- [ ] Puedo ver la lista de tickets
- [ ] Los atajos de teclado funcionan
- [ ] Puedo cerrar la aplicación sin problemas

---

¡Listo! Ahora tienes una aplicación de escritorio profesional para tu Help Desk IT. 🎉

Si tienes problemas, revisa los logs en la terminal donde ejecutaste `npm start`.
