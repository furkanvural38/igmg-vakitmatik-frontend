import { useState, useEffect } from "react";
import { PrayerTimes, PrayerTimesApiResponse } from "../center/types.ts";
import { fetchDailyPrayerTime } from "../center/service.tsx";

// Interface für Gebetszeiten
interface Prayer {
    name: string;
    time: string;
}

// Hilfsfunktion: Zeit in Minuten umrechnen
const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

// Methode zur Berechnung der Zeitdifferenz
const calculateTimeDifference = (currentMinutes: number, nextMinutes: number): string => {
    const diffMinutes = (nextMinutes - currentMinutes + 1440) % 1440; // Zyklisch
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}h ${minutes}min`;
};

// Methode zur Berechnung des Prozentsatzes
const calculateProgressPercentage = (currentMinutes: number, startMinutes: number, endMinutes: number): number => {
    const totalSpan = (endMinutes - startMinutes + 1440) % 1440; // Zyklisch
    const elapsed = (currentMinutes - startMinutes + 1440) % 1440; // Zyklisch
    return Math.min(100, Math.max(0, Math.round((elapsed / totalSpan) * 100))); // Begrenze zwischen 0% und 100%
};

// Hilfsfunktion: Aktuelle und nächste Gebetszeit berechnen
const calculateCurrentAndNextPrayer = (
    prayerTimes: PrayerTimes,
    currentTime: Date
): { currentPrayer: Prayer; nextPrayer: Prayer } => {
    const prayerOrder: Array<keyof PrayerTimes> = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    let currentPrayer: Prayer = { name: "", time: "" };
    let nextPrayer: Prayer = { name: "", time: "" };

    for (let i = 0; i < prayerOrder.length; i++) {
        const prayerName = prayerOrder[i];
        const prayerTime = prayerTimes[prayerName];

        if (typeof prayerTime === "string") {
            const prayerMinutes = timeToMinutes(prayerTime);

            if (currentMinutes >= prayerMinutes) {
                currentPrayer = { name: prayerName, time: prayerTime };
                const nextIndex = (i + 1) % prayerOrder.length;
                const nextPrayerName = prayerOrder[nextIndex];
                const nextPrayerTime = prayerTimes[nextPrayerName];

                if (typeof nextPrayerTime === "string") {
                    nextPrayer = {
                        name: nextPrayerName,
                        time: nextPrayerTime,
                    };
                }
            }
        }
    }

    if (!currentPrayer.name) {
        const firstPrayerName = prayerOrder[0];
        const firstPrayerTime = prayerTimes[firstPrayerName];

        currentPrayer = { name: "", time: "Noch kein Gebet gestartet" };
        if (typeof firstPrayerTime === "string") {
            nextPrayer = { name: firstPrayerName, time: firstPrayerTime };
        }
    }

    return { currentPrayer, nextPrayer };
};

const QubePrayerTime = () => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [currentPrayer, setCurrentPrayer] = useState<Prayer | null>(null);
    const [nextPrayer, setNextPrayer] = useState<Prayer | null>(null);
    const [timeDifference, setTimeDifference] = useState<string>("Wird geladen...");
    const [progressPercentage, setProgressPercentage] = useState<number>(0);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response: PrayerTimesApiResponse = await fetchDailyPrayerTime();
                if (response.success && response.data.length > 0) {
                    setPrayerTimes(response.data[0]);
                } else {
                    console.error("Fehler beim Abrufen der Gebetszeiten:", response.message);
                }
            } catch (error) {
                console.error("Fehler beim Laden der Daten:", error);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (prayerTimes) {
                const currentTime = new Date();
                const { currentPrayer, nextPrayer } = calculateCurrentAndNextPrayer(
                    prayerTimes,
                    currentTime
                );
                setCurrentPrayer(currentPrayer);
                setNextPrayer(nextPrayer);

                if (currentPrayer && nextPrayer) {
                    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
                    const startMinutes = timeToMinutes(currentPrayer.time);
                    const endMinutes = timeToMinutes(nextPrayer.time);

                    // Aktualisiere Zeitdifferenz und Prozentsatz
                    setTimeDifference(calculateTimeDifference(currentMinutes, endMinutes));
                    setProgressPercentage(calculateProgressPercentage(currentMinutes, startMinutes, endMinutes));
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [prayerTimes, currentPrayer, nextPrayer]);

    return (
        <div>
            <h1>Qube Gebetszeiten</h1>
            <p>Aktuelle Gebetszeit: {currentPrayer ? `${currentPrayer.name} - ${currentPrayer.time}` : "Wird geladen..."}</p>
            <p>Nächste Gebetszeit: {nextPrayer ? `${nextPrayer.name} - ${nextPrayer.time}` : "Wird geladen..."}</p>
            <p>Zeit bis zur nächsten Gebetszeit: {timeDifference}</p>
            <p>Fortschritt bis zur nächsten Gebetszeit: {progressPercentage}%</p>
        </div>
    );
};

export default QubePrayerTime;
