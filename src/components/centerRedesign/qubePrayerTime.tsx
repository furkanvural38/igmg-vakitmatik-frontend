import { useState, useEffect, useCallback } from "react";

// Interface für Gebetszeiten
interface PrayerTimes {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
}

// Hilfsfunktion: Zeit in Minuten umrechnen
const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

// Hilfsfunktion: Aktuelle und nächste Gebetszeit berechnen
const calculateCurrentAndNextPrayer = (
    prayerTimes: PrayerTimes,
    currentTime: Date
): { currentPrayer: string | null; nextPrayer: string | null } => {
    const prayerOrder = [
        { name: "Fajr", time: prayerTimes.fajr },
        { name: "Sunrise", time: prayerTimes.sunrise },
        { name: "Dhuhr", time: prayerTimes.dhuhr },
        { name: "Asr", time: prayerTimes.asr },
        { name: "Maghrib", time: prayerTimes.maghrib },
        { name: "Isha", time: prayerTimes.isha },
    ];

    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    for (let i = 0; i < prayerOrder.length; i++) {
        const currentPrayer = prayerOrder[i];
        const nextPrayer = prayerOrder[(i + 1) % prayerOrder.length]; // Zyklisch iterieren

        const prayerStart = timeToMinutes(currentPrayer.time);
        const nextPrayerStart = timeToMinutes(nextPrayer.time);

        // Wenn die aktuelle Zeit zwischen der aktuellen und der nächsten Gebetszeit liegt
        if (currentMinutes >= prayerStart && currentMinutes < nextPrayerStart) {
            return { currentPrayer: currentPrayer.name, nextPrayer: nextPrayer.name };
        }
    }

    // Falls es zwischen Isha und Fajr ist (Ende des Tages)
    return { currentPrayer: null, nextPrayer: prayerOrder[0].name };
};

const QubePrayerTime = () => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [currentPrayerTime, setCurrentPrayerTime] = useState<string | null>(null);
    const [nextPrayerTime, setNextPrayerTime] = useState<string | null>(null);

    // Funktion zur Aktualisierung der Gebetszeiten
    const updatePrayerTimes = useCallback(() => {
        if (!prayerTimes) return;

        const now = new Date();
        const { currentPrayer, nextPrayer } = calculateCurrentAndNextPrayer(prayerTimes, now);

        setCurrentPrayerTime(currentPrayer);
        setNextPrayerTime(nextPrayer);
    }, [prayerTimes]);

    // Gebetszeiten initial laden
    useEffect(() => {
        const fetchPrayerTimes = async () => {
            try {
                const testData: PrayerTimes = {
                    fajr: "05:23",
                    sunrise: "06:34",
                    dhuhr: "09:14",
                    asr: "17:01",
                    maghrib: "20:05",
                    isha: "21:46",
                };
                setPrayerTimes(testData);
            } catch (error) {
                console.error("Fehler beim Laden der Gebetszeiten:", error);
            }
        };

        fetchPrayerTimes();
    }, []);

    // Aktualisiere die Gebetszeiten alle 60 Sekunden
    useEffect(() => {
        if (!prayerTimes) return;

        updatePrayerTimes(); // Direkt initiales Update

        const interval = setInterval(updatePrayerTimes, 60 * 1000); // Aktualisierung alle 60 Sekunden
        return () => clearInterval(interval); // Cleanup bei Komponentendemontage
    }, [prayerTimes, updatePrayerTimes]);

    return (
        <div>
            <h1>Qube Gebetszeiten</h1>
            <p>Aktuelle Gebetszeit: {currentPrayerTime || "Wird geladen..."}</p>
            <p>Nächste Gebetszeit: {nextPrayerTime || "Wird geladen..."}</p>
        </div>
    );
};

export default QubePrayerTime;
