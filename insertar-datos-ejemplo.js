// Script para insertar datos de ejemplo en la base de datos
// Ejecuta este archivo con: node insertar-datos-ejemplo.js

const sqlite3 = require('sqlite3').verbose();

// Conectar a la base de datos
const db = new sqlite3.Database('./helpdesk.db', (err) => {
    if (err) {
        console.error('Error al conectar:', err.message);
        return;
    }
    console.log('✅ Conectado a la base de datos');
});

// Datos de ejemplo
const ticketsEjemplo = [
    {
        titulo: 'No puedo acceder al correo electrónico',
        descripcion: 'Desde esta mañana no puedo entrar a mi cuenta de Outlook. Me aparece un error de contraseña incorrecta, pero estoy seguro de que es la correcta.',
        categoria: 'Email',
        prioridad: 'Alta',
        estado: 'Abierto',
        nombre_usuario: 'María González',
        email_usuario: 'maria.gonzalez@empresa.com'
    },
    {
        titulo: 'Impresora de oficina no funciona',
        descripcion: 'La impresora del área de contabilidad no imprime. Se queda en estado de "procesando" pero nunca sale nada. Ya revisamos que tenga papel y tinta.',
        categoria: 'Impresoras',
        prioridad: 'Media',
        estado: 'En Progreso',
        nombre_usuario: 'Carlos Ramírez',
        email_usuario: 'carlos.ramirez@empresa.com'
    },
    {
        titulo: 'Necesito acceso a la carpeta compartida de Marketing',
        descripcion: 'Acabo de unirme al equipo de Marketing y necesito permisos para acceder a la carpeta compartida del departamento en el servidor.',
        categoria: 'Accesos',
        prioridad: 'Baja',
        estado: 'Abierto',
        nombre_usuario: 'Ana Martínez',
        email_usuario: 'ana.martinez@empresa.com'
    },
    {
        titulo: 'Computadora muy lenta',
        descripcion: 'Mi computadora está extremadamente lenta. Tarda mucho en abrir programas y a veces se congela. Tengo Windows 10 instalado.',
        categoria: 'Hardware',
        prioridad: 'Media',
        estado: 'Resuelto',
        nombre_usuario: 'Roberto Silva',
        email_usuario: 'roberto.silva@empresa.com'
    },
    {
        titulo: 'No puedo conectarme al WiFi',
        descripcion: 'Mi laptop no detecta la red WiFi de la oficina. Otros dispositivos sí se pueden conectar, solo mi laptop tiene el problema.',
        categoria: 'Red',
        prioridad: 'Alta',
        estado: 'Abierto',
        nombre_usuario: 'Laura Torres',
        email_usuario: 'laura.torres@empresa.com'
    },
    {
        titulo: 'Excel se cierra automáticamente',
        descripcion: 'Cada vez que intento abrir un archivo grande de Excel (más de 50MB), el programa se cierra solo después de unos segundos.',
        categoria: 'Software',
        prioridad: 'Alta',
        estado: 'En Progreso',
        nombre_usuario: 'Pedro Jiménez',
        email_usuario: 'pedro.jimenez@empresa.com'
    },
    {
        titulo: 'Solicitud de instalación de software',
        descripcion: 'Necesito que me instalen Adobe Photoshop CC en mi computadora para trabajar en el diseño de la nueva campaña publicitaria.',
        categoria: 'Software',
        prioridad: 'Media',
        estado: 'Cerrado',
        nombre_usuario: 'Sofía Morales',
        email_usuario: 'sofia.morales@empresa.com'
    },
    {
        titulo: 'Pantalla parpadeando',
        descripcion: 'La pantalla de mi monitor está parpadeando constantemente. Ya cambié el cable pero el problema persiste.',
        categoria: 'Hardware',
        prioridad: 'Urgente',
        estado: 'Abierto',
        nombre_usuario: 'Miguel Ángel Ruiz',
        email_usuario: 'miguel.ruiz@empresa.com'
    }
];

// Comentarios de ejemplo
const comentariosEjemplo = [
    { ticket_id: 2, autor: 'Soporte Técnico', comentario: 'Hemos reiniciado el servicio de impresión. ¿Podrías intentar imprimir nuevamente?' },
    { ticket_id: 2, autor: 'Carlos Ramírez', comentario: 'Sigue sin funcionar. El problema persiste.' },
    { ticket_id: 4, autor: 'Soporte Técnico', comentario: 'Realizamos una limpieza del disco y optimización. El equipo debería funcionar mejor ahora.' },
    { ticket_id: 4, autor: 'Roberto Silva', comentario: '¡Muchas gracias! La computadora está mucho más rápida ahora.' },
    { ticket_id: 6, autor: 'Soporte Técnico', comentario: 'Estamos investigando el problema. Parece ser un conflicto con la versión de Office.' }
];

// Función para insertar tickets
function insertarTickets() {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare(`
            INSERT INTO tickets (titulo, descripcion, categoria, prioridad, estado, nombre_usuario, email_usuario)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        
        let insertados = 0;
        
        ticketsEjemplo.forEach((ticket, index) => {
            stmt.run(
                ticket.titulo,
                ticket.descripcion,
                ticket.categoria,
                ticket.prioridad,
                ticket.estado,
                ticket.nombre_usuario,
                ticket.email_usuario,
                (err) => {
                    if (err) {
                        console.error('Error al insertar ticket:', err.message);
                    } else {
                        insertados++;
                        console.log(`✅ Ticket ${insertados} insertado: ${ticket.titulo}`);
                    }
                    
                    if (index === ticketsEjemplo.length - 1) {
                        stmt.finalize();
                        resolve();
                    }
                }
            );
        });
    });
}

// Función para insertar comentarios
function insertarComentarios() {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare(`
            INSERT INTO comentarios (ticket_id, autor, comentario)
            VALUES (?, ?, ?)
        `);
        
        let insertados = 0;
        
        comentariosEjemplo.forEach((comentario, index) => {
            stmt.run(
                comentario.ticket_id,
                comentario.autor,
                comentario.comentario,
                (err) => {
                    if (err) {
                        console.error('Error al insertar comentario:', err.message);
                    } else {
                        insertados++;
                        console.log(`💬 Comentario ${insertados} insertado`);
                    }
                    
                    if (index === comentariosEjemplo.length - 1) {
                        stmt.finalize();
                        resolve();
                    }
                }
            );
        });
    });
}

// Ejecutar inserción
async function ejecutar() {
    try {
        console.log('\n📝 Insertando tickets de ejemplo...\n');
        await insertarTickets();
        
        console.log('\n💬 Insertando comentarios de ejemplo...\n');
        await insertarComentarios();
        
        console.log('\n✅ ¡Datos de ejemplo insertados exitosamente!');
        console.log('Ahora puedes iniciar el servidor con: npm start\n');
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        db.close();
    }
}

ejecutar();
