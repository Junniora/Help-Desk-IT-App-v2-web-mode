// Importamos las librerías necesarias
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware (configuraciones intermedias)
app.use(cors()); // Permite peticiones desde otros dominios
app.use(bodyParser.json()); // Permite leer datos en formato JSON
app.use(bodyParser.urlencoded({ extended: true })); // Permite leer datos de formularios
app.use(express.static('public')); // Sirve archivos estáticos (HTML, CSS, JS)

// Crear/Conectar a la base de datos SQLite
const db = new sqlite3.Database('./helpdesk.db', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('✅ Conectado a la base de datos SQLite');
        inicializarBaseDeDatos();
    }
});

// Función para crear las tablas si no existen
function inicializarBaseDeDatos() {
    // Tabla de tickets
    db.run(`
        CREATE TABLE IF NOT EXISTS tickets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descripcion TEXT NOT NULL,
            categoria TEXT NOT NULL,
            prioridad TEXT NOT NULL,
            estado TEXT DEFAULT 'Abierto',
            nombre_usuario TEXT NOT NULL,
            email_usuario TEXT NOT NULL,
            fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
            fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error al crear tabla tickets:', err.message);
        } else {
            console.log('✅ Tabla tickets lista');
        }
    });

    // Tabla de comentarios/respuestas
    db.run(`
        CREATE TABLE IF NOT EXISTS comentarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ticket_id INTEGER NOT NULL,
            autor TEXT NOT NULL,
            comentario TEXT NOT NULL,
            fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (ticket_id) REFERENCES tickets (id)
        )
    `, (err) => {
        if (err) {
            console.error('Error al crear tabla comentarios:', err.message);
        } else {
            console.log('✅ Tabla comentarios lista');
        }
    });
}

// ==================== RUTAS API ====================

// 1. Obtener todos los tickets
app.get('/api/tickets', (req, res) => {
    const sql = 'SELECT * FROM tickets ORDER BY fecha_creacion DESC';
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ tickets: rows });
    });
});

// 2. Obtener un ticket específico por ID
app.get('/api/tickets/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM tickets WHERE id = ?';
    
    db.get(sql, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Ticket no encontrado' });
            return;
        }
        res.json({ ticket: row });
    });
});

// 3. Crear un nuevo ticket
app.post('/api/tickets', (req, res) => {
    const { titulo, descripcion, categoria, prioridad, nombre_usuario, email_usuario } = req.body;
    
    // Validación básica
    if (!titulo || !descripcion || !categoria || !prioridad || !nombre_usuario || !email_usuario) {
        res.status(400).json({ error: 'Todos los campos son requeridos' });
        return;
    }
    
    const sql = `INSERT INTO tickets (titulo, descripcion, categoria, prioridad, nombre_usuario, email_usuario) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.run(sql, [titulo, descripcion, categoria, prioridad, nombre_usuario, email_usuario], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ 
            id: this.lastID,
            mensaje: 'Ticket creado exitosamente' 
        });
    });
});

// 4. Actualizar el estado de un ticket
app.put('/api/tickets/:id/estado', (req, res) => {
    const id = req.params.id;
    const { estado } = req.body;
    
    const sql = `UPDATE tickets SET estado = ?, fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = ?`;
    
    db.run(sql, [estado, id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Ticket no encontrado' });
            return;
        }
        res.json({ mensaje: 'Estado actualizado exitosamente' });
    });
});

// 5. Eliminar un ticket
app.delete('/api/tickets/:id', (req, res) => {
    const id = req.params.id;
    
    // Primero eliminamos los comentarios asociados
    db.run('DELETE FROM comentarios WHERE ticket_id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        // Luego eliminamos el ticket
        db.run('DELETE FROM tickets WHERE id = ?', [id], function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (this.changes === 0) {
                res.status(404).json({ error: 'Ticket no encontrado' });
                return;
            }
            res.json({ mensaje: 'Ticket eliminado exitosamente' });
        });
    });
});

// 6. Obtener comentarios de un ticket
app.get('/api/tickets/:id/comentarios', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM comentarios WHERE ticket_id = ? ORDER BY fecha_creacion ASC';
    
    db.all(sql, [id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ comentarios: rows });
    });
});

// 7. Agregar un comentario a un ticket
app.post('/api/tickets/:id/comentarios', (req, res) => {
    const ticket_id = req.params.id;
    const { autor, comentario } = req.body;
    
    if (!autor || !comentario) {
        res.status(400).json({ error: 'Autor y comentario son requeridos' });
        return;
    }
    
    const sql = 'INSERT INTO comentarios (ticket_id, autor, comentario) VALUES (?, ?, ?)';
    
    db.run(sql, [ticket_id, autor, comentario], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ 
            id: this.lastID,
            mensaje: 'Comentario agregado exitosamente' 
        });
    });
});

// Ruta principal - servir el HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📊 Base de datos: helpdesk.db`);
});

// Cerrar la base de datos cuando se cierra el servidor
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('\n👋 Base de datos cerrada');
        process.exit(0);
    });
});
