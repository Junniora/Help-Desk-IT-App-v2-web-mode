# 📸 Tutorial Visual - Help Desk IT como App

## ¿Qué verás cuando ejecutes la aplicación?

### Paso 1: Instalación
```bash
npm install
```
- Verás muchas líneas descargando paquetes
- Espera a que termine (1-3 minutos)
- Debe terminar sin errores

### Paso 2: Inicio
```bash
npm start
```

**En la terminal verás:**
```
✅ Conectado a la base de datos SQLite
✅ Tabla tickets lista
✅ Tabla comentarios lista
🚀 Servidor corriendo en http://localhost:3000
```

### Paso 3: ¡La App se Abre!

Se abrirá una ventana como esta:

```
┌─────────────────────────────────────────────────────┐
│ 📁 Archivo    👁️ Ver    ❓ Ayuda                     │
├─────────────────────────────────────────────────────┤
│                                                      │
│            🎫 Help Desk IT                          │
│   Sistema de Gestión de Tickets de Soporte         │
│                                                      │
├─────────────────────────────────────────────────────┤
│  📋 Ver Tickets  │  ➕ Crear Ticket                 │
├─────────────────────────────────────────────────────┤
│                                                      │
│  [Lista de tickets aparece aquí]                    │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### Características de la Ventana:

✅ **Barra de título:** "Help Desk IT - Sistema de Tickets"
✅ **Menú superior:** Archivo, Ver, Ayuda
✅ **Botones:** Minimizar, Maximizar, Cerrar
✅ **Contenido:** Tu aplicación web completa

---

## 🎯 Comparación Visual

### Antes (Versión Web en Navegador)
```
1. Abrir terminal
2. Ejecutar: node server.js
3. Dejar terminal abierta
4. Abrir navegador
5. Ir a localhost:3000
6. ¡Dos ventanas abiertas!
```

### Ahora (Versión App de Escritorio)
```
1. Ejecutar: npm start
   (o doble clic en iniciar-app.bat)
2. ¡Listo! Una sola ventana
```

---

## 🖼️ Screenshots Esperados

### Pantalla Inicial - Ver Tickets
```
╔════════════════════════════════════════════════════╗
║  Filtrar por estado: [Todos ▼]  🔄 Refrescar      ║
╠════════════════════════════════════════════════════╣
║                                                     ║
║  ┌─────────────┐  ┌─────────────┐  ┌────────────┐║
║  │ #1          │  │ #2          │  │ #3         │║
║  │ Problema... │  │ Otro prob...│  │ Más...     │║
║  │ 🏷️ Software │  │ 🏷️ Hardware │  │ 🏷️ Red    │║
║  │ 🔴 Alta     │  │ 🟡 Media    │  │ 🟢 Baja    │║
║  │ 🔵 Abierto  │  │ 🟡 Progreso │  │ 🟢 Resuelto│║
║  └─────────────┘  └─────────────┘  └────────────┘║
║                                                     ║
╚════════════════════════════════════════════════════╝
```

### Pantalla Crear Ticket
```
╔════════════════════════════════════════════════════╗
║  Crear Nuevo Ticket                                ║
╠════════════════════════════════════════════════════╣
║                                                     ║
║  Título del problema *                             ║
║  [________________________]                        ║
║                                                     ║
║  Descripción detallada *                           ║
║  [________________________]                        ║
║  [________________________]                        ║
║                                                     ║
║  Categoría *        Prioridad *                    ║
║  [Hardware ▼]       [Alta ▼]                       ║
║                                                     ║
║  Tu nombre *        Email *                        ║
║  [__________]       [__________]                   ║
║                                                     ║
║         [    Crear Ticket    ]                     ║
║                                                     ║
╚════════════════════════════════════════════════════╝
```

### Modal de Detalles
```
╔════════════════════════════════════════════════════╗
║  #5 - No puedo acceder al correo        [✕]       ║
╠════════════════════════════════════════════════════╣
║  🔵 Abierto                                        ║
║                                                     ║
║  Categoría: Email          Prioridad: 🔴 Alta     ║
║  Usuario: María G.         Email: maria@...       ║
║  Creado: 4 Feb 2026       Actualizado: 4 Feb 2026 ║
║                                                     ║
║  Descripción:                                      ║
║  ┌──────────────────────────────────────────────┐ ║
║  │ Desde esta mañana no puedo entrar a mi      │ ║
║  │ cuenta de Outlook...                         │ ║
║  └──────────────────────────────────────────────┘ ║
║                                                     ║
║  [Cambiar estado ▼] [💾 Guardar] [🗑️ Eliminar]    ║
║                                                     ║
║  💬 Comentarios (2)                                ║
║  ┌──────────────────────────────────────────────┐ ║
║  │ Soporte: Estamos revisando el problema...   │ ║
║  │ María: Sigue sin funcionar :(               │ ║
║  └──────────────────────────────────────────────┘ ║
║                                                     ║
║  [Tu nombre] [Escribe un comentario...] [Enviar]  ║
║                                                     ║
╚════════════════════════════════════════════════════╝
```

---

## 🎨 Colores y Diseño

La aplicación usa un diseño moderno con:

- **Gradiente principal:** Morado/Azul (#667eea → #764ba2)
- **Fondo de tarjetas:** Blanco con sombras suaves
- **Badges de estado:**
  - 🔵 Abierto (Azul)
  - 🟡 En Progreso (Amarillo)
  - 🟢 Resuelto (Verde)
  - ⚫ Cerrado (Gris)
- **Badges de prioridad:**
  - 🟢 Baja (Verde)
  - 🟡 Media (Amarillo)
  - 🟠 Alta (Naranja)
  - 🔴 Urgente (Rojo)

---

## ⌨️ Menús y Atajos

### Menú Archivo
```
Archivo
├─ Nuevo Ticket      Ctrl+N
├─ ─────────────
├─ Refrescar         Ctrl+R
├─ ─────────────
└─ Salir             Ctrl+Q
```

### Menú Ver
```
Ver
├─ Ver Tickets              Ctrl+1
├─ Crear Ticket             Ctrl+2
├─ ────────────────
├─ Pantalla Completa        F11
└─ Herramientas Desarrollo  F12
```

### Menú Ayuda
```
Ayuda
└─ Acerca de
```

---

## 🔄 Estados de la Aplicación

### Iniciando
```
🔄 Iniciando servidor...
⏳ Conectando a base de datos...
✅ ¡Listo!
```

### Cargando Datos
```
📊 Cargando tickets...
[Animación de carga]
✅ 8 tickets cargados
```

### Creando Ticket
```
📝 Guardando ticket...
✅ Ticket #9 creado exitosamente
🔄 Redirigiendo a lista...
```

### Error
```
❌ Error al cargar tickets
[Botón: Reintentar]
```

---

## 🎬 Flujo de Uso Típico

1. **Inicio**
   - Usuario hace doble clic en `iniciar-app.bat`
   - Ventana de terminal se abre brevemente
   - App se abre en 2-3 segundos

2. **Ver Tickets**
   - Usuario ve lista de tickets
   - Puede filtrar por estado
   - Hace clic en un ticket

3. **Ver Detalles**
   - Modal se abre con toda la información
   - Usuario puede agregar comentario
   - Puede cambiar estado
   - Cierra modal con X o ESC

4. **Crear Ticket**
   - Usuario hace clic en pestaña
   - Llena formulario
   - Hace clic en "Crear Ticket"
   - Ve confirmación
   - Vuelve automáticamente a lista

5. **Cerrar**
   - Usuario hace clic en X de la ventana
   - O presiona Ctrl+Q
   - App se cierra completamente
   - Servidor también se detiene

---

## 💡 Tips Visuales

- **Hover sobre tickets:** Se elevan ligeramente con sombra
- **Animaciones:** Transiciones suaves de 0.3s
- **Responsive:** Se adapta al tamaño de ventana
- **Fuentes:** Segoe UI (clara y profesional)
- **Espaciado:** Generoso, fácil de leer
- **Contraste:** Alto para accesibilidad

---

## 🎯 Checklist Visual

- [ ] La ventana tiene el título correcto
- [ ] El menú superior es visible
- [ ] Los colores del gradiente se ven bien
- [ ] Las tarjetas tienen sombra al pasar el mouse
- [ ] Los badges tienen colores correctos
- [ ] El modal se abre/cierra suavemente
- [ ] El formulario es claro y ordenado
- [ ] Los botones responden al click
- [ ] Las animaciones son fluidas

---

¡Eso es todo! Ahora sabes exactamente qué esperar cuando ejecutes la aplicación. 🎉
