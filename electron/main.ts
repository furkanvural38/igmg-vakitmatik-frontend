import { app, BrowserWindow, ipcMain, screen } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();

  // Zielauflösung (4K)
  const targetResolution = { width: 3840, height: 2160 };

  // Aktuelle Bildschirmauflösung
  const currentResolution = primaryDisplay.size;

  // Berechnung des Zoom-Faktors
  const widthRatio = currentResolution.width / targetResolution.width;
  const heightRatio = currentResolution.height / targetResolution.height;

  // Nimm den kleineren Faktor, um Verzerrungen zu vermeiden
  const zoomFactor = Math.min(widthRatio, heightRatio);

  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      zoomFactor: zoomFactor
    },
    fullscreen: true,
    autoHideMenuBar: true
  });

  // Event-Listener, um den Vollbildmodus zu erzwingen
  win.on('leave-full-screen', () => {
    console.log('Vollbildmodus verlassen. Setze zurück...');
    win?.setFullScreen(true);
  });

  win.on('resize', () => {
    if (win && !win.isFullScreen()) {
      console.log('Fenstergröße geändert und nicht im Vollbildmodus. Zurücksetzen...');
      win.setFullScreen(true);
    }
  });

  // Überprüfe regelmäßig den Vollbildmodus
  setInterval(() => {
    if (win && !win.isFullScreen()) {
      console.log('Intervall-Check: Nicht im Vollbildmodus. Versuche zurückzusetzen...');
      win.setFullScreen(true);
    }
  }, 3000); // Alle 3 Sekunden prüfen

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }
}

ipcMain.on('exit-fullscreen', () => {
  if (win?.isFullScreen()) {
    win.setFullScreen(false);
  }
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
