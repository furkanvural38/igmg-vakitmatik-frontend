import React from 'react'
import { useScaleToScreen } from './hooks/useScaleToScreen'

const TARGET_W = 3840
const TARGET_H = 2160

export default function AppShell({ children }: { children: React.ReactNode }) {
    const { scale, offsetX, offsetY } = useScaleToScreen(TARGET_W, TARGET_H)

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: '#000',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    left: offsetX,
                    top: offsetY,
                    width: TARGET_W,
                    height: TARGET_H,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    imageRendering: 'auto',
                }}
            >
                {children}
            </div>
        </div>
    )
}
