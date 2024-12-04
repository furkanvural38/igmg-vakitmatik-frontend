import { useState, useEffect } from "react";
import useCurrentTime from "../center/currentTimeRight/useCurrentTime.tsx" // Dein `useCurrentTime`-Hook
import { PrayerTimes, PrayerTimesApiResponse } from "../center/types.ts";
import { fetchDailyPrayerTime } from "../center/service.tsx";
import useChangeTitle from "../center/prayerTimeAndClockCenter/useChangeTitle.tsx";
import { FaMoon } from "react-icons/fa";
import { HiOutlineSun } from "react-icons/hi";
import { AiFillSun } from "react-icons/ai";
import { PiSunHorizonFill, PiSunHorizonLight } from "react-icons/pi";
import { LuCloudSun } from "react-icons/lu";
import DateBoxes from "./dateBoxes.tsx";
import CurrentTimeDisplay from "./currentTimeDisplay.tsx";

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
    const currentTime = useCurrentTime(); // Aktuelle Zeit vom Hook
    const titles = useChangeTitle();

    const icons: { [key: string]: JSX.Element } = {
        fajr: <PiSunHorizonLight className="text-9xl mb-4" />,
        sunrise: <HiOutlineSun className="text-9xl mb-4" />,
        dhuhr: <AiFillSun className="text-9xl mb-4" />,
        asr: <LuCloudSun className="text-9xl mb-4" />,
        maghrib: <PiSunHorizonFill className="text-9xl mb-4" />,
        isha: <FaMoon className="text-9xl mb-4" />,
    };

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

    const [hours, minutes, seconds] = currentTime.split(":");

    return (
        <div className="flex flex-col items-center p-12 space-y-64 relative">
            {/* Aktuelles Datum (Sonnen & Mond Kalender) */}
            <DateBoxes prayerTimes={prayerTimes} />

            {/* Aktuelle Uhrzeit */}
            <CurrentTimeDisplay hours={hours} minutes={minutes} seconds={seconds} />

            {/* Gebetszeiten */}
            <div className="flex justify-center items-center space-x-12">
                {prayerTimes &&
                    Object.entries(prayerLabels).map(([key, label]) => {
                        const isActive = key === currentPrayer;
                        return (
                            <div key={key} className="relative">
                                {isActive && (
                                    <div className="absolute -top-44 w-box">
                                        <div className="text-center text-white mb-4 text-8xl">{timeDifference}</div>
                                        <div className="h-8 relative bg-[#009972] w-full rounded-3xl overflow-hidden">
                                            <div
                                                className="bg-[#4b4b4b] h-full"
                                                style={{ width: `${progressPercentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                                <div
                                    className={`w-box h-box flex flex-col justify-center items-center rounded-3xl shadow-lg ${
                                        isActive ? "bg-[#009972]" : "bg-[#343434]"
                                    }`}
                                >
                                    <div className={`text-8xl mb-4 ${isActive ? "text-white" : "text-[#a7a7a7]"}`}>
                                        {icons[key]}
                                    </div>
                                    <span className={`text-6xl mb-4 ${isActive ? "text-white" : "text-[#a7a7a7]"}`}>
                                        {titles[key]}
                                    </span>
                                    <span className={`text-9xl font-bold ${isActive ? "text-white" : "text-[#a7a7a7]"}`}>
                                        {label}
                                    </span>
                                    <span className={`text-9xl font-bold mt-4 ${isActive ? "text-white" : "text-[#a7a7a7]"}`}>
                                        {prayerTimes[key as keyof PrayerTimes] || "00:00"}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );

};

export default QubePrayerTime;
