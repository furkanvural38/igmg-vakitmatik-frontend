import { useState, useEffect } from 'react';

// Hilfsfunktion zum Formatieren der aktuellen Uhrzeit (24h)
const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
};

const useCurrentTime = () => {
    const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return currentTime;
};

export default useCurrentTime;
