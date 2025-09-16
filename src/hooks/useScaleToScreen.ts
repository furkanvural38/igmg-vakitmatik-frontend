import { useEffect, useState } from 'react'

/** Skaliert eine Zielfläche (z. B. 3840x2160) maximal in den Viewport und zentriert sie. */
export function useScaleToScreen(targetWidth = 3840, targetHeight = 2160) {
    const [scale, setScale] = useState(1)
    const [viewport, setViewport] = useState({ w: 0, h: 0 })

    useEffect(() => {
        const calc = () => {
            const w = window.innerWidth
            const h = window.innerHeight
            setViewport({ w, h })
            const widthRatio = w / targetWidth
            const heightRatio = h / targetHeight
            setScale(Math.min(widthRatio, heightRatio))
        }
        calc()
        window.addEventListener('resize', calc)
        window.addEventListener('orientationchange', calc)
        return () => {
            window.removeEventListener('resize', calc)
            window.removeEventListener('orientationchange', calc)
        }
    }, [targetWidth, targetHeight])

    const offsetX = Math.max(0, (viewport.w - targetWidth * scale) / 2)
    const offsetY = Math.max(0, (viewport.h - targetHeight * scale) / 2)

    return { scale, offsetX, offsetY }
}
