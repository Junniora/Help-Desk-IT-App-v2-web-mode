// URL base de la API
const API_URL = 'http://localhost:3000/api';

// Variable global para almacenar tickets
let todosLosTickets = [];

// ==================== FUNCIONES DE NAVEGACIÓN ====================

function cambiarPestana(pestana) {
    // Ocultar todas las pestañas
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Desactivar todos los botones
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Activar la pestaña seleccionada
    document.getElementById(`tab-${pestana}`).classList.add('active');
    
    // Activar el botón correspondiente
    event.target.classList.add('active');
    
    // Si cambiamos a la pestaña de lista, cargar tickets
    if (pestana === 'lista') {
        cargarTickets();
    }
}

// ==================== FUNCIONES DE TICKETS ====================

// Cargar todos los tickets
async function cargarTickets() {
    // Spin the refresh button icon while loading
    const btnRef = document.getElementById('btn-refrescar');
    if (btnRef) btnRef.classList.add('loading');

    try {
        const filtroEstado = document.getElementById('filtro-estado').value;
        const response = await fetch(`${API_URL}/tickets`);
        
        if (!response.ok) {
            throw new Error('Error al cargar tickets');
        }
        
        const data = await response.json();
        todosLosTickets = data.tickets;
        
        // Filtrar si es necesario
        let ticketsFiltrados = todosLosTickets;
        if (filtroEstado) {
            ticketsFiltrados = todosLosTickets.filter(t => t.estado === filtroEstado);
        }
        
        mostrarTickets(ticketsFiltrados);
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al cargar los tickets', 'error');
    } finally {
        if (btnRef) btnRef.classList.remove('loading');
    }
}

// Mostrar tickets en la interfaz
function mostrarTickets(tickets) {
    const listaTickets = document.getElementById('lista-tickets');
    
    if (tickets.length === 0) {
        listaTickets.innerHTML = `
            <div class="estado-vacio">
                <h3>No hay tickets disponibles</h3>
                <p>Crea un nuevo ticket para comenzar</p>
            </div>
        `;
        return;
    }
    
    listaTickets.innerHTML = tickets.map(ticket => `
        <div class="ticket-card" onclick="verDetalleTicket(${ticket.id})">
            <div class="ticket-header">
                <span class="ticket-id">#${ticket.id}</span>
            </div>
            
            <div class="ticket-titulo">${ticket.titulo}</div>
            
            <div class="ticket-descripcion">${ticket.descripcion}</div>
            
            <div class="ticket-info">
                <span class="badge badge-categoria">${ticket.categoria}</span>
                <span class="badge badge-prioridad prioridad-${ticket.prioridad.toLowerCase()}">
                    ${ticket.prioridad}
                </span>
                <span class="badge badge-estado estado-${ticket.estado.toLowerCase().replace(' ', '-')}">
                    ${ticket.estado}
                </span>
            </div>
            
            <div class="ticket-usuario">
                <i data-lucide="user"></i> ${ticket.nombre_usuario}
            </div>
            
            <div class="ticket-fecha">
                <i data-lucide="calendar"></i> ${formatearFecha(ticket.fecha_creacion)}
            </div>
        </div>
    `).join('');
    
    // Render Lucide icons in the newly created ticket cards
    lucide.createIcons();
}

// Crear un nuevo ticket
document.getElementById('form-ticket').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const ticket = {
        titulo: document.getElementById('titulo').value,
        descripcion: document.getElementById('descripcion').value,
        categoria: document.getElementById('categoria').value,
        prioridad: document.getElementById('prioridad').value,
        nombre_usuario: document.getElementById('nombre_usuario').value,
        email_usuario: document.getElementById('email_usuario').value
    };
    
    try {
        const response = await fetch(`${API_URL}/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticket)
        });
        
        if (!response.ok) {
            throw new Error('Error al crear el ticket');
        }
        
        const data = await response.json();
        
        mostrarMensaje(`Ticket #${data.id} creado exitosamente`, 'exito');
        
        // Limpiar formulario
        document.getElementById('form-ticket').reset();
        
        // Cambiar a la pestaña de lista
        setTimeout(() => {
            document.querySelector('.tab-button').click();
        }, 1500);
        
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al crear el ticket. Intenta de nuevo.', 'error');
    }
});

// Ver detalle de un ticket
async function verDetalleTicket(id) {
    try {
        const response = await fetch(`${API_URL}/tickets/${id}`);
        
        if (!response.ok) {
            throw new Error('Error al cargar el ticket');
        }
        
        const data = await response.json();
        const ticket = data.ticket;
        
        // Cargar comentarios
        const responseComentarios = await fetch(`${API_URL}/tickets/${id}/comentarios`);
        const dataComentarios = await responseComentarios.json();
        const comentarios = dataComentarios.comentarios;
        
        mostrarModal(ticket, comentarios);
        
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al cargar los detalles del ticket', 'error');
    }
}

// Mostrar modal con detalles del ticket
function mostrarModal(ticket, comentarios) {
    const modal = document.getElementById('modal-ticket');
    const contenido = document.getElementById('contenido-modal');
    
    contenido.innerHTML = `
        <div class="modal-ticket-header">
            <span class="badge badge-estado estado-${ticket.estado.toLowerCase().replace(' ', '-')}">
                ${ticket.estado}
            </span>
            <h2 class="modal-ticket-titulo">#${ticket.id} - ${ticket.titulo}</h2>
        </div>
        
        <div class="modal-info-grid">
            <div class="info-item">
                <div class="info-label">Categoría</div>
                <div class="info-value">${ticket.categoria}</div>
            </div>
            
            <div class="info-item">
                <div class="info-label">Prioridad</div>
                <div class="info-value">
                    <span class="badge badge-prioridad prioridad-${ticket.prioridad.toLowerCase()}">
                        ${ticket.prioridad}
                    </span>
                </div>
            </div>
            
            <div class="info-item">
                <div class="info-label">Usuario</div>
                <div class="info-value">${ticket.nombre_usuario}</div>
            </div>
            
            <div class="info-item">
                <div class="info-label">Email</div>
                <div class="info-value">${ticket.email_usuario}</div>
            </div>
            
            <div class="info-item">
                <div class="info-label">Fecha de creación</div>
                <div class="info-value">${formatearFecha(ticket.fecha_creacion)}</div>
            </div>
            
            <div class="info-item">
                <div class="info-label">Última actualización</div>
                <div class="info-value">${formatearFecha(ticket.fecha_actualizacion)}</div>
            </div>
        </div>
        
        <div class="modal-descripcion">
            <h3>Descripción</h3>
            <p>${ticket.descripcion}</p>
        </div>
        
        <div class="modal-acciones">
            <select id="nuevo-estado" class="btn-modal btn-cambiar-estado">
                <option value="">Cambiar estado...</option>
                <option value="Abierto" ${ticket.estado === 'Abierto' ? 'selected' : ''}>Abierto</option>
                <option value="En Progreso" ${ticket.estado === 'En Progreso' ? 'selected' : ''}>En Progreso</option>
                <option value="Resuelto" ${ticket.estado === 'Resuelto' ? 'selected' : ''}>Resuelto</option>
                <option value="Cerrado" ${ticket.estado === 'Cerrado' ? 'selected' : ''}>Cerrado</option>
            </select>
            <button class="btn-modal btn-cambiar-estado" onclick="cambiarEstadoTicket(${ticket.id})">
                <i data-lucide="save"></i> Guardar Estado
            </button>
            <button class="btn-modal btn-eliminar" onclick="eliminarTicket(${ticket.id})">
                <i data-lucide="trash-2"></i> Eliminar
            </button>
        </div>
        
        <div class="comentarios-seccion">
            <h3><i data-lucide="message-circle"></i> Comentarios (${comentarios.length})</h3>
            
            <div id="lista-comentarios">
                ${comentarios.length === 0 
                    ? '<p style="color: #6c757d;">No hay comentarios aún</p>' 
                    : comentarios.map(c => `
                        <div class="comentario">
                            <div class="comentario-autor">${c.autor}</div>
                            <div class="comentario-texto">${c.comentario}</div>
                            <div class="comentario-fecha">${formatearFecha(c.fecha_creacion)}</div>
                        </div>
                    `).join('')
                }
            </div>
            
            <div class="form-comentario">
                <input type="text" id="autor-comentario" placeholder="Tu nombre" />
                <textarea id="texto-comentario" placeholder="Escribe un comentario..." rows="2"></textarea>
                <button onclick="agregarComentario(${ticket.id})" class="btn-enviar-comentario"><i data-lucide="send"></i> Enviar</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    // Re-render Lucide icons in the newly created modal content
    lucide.createIcons();
}

// Cambiar estado de un ticket
async function cambiarEstadoTicket(id) {
    const nuevoEstado = document.getElementById('nuevo-estado').value;
    
    if (!nuevoEstado) {
        mostrarMensaje('Selecciona un estado', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/tickets/${id}/estado`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estado: nuevoEstado })
        });
        
        if (!response.ok) {
            throw new Error('Error al cambiar el estado');
        }
        
        mostrarMensaje('Estado actualizado exitosamente', 'exito');
        cerrarModal();
        cargarTickets();
        
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al cambiar el estado', 'error');
    }
}

// Eliminar un ticket
async function eliminarTicket(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este ticket? Esta acción no se puede deshacer.')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/tickets/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar el ticket');
        }
        
        mostrarMensaje('Ticket eliminado exitosamente', 'exito');
        cerrarModal();
        cargarTickets();
        
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al eliminar el ticket', 'error');
    }
}

// Agregar comentario a un ticket
async function agregarComentario(ticketId) {
    const autor = document.getElementById('autor-comentario').value;
    const comentario = document.getElementById('texto-comentario').value;
    
    if (!autor || !comentario) {
        mostrarMensaje('Completa todos los campos del comentario', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/tickets/${ticketId}/comentarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ autor, comentario })
        });
        
        if (!response.ok) {
            throw new Error('Error al agregar comentario');
        }
        
        mostrarMensaje('Comentario agregado', 'exito');
        
        // Recargar el modal
        cerrarModal();
        setTimeout(() => verDetalleTicket(ticketId), 500);
        
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al agregar el comentario', 'error');
    }
}

// ==================== FUNCIONES AUXILIARES ====================

// Formatear fecha
function formatearFecha(fecha) {
    const date = new Date(fecha);
    const opciones = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    return date.toLocaleDateString('es-ES', opciones);
}

// Mostrar mensajes
function mostrarMensaje(mensaje, tipo) {
    const div = document.createElement('div');
    div.className = `mensaje mensaje-${tipo}`;
    div.textContent = mensaje;
    
    const container = document.querySelector('.tab-content.active');
    container.insertBefore(div, container.firstChild);
    
    setTimeout(() => {
        div.remove();
    }, 3000);
}

// Cerrar modal
function cerrarModal() {
    document.getElementById('modal-ticket').style.display = 'none';
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('modal-ticket');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// ==================== TEMA CLARO / OSCURO ====================

function initTheme() {
    const saved = localStorage.getItem('helpdesk-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('helpdesk-theme', theme);

    const btn = document.getElementById('theme-toggle');
    if (btn) {
        // Remove old icon and animation class
        btn.classList.remove('icon-spin');
        btn.innerHTML = `<i data-lucide="${theme === 'dark' ? 'sun' : 'moon'}"></i>`;
        btn.title = theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
        lucide.createIcons();

        // Trigger spin animation on next frame so it replays
        requestAnimationFrame(() => {
            btn.classList.add('icon-spin');
        });
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ==================== INICIALIZACIÓN ====================

// Cargar tickets al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar tema
    initTheme();

    // Conectar botón de tema
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    cargarTickets();
});
