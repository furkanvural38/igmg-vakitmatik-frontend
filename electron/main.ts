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

  win.webContents.openDevTools({ mode: "right" }); // oder "bottom", "undocked", "detach"

  // Sicherstellen, dass der Vollbildmodus immer aktiv bleibt
  function focusAndFullScreen() {
    if (win) {
      win.focus();
      forceFullScreen();
    }
  }

  function forceFullScreen() {
    if (win) {
      console.log('Versuche Vollbildmodus zu erzwingen...');

      // Stelle sicher, dass das Fenster im Vollbildmodus ist
      if (!win.isFullScreen()) {
        win.setFullScreen(true);
      }

      // Nutze die exakte Bildschirmgröße (nicht workAreaSize!)
      const { width, height } = screen.getPrimaryDisplay().size;

      // Erweitere das Fenster auf die volle Bildschirmgröße
      win.setBounds({ x: 0, y: 0, width, height });
      console.log(`Vollbildgröße gesetzt auf: Breite=${width}, Höhe=${height}`);

      // Wende den Zoom-Faktor an
      win.webContents.setZoomFactor(zoomFactor);
      console.log(`Zoom-Faktor erneut gesetzt: ${zoomFactor}`);

      // Erzwinge eine kurze Verzögerung zur Stabilisierung
      setTimeout(() => {
        win?.setBounds({ x: 0, y: 0, width, height });
        console.log('Vollbildmodus und Größe endgültig erzwungen.');
      }, 500); // 500ms Verzögerung
    }
  }


  // Event-Handler für Display-Änderungen
  screen.on('display-added', () => {
    console.log('Ein Display wurde hinzugefügt. Erzwinge Vollbildmodus...');
    setTimeout(() => focusAndFullScreen(), 1000); // Kurze Verzögerung für Stabilität
  });

  screen.on('display-metrics-changed', () => {
    console.log('Display-Metriken geändert. Erzwinge Vollbildmodus...');
    setTimeout(() => focusAndFullScreen(), 1000);
  });

  screen.on('display-removed', () => {
    console.log('Ein Display wurde entfernt. Erzwinge Vollbildmodus...');
    setTimeout(() => focusAndFullScreen(), 1000);
  });

  // Prüfe regelmäßig den Vollbildmodus
  setInterval(() => {
    if (win && (!win.isFullScreen() || !win.isFocused())) {
      console.log('Intervall-Check: Nicht im Vollbildmodus oder nicht fokussiert. Erzwinge...');
      focusAndFullScreen();
    }
  }, 2000);

  // Fenster-Ereignisse
  win.on('leave-full-screen', () => {
    console.log('Vollbildmodus verlassen. Erzwinge erneut...');
    focusAndFullScreen();
  });

  win.on('focus', () => {
    console.log('Fenster im Fokus. Erzwinge Vollbildmodus...');
    focusAndFullScreen();
  });

  win.on('resize', () => {
    if (win && !win.isFullScreen()) {
      console.log('Fenstergröße geändert und nicht im Vollbildmodus. Erzwinge...');
      focusAndFullScreen();
    }
  });

  // Direkt nach Laden des Fensters sicherstellen
  win.webContents.on('did-finish-load', () => {
    console.log('Fenster geladen. Erzwinge Vollbildmodus...');
    setTimeout(() => focusAndFullScreen(), 1000);
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }

  // Start-Check nach Fenster-Erstellung
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

// App-Ereignisse
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

// App starten
app.whenReady().then(() => {
  createWindow();
});
