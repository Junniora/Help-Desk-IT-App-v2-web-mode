// main.js - Archivo principal de Electron
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

// Variables globales
let mainWindow;
let serverProcess;
const PORT = 3000;

// Función para iniciar el servidor Node.js
function iniciarServidor() {
    return new Promise((resolve, reject) => {
        console.log('🚀 Iniciando servidor Node.js...');
        
        // Iniciar el servidor como un proceso hijo
        serverProcess = spawn('node', ['server.js'], {
            cwd: __dirname,
            stdio: 'inherit'
        });
        
        serverProcess.on('error', (error) => {
            console.error('❌ Error al iniciar el servidor:', error);
            reject(error);
        });
        
        // Dar tiempo al servidor para iniciarse
        setTimeout(() => {
            console.log('✅ Servidor iniciado');
            resolve();
        }, 2000);
    });
}

// Función para crear la ventana de la aplicación
function crearVentana() {
    // Crear la ventana del navegador
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 800,
        minHeight: 600,
        icon: path.join(__dirname, 'public', 'icon.png'), // Opcional: puedes agregar un ícono
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false
        },
        autoHideMenuBar: false, // Mostrar menú
        title: 'Help Desk IT - Sistema de Tickets'
    });

    // Crear menú personalizado
    const menuTemplate = [
        {
            label: 'Archivo',
            submenu: [
                {
                    label: 'Nuevo Ticket',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        mainWindow.webContents.executeJavaScript(`
                            document.querySelectorAll('.tab-button')[1].click();
                        `);
                    }
                },
                { type: 'separator' },
                {
                    label: 'Refrescar',
                    accelerator: 'CmdOrCtrl+R',
                    click: () => {
                        mainWindow.reload();
                    }
                },
                { type: 'separator' },
                {
                    label: 'Salir',
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Ver',
            submenu: [
                {
                    label: 'Ver Tickets',
                    accelerator: 'CmdOrCtrl+1',
                    click: () => {
                        mainWindow.webContents.executeJavaScript(`
                            document.querySelectorAll('.tab-button')[0].click();
                        `);
                    }
                },
                {
                    label: 'Crear Ticket',
                    accelerator: 'CmdOrCtrl+2',
                    click: () => {
                        mainWindow.webContents.executeJavaScript(`
                            document.querySelectorAll('.tab-button')[1].click();
                        `);
                    }
                },
                { type: 'separator' },
                {
                    label: 'Pantalla Completa',
                    accelerator: 'F11',
                    click: () => {
                        mainWindow.setFullScreen(!mainWindow.isFullScreen());
                    }
                },
                {
                    label: 'Herramientas de Desarrollo',
                    accelerator: 'F12',
                    click: () => {
                        mainWindow.webContents.toggleDevTools();
                    }
                }
            ]
        },
        {
            label: 'Ayuda',
            submenu: [
                {
                    label: 'Acerca de',
                    click: () => {
                        const { dialog } = require('electron');
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'Acerca de Help Desk IT',
                            message: 'Help Desk IT v1.0.0',
                            detail: 'Sistema de Gestión de Tickets de Soporte Técnico\n\nDesarrollado con Node.js, Express, SQLite y Electron',
                            buttons: ['OK']
                        });
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    // Cargar la aplicación desde el servidor local
    mainWindow.loadURL(`http://localhost:${PORT}`);

    // Abrir DevTools automáticamente (solo para desarrollo)
    // mainWindow.webContents.openDevTools();

    // Evento cuando la ventana se cierra
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Mostrar un mensaje cuando la ventana esté lista
    mainWindow.webContents.on('did-finish-load', () => {
        console.log('✅ Aplicación cargada correctamente');
        mainWindow.setTitle('Help Desk IT - Sistema de Tickets');
    });

    // Manejar errores de carga
    mainWindow.webContents.on('did-fail-load', () => {
        console.error('❌ Error al cargar la aplicación');
        setTimeout(() => {
            mainWindow.loadURL(`http://localhost:${PORT}`);
        }, 1000);
    });
}

// Cuando Electron esté listo, iniciar el servidor y crear la ventana
app.whenReady().then(async () => {
    try {
        // Iniciar el servidor primero
        await iniciarServidor();
        
        // Luego crear la ventana
        crearVentana();
        
        console.log('🎉 Aplicación de Help Desk IT iniciada correctamente');
    } catch (error) {
        console.error('❌ Error al iniciar la aplicación:', error);
        app.quit();
    }
});

// Salir cuando todas las ventanas estén cerradas (excepto en macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// En macOS, recrear la ventana cuando se hace clic en el ícono del dock
app.on('activate', () => {
    if (mainWindow === null) {
        crearVentana();
    }
});

// Cerrar el servidor cuando la aplicación se cierre
app.on('before-quit', () => {
    console.log('👋 Cerrando servidor...');
    if (serverProcess) {
        serverProcess.kill();
    }
});

// Manejar errores no capturados
process.on('uncaughtException', (error) => {
    console.error('❌ Error no capturado:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promesa rechazada no manejada:', reason);
});
