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
let zoomFactor = 1; // Globaler Zoom-Faktor

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
  zoomFactor = Math.min(widthRatio, heightRatio);

  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      zoomFactor: zoomFactor
    },
    fullscreen: true,
    autoHideMenuBar: true
  });

  // Event-Listener für Vollbildüberwachung
  win.on('leave-full-screen', () => {
    console.log('Vollbildmodus verlassen. Setze zurück...');
    focusAndFullScreen();
  });

  win.on('resize', () => {
    if (win && !win.isFullScreen()) {
      console.log('Fenstergröße geändert und nicht im Vollbildmodus. Zurücksetzen...');
      focusAndFullScreen();
    }
  });

  win.on('focus', () => {
    console.log('Fenster im Fokus. Stelle Vollbildmodus sicher...');
    focusAndFullScreen();
  });

  // Überwache das Display, wenn es wieder aktiviert wird
  screen.on('display-added', () => {
    console.log('Ein Display wurde hinzugefügt. Stelle Vollbildmodus sicher...');
    focusAndFullScreen();
  });

  screen.on('display-metrics-changed', () => {
    console.log('Display-Metriken geändert. Stelle Vollbildmodus sicher...');
    focusAndFullScreen();
  });

  // Regelmäßige Überprüfung
  setInterval(() => {
    if (win) {
      console.log('Intervall-Check: Nicht im Vollbildmodus. Versuche zurückzusetzen...');
      focusAndFullScreen();
    }
  }, 3000); // Alle 3 Sekunden prüfen

  // Fokus und Vollbildmodus sicherstellen
  function focusAndFullScreen() {
    if (win) {
      win.focus();
      forceFullScreen();
    }
  }

  // Fallback: Vollbild und Zoom-Faktor erneut setzen
  function forceFullScreen() {
    if (win) {
      win.setFullScreen(true);
      const { width, height } = screen.getPrimaryDisplay().workAreaSize;
      win.setBounds({ x: 0, y: 0, width, height });
      console.log('Vollbildmodus erzwungen.');

      // Zoom-Faktor erneut setzen
      win.webContents.setZoomFactor(zoomFactor);
      console.log(`Zoom-Faktor erneut gesetzt: ${zoomFactor}`);
    }
  }

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
