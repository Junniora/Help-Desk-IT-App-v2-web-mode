# 🎫 Sistema de Help Desk IT

Sistema completo de gestión de tickets de soporte técnico desarrollado con Node.js, Express y SQLite.

## 🎉 ¡NOVEDAD! Ahora disponible como App de Escritorio

Esta aplicación puede ejecutarse de **DOS formas**:

1. 🌐 **Versión WEB** - En tu navegador (tradicional)
2. 🖥️ **Versión APP** - Como aplicación de escritorio (¡NUEVO!)

### Inicio Rápido - Versión APP

```bash
npm install
npm start
```

La aplicación se abrirá automáticamente en su propia ventana. ✨

👉 **Lee `GUIA-ELECTRON.md` para más detalles sobre la versión de escritorio.**

---

## 📋 Características

- ✅ Crear tickets de soporte con diferentes categorías y prioridades
- 📊 Ver todos los tickets en una vista de tarjetas
- 🔍 Filtrar tickets por estado
- 💬 Sistema de comentarios para cada ticket
- 🔄 Cambiar estados de tickets (Abierto, En Progreso, Resuelto, Cerrado)
- 🗑️ Eliminar tickets
- 📱 Interfaz responsive y moderna

## 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js + Express
- **Base de datos:** SQLite3
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Estilo:** CSS personalizado con gradientes y animaciones

## 📁 Estructura del Proyecto

```
helpdesk-app/
│
├── server.js              # Servidor principal de Node.js
├── package.json           # Dependencias del proyecto
├── helpdesk.db           # Base de datos SQLite (se crea automáticamente)
│
└── public/               # Archivos públicos
    ├── index.html        # Interfaz principal
    ├── css/
    │   └── styles.css    # Estilos de la aplicación
    └── js/
        └── app.js        # Lógica del frontend
```

## 🚀 Instalación Paso a Paso

### Opción A: Aplicación de Escritorio (Recomendado) 🖥️

1. **Descargar el proyecto**
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Iniciar la aplicación:**
   ```bash
   npm start
   ```
   
   **Alternativa en Windows:** Doble clic en `iniciar-app.bat`
   **Alternativa en Linux/Mac:** Ejecutar `./iniciar-app.sh`

La aplicación se abrirá en su propia ventana. ¡Listo! 🎉

### Opción B: Versión Web (En Navegador) 🌐

Si prefieres usar el navegador:

1. **Instalar dependencias:**
   ```bash
   npm install
   ```
2. **Iniciar solo el servidor:**
   ```bash
   npm run server
   ```
3. **Abrir navegador:**
   ```
   http://localhost:3000
   ```

### 1. Requisitos Previos

Asegúrate de tener instalado:
- Node.js (versión 14 o superior)
- npm (viene con Node.js)

Para verificar, ejecuta en tu terminal:
```bash
node --version
npm --version
```

### 2. Descargar el Proyecto

Si tienes los archivos, colócalos en una carpeta llamada `helpdesk-app`.

### 3. Instalar Dependencias

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Esto instalará:
- express: Framework web para Node.js
- sqlite3: Base de datos ligera
- body-parser: Para procesar datos JSON
- cors: Para permitir peticiones desde el navegador

### 4. Iniciar el Servidor

```bash
npm start
```

O también puedes usar:
```bash
node server.js
```

Verás un mensaje como:
```
✅ Conectado a la base de datos SQLite
✅ Tabla tickets lista
✅ Tabla comentarios lista
🚀 Servidor corriendo en http://localhost:3000
📊 Base de datos: helpdesk.db
```

### 5. Abrir la Aplicación

Abre tu navegador y ve a:
```
http://localhost:3000
```

## 📖 Cómo Usar la Aplicación

### Crear un Ticket

1. Haz clic en la pestaña "➕ Crear Ticket"
2. Completa todos los campos:
   - **Título:** Breve descripción del problema
   - **Descripción:** Detalles completos del problema
   - **Categoría:** Tipo de problema (Hardware, Software, Red, etc.)
   - **Prioridad:** Urgencia (Baja, Media, Alta, Urgente)
   - **Tu nombre:** Nombre completo del usuario
   - **Email:** Correo electrónico de contacto
3. Haz clic en "Crear Ticket"

### Ver Tickets

1. En la pestaña "📋 Ver Tickets" verás todas las solicitudes
2. Cada tarjeta muestra:
   - Número de ticket
   - Título y descripción
   - Categoría, prioridad y estado
   - Usuario y fecha de creación
3. Haz clic en cualquier ticket para ver sus detalles

### Gestionar un Ticket

Al hacer clic en un ticket se abre un modal donde puedes:

1. **Ver todos los detalles** del ticket
2. **Cambiar el estado:**
   - Abierto (nuevo ticket)
   - En Progreso (siendo atendido)
   - Resuelto (problema solucionado)
   - Cerrado (ticket finalizado)
3. **Agregar comentarios:**
   - Útil para comunicación entre técnicos y usuarios
4. **Eliminar el ticket** si es necesario

### Filtrar Tickets

Usa el selector "Filtrar por estado" para ver solo:
- Todos los tickets
- Solo tickets abiertos
- Solo tickets en progreso
- Solo tickets resueltos
- Solo tickets cerrados

## 🗄️ Estructura de la Base de Datos

### Tabla: tickets

| Campo              | Tipo     | Descripción                          |
|--------------------|----------|--------------------------------------|
| id                 | INTEGER  | ID único (auto-incrementa)           |
| titulo             | TEXT     | Título del problema                  |
| descripcion        | TEXT     | Descripción detallada                |
| categoria          | TEXT     | Categoría (Hardware, Software, etc.) |
| prioridad          | TEXT     | Prioridad (Baja, Media, Alta, etc.)  |
| estado             | TEXT     | Estado actual del ticket             |
| nombre_usuario     | TEXT     | Nombre del usuario                   |
| email_usuario      | TEXT     | Email del usuario                    |
| fecha_creacion     | DATETIME | Fecha de creación                    |
| fecha_actualizacion| DATETIME | Última actualización                 |

### Tabla: comentarios

| Campo          | Tipo     | Descripción                    |
|----------------|----------|--------------------------------|
| id             | INTEGER  | ID único                       |
| ticket_id      | INTEGER  | ID del ticket (relación)       |
| autor          | TEXT     | Nombre del autor               |
| comentario     | TEXT     | Texto del comentario           |
| fecha_creacion | DATETIME | Fecha del comentario           |

## 🔌 API Endpoints

La aplicación expone los siguientes endpoints REST:

### Tickets

- `GET /api/tickets` - Obtener todos los tickets
- `GET /api/tickets/:id` - Obtener un ticket específico
- `POST /api/tickets` - Crear un nuevo ticket
- `PUT /api/tickets/:id/estado` - Actualizar estado de un ticket
- `DELETE /api/tickets/:id` - Eliminar un ticket

### Comentarios

- `GET /api/tickets/:id/comentarios` - Obtener comentarios de un ticket
- `POST /api/tickets/:id/comentarios` - Agregar comentario a un ticket

## 🎨 Personalización

### Cambiar el Puerto

Edita `server.js` línea 8:
```javascript
const PORT = 3000; // Cambia a otro puerto si lo necesitas
```

### Modificar Categorías

Edita `public/index.html` línea 48-56 para agregar/quitar categorías.

### Cambiar Colores

Edita `public/css/styles.css` para personalizar los colores del tema.

## ❓ Solución de Problemas

### El servidor no inicia

- Verifica que Node.js esté instalado: `node --version`
- Asegúrate de haber ejecutado: `npm install`
- Verifica que el puerto 3000 no esté ocupado

### No puedo ver los tickets

- Verifica que el servidor esté corriendo
- Abre la consola del navegador (F12) para ver errores
- Asegúrate de estar en `http://localhost:3000`

### Error de CORS

- Verifica que `cors` esté instalado
- El archivo `server.js` ya incluye la configuración necesaria

## 🔧 Mejoras Futuras

Algunas ideas para expandir la aplicación:

- [ ] Autenticación de usuarios (login/registro)
- [ ] Asignación de tickets a técnicos específicos
- [ ] Notificaciones por email
- [ ] Adjuntar archivos a los tickets
- [ ] Dashboard con estadísticas
- [ ] Búsqueda de tickets
- [ ] Historial de cambios
- [ ] Exportar reportes a PDF/Excel

## 📝 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

## 👨‍💻 Autor

Creado como proyecto educativo para aprender Node.js, Express y SQLite.

---

¡Gracias por usar el Sistema de Help Desk IT! 🎉
