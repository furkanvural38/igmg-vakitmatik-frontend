import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../../App.tsx'
import '../../index.css'
import AppShell from "../../AppShell.tsx";

declare const __WEB__: boolean  // kommt aus vite.config define

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppShell>
            <App />
        </AppShell>
    </React.StrictMode>
)

// Electron-IPC nur in Desktop ausführen, im Web überspringen:
if (typeof __WEB__ === 'undefined' || !__WEB__) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyWindow = window as any
    anyWindow?.ipcRenderer?.on?.('main-process-message', (_event: unknown, message: unknown) => {
        console.log(message)
    })
}