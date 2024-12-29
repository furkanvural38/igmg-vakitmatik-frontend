import { app, BrowserWindow, ipcMain, screen } from 'electron';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, '..');

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

let win: BrowserWindow | null;
let zoomFactor = 1;

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const targetResolution = { width: 3840, height: 2160 };
  const currentResolution = primaryDisplay.size;

  const widthRatio = currentResolution.width / targetResolution.width;
  const heightRatio = currentResolution.height / targetResolution.height;

  zoomFactor = Math.min(widthRatio, heightRatio);

  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      zoomFactor: zoomFactor,
    },
    fullscreen: true,
    autoHideMenuBar: true,
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

  screen.on('display-added', () => {
    console.log('Ein Display wurde hinzugefügt. Stelle Vollbildmodus sicher...');
    focusAndFullScreen();
  });

  screen.on('display-metrics-changed', () => {
    console.log('Display-Metriken geändert. Stelle Vollbildmodus sicher...');
    focusAndFullScreen();
  });

  screen.on('display-removed', () => {
    console.log('Ein Display wurde entfernt. Stelle Vollbildmodus sicher...');
    focusAndFullScreen();
  });

  // Regelmäßige Überprüfung
  setInterval(() => {
    if (win && !win.isFullScreen()) {
      console.log('Intervall-Check: Nicht im Vollbildmodus. Versuche zurückzusetzen...');
      focusAndFullScreen();
    }
  }, 3000);

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
      if (!win.isFullScreen()) {
        win.setFullScreen(true);
      }
      const { width, height } = screen.getPrimaryDisplay().workAreaSize;
      win.setBounds({ x: 0, y: 0, width, height });
      win.webContents.setZoomFactor(zoomFactor);
      console.log(`Vollbildmodus erzwungen und Zoom-Faktor gesetzt: ${zoomFactor}`);
    }
  }

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }

  // Direkt nach Erstellen sicherstellen
  setTimeout(() => {
    focusAndFullScreen();
  }, 1000);
}

// IPC-Handler für Vollbild beenden
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

// Stelle beim Aktivieren sicher, dass das Fenster erstellt wird
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// App starten
app.whenReady().then(() => {
  createWindow();
});
