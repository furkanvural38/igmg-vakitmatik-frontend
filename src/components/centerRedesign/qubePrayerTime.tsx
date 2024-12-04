import { useState, useEffect } from "react";
import { PrayerTimes, PrayerTimesApiResponse } from "../center/types.ts";
import { fetchDailyPrayerTime } from "../center/service.tsx";
import useChangeTitle from "../center/prayerTimeAndClockCenter/useChangeTitle.tsx";

// Hilfsfunktion: Zeit in Minuten umrechnen
const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

// Methode zur Berechnung der Zeitdifferenz
const calculateTimeDifference = (currentMinutes: number, nextMinutes: number): JSX.Element => {
    const diffMinutes = (nextMinutes - currentMinutes + 1440) % 1440; // Zyklisch
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return (
        <span>
            <span className="font-bold">{hours}</span>
            <span>h </span>
            <span className="font-bold">{minutes}</span>
            <span>min</span>
        </span>
    );
};


// Methode zur Berechnung des Prozentsatzes
const calculateProgressPercentage = (currentMinutes: number, startMinutes: number, endMinutes: number): number => {
    const totalSpan = (endMinutes - startMinutes + 1440) % 1440; // Zyklisch
    const elapsed = (currentMinutes - startMinutes + 1440) % 1440; // Zyklisch
    return Math.min(100, Math.max(0, Math.round((elapsed / totalSpan) * 100))); // Begrenze zwischen 0% und 100%
};

// Hauptkomponente
const QubePrayerTime = () => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [currentPrayer, setCurrentPrayer] = useState<string | null>(null);
    const [nextPrayer, setNextPrayer] = useState<string | null>(null);
    const [timeDifference, setTimeDifference] = useState<React.ReactNode>("Wird geladen...");
    const [progressPercentage, setProgressPercentage] = useState<number>(0);
    const titles = useChangeTitle();

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
                const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

                const keys = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"] as const;
                const times = keys.map((key) => ({
                    name: key,
                    minutes: timeToMinutes(prayerTimes[key]),
                }));

                // Finde die aktuelle und nächste Gebetszeit
                let current = times.findIndex(
                    (time, index) =>
                        currentMinutes >= time.minutes &&
                        currentMinutes < times[(index + 1) % times.length].minutes
                );

                if (current === -1) current = times.length - 1;

                setCurrentPrayer(keys[current]);
                setNextPrayer(keys[(current + 1) % times.length]);

                const startMinutes = times[current].minutes;
                const endMinutes = times[(current + 1) % times.length].minutes;

                // Aktualisiere Zeitdifferenz und Prozentsatz
                setTimeDifference(calculateTimeDifference(currentMinutes, endMinutes));
                setProgressPercentage(calculateProgressPercentage(currentMinutes, startMinutes, endMinutes));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [prayerTimes]);

    const prayerLabels: { [key: string]: string } = {
        fajr: "İmsak",
        sunrise: "Güneş",
        dhuhr: "Öğle",
        asr: "İkindi",
        maghrib: "Akşam",
        isha: "Yatsı",
    };

    return (
        <div className="flex justify-center items-center p-12 space-x-12">
            {prayerTimes &&
                Object.entries(prayerLabels).map(([key, label]) => {
                    const isActive = key === currentPrayer;
                    return (
                        <div key={key} className="relative">
                            {/* Progressbar und verbleibende Zeit außerhalb der Box */}
                            {isActive && (
                                <div className="absolute -top-36 w-box">
                                    <div className="text-center text-white mb-4 text-7xl">{timeDifference}</div>
                                    <div className="h-8 relative h-6 bg-[#00a480] w-full rounded-3xl overflow-hidden">
                                        <div
                                            className="bg-[#4b4b4b] h-full"
                                            style={{ width: `${progressPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                            {/* Box für Gebetszeit */}
                            <div
                                className={`w-box h-box flex flex-col justify-center items-center rounded-3xl shadow-lg ${
                                    isActive ? "bg-[#049c74]" : "bg-[#343434]"
                                }`}
                            >
                                <span className="text-[#a7a7a7] text-6xl mb-4">{titles[key]}</span>
                                <span className="text-[#a7a7a7] text-9xl font-bold">{label}</span>
                                <span
                                    className="text-[#a7a7a7] text-8xl font-bold mt-4">{prayerTimes[key as keyof PrayerTimes] || "00:00"}</span>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default QubePrayerTime;
