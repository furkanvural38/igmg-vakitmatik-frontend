import { useState, useEffect } from 'react';

// Hilfsfunktion zum Formatieren der aktuellen Uhrzeit
const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString(); // Uhrzeit formatieren
};

const useCurrentTime = () => {
    const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 1000); // Aktualisiere jede Sekunde

        return () => clearInterval(timer); // Aufräumen des Timers
    }, []);

    return currentTime;
};

export default useCurrentTime;
