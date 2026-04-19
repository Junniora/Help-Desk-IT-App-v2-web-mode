# 🚀 Guía Rápida de Inicio

## Para Principiantes - Paso a Paso

### 1️⃣ Abrir la Terminal/Consola

**En Windows:**
- Presiona `Windows + R`
- Escribe `cmd` y presiona Enter

**En Mac:**
- Presiona `Cmd + Espacio`
- Escribe "Terminal" y presiona Enter

**En Linux:**
- Presiona `Ctrl + Alt + T`

### 2️⃣ Navegar a la Carpeta del Proyecto

En la terminal, escribe:

```bash
cd ruta/donde/guardaste/helpdesk-app
```

Por ejemplo:
```bash
cd C:\Users\TuNombre\Documentos\helpdesk-app    # Windows
cd ~/Documentos/helpdesk-app                     # Mac/Linux
```

### 3️⃣ Instalar las Dependencias

Copia y pega este comando:

```bash
npm install
```

Espera a que termine (puede tomar 1-2 minutos).

### 4️⃣ Iniciar el Servidor

Copia y pega este comando:

```bash
npm start
```

Verás algo como esto:
```
✅ Conectado a la base de datos SQLite
✅ Tabla tickets lista
✅ Tabla comentarios lista
🚀 Servidor corriendo en http://localhost:3000
```

### 5️⃣ Abrir en el Navegador

Abre tu navegador favorito (Chrome, Firefox, Edge, etc.) y escribe en la barra de direcciones:

```
http://localhost:3000
```

¡Listo! Ya puedes usar la aplicación 🎉

---

## ⚠️ Importante

- **NO cierres la terminal** mientras uses la aplicación
- Para detener el servidor: presiona `Ctrl + C` en la terminal
- Para iniciar de nuevo: ejecuta `npm start`

---

## 🆘 ¿Necesitas ayuda?

Si algo no funciona:

1. Verifica que Node.js esté instalado:
   ```bash
   node --version
   ```
   Debería mostrar algo como `v18.x.x` o superior

2. Verifica que estés en la carpeta correcta:
   ```bash
   dir      # En Windows
   ls       # En Mac/Linux
   ```
   Deberías ver el archivo `server.js`

3. Si hay un error de puerto ocupado, edita el archivo `server.js` y cambia:
   ```javascript
   const PORT = 3000;  // Cambia a 3001, 3002, etc.
   ```

---

## 📚 ¿Qué hacen los archivos?

- **server.js** → El cerebro del servidor (Node.js)
- **public/index.html** → La página web que ves
- **public/css/styles.css** → Los colores y diseño
- **public/js/app.js** → La lógica de la interfaz
- **helpdesk.db** → La base de datos (se crea automáticamente)
- **package.json** → Lista de dependencias
- **node_modules/** → Librerías necesarias (se crean con `npm install`)

---

## 🎯 Primeros Pasos en la App

1. **Crea tu primer ticket:**
   - Haz clic en "➕ Crear Ticket"
   - Llena el formulario
   - Haz clic en "Crear Ticket"

2. **Ve la lista de tickets:**
   - Haz clic en "📋 Ver Tickets"
   - Verás tu ticket recién creado

3. **Explora un ticket:**
   - Haz clic en cualquier ticket
   - Verás todos sus detalles
   - Prueba cambiar el estado
   - Agrega un comentario

¡Eso es todo! Ahora ya sabes usar el sistema de Help Desk IT 🎊
