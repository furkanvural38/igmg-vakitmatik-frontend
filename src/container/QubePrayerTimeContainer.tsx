// QubePrayerTimeContainer.tsx
import React, { useEffect, useState } from "react";
import { PrayerTimes, PrayerTimesApiResponse } from "../components/center/types.ts";
import { fetchDailyPrayerTime } from "../components/center/service.tsx";
import useChangeTitle from "../components/center/prayerTimeAndClockCenter/useChangeTitle";
import useCurrentTime from "../components/center/currentTimeRight/useCurrentTime";
import QubePrayerTimeView from "./QubePrayerTimeView";

const QubePrayerTimeContainer = () => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [currentPrayer, setCurrentPrayer] = useState<string | null>(null);
    const [timeDifference, setTimeDifference] = useState<React.ReactNode>("Wird geladen...");
    const [progressPercentage, setProgressPercentage] = useState<number>(0);
    const currentTime = useCurrentTime();
    const titles = useChangeTitle();
    const [currentDay, setCurrentDay] = useState<number>(new Date().getDate());

    const loadData = async () => {
        try {
            const response: PrayerTimesApiResponse = await fetchDailyPrayerTime();
            if (response.success && response.data.length > 0) {
                setPrayerTimes(response.data[0]);
            }
        } catch (error) {
            console.error("Fehler beim Laden der Daten:", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const today = now.getDate();

            if (today !== currentDay) {
                setCurrentDay(today); // Neuer Tag → aktualisiere State
                loadData();           // Lade Gebetszeiten neu
            }
        }, 60000); // Alle Minute prüfen

        return () => clearInterval(interval);
    }, [currentDay]);


    const timeToMinutes = (time: string): number => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    const calculateTimeDifference = (currentMinutes: number, nextMinutes: number): JSX.Element => {
        const diffMinutes = (nextMinutes - currentMinutes + 1440) % 1440;
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;

        return (
            <span>
                <span className="font-semibold">{hours}</span>
                <span>h </span>
                <span className="font-semibold">{minutes}</span>
                <span>min</span>
            </span>
        );
    };

    const calculateProgressPercentage = (currentMinutes: number, startMinutes: number, endMinutes: number): number => {
        const totalSpan = (endMinutes - startMinutes + 1440) % 1440;
        const elapsed = (currentMinutes - startMinutes + 1440) % 1440;
        return Math.min(100, Math.max(0, Math.round((elapsed / totalSpan) * 100)));
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const response: PrayerTimesApiResponse = await fetchDailyPrayerTime();
                if (response.success && response.data.length > 0) {
                    setPrayerTimes(response.data[0]);
                }
            } catch (error) {
                console.error("Fehler beim Laden der Daten:", error);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            if (prayerTimes) {
                const keys = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"] as const;
                const times = keys.map((key) => ({ name: key, minutes: timeToMinutes(prayerTimes[key]) }));

                let current = times.findIndex(
                    (time, index) =>
                        currentMinutes >= time.minutes &&
                        currentMinutes < times[(index + 1) % times.length].minutes
                );

                if (current === -1) current = times.length - 1;

                setCurrentPrayer(keys[current]);
                const startMinutes = times[current].minutes;
                const endMinutes = times[(current + 1) % times.length].minutes;

                setTimeDifference(calculateTimeDifference(currentMinutes, endMinutes));
                setProgressPercentage(calculateProgressPercentage(currentMinutes, startMinutes, endMinutes));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [prayerTimes]);

    return (
        <QubePrayerTimeView
            prayerTimes={prayerTimes}
            currentPrayer={currentPrayer}
            currentTime={currentTime}
            timeDifference={timeDifference}
            progressPercentage={progressPercentage}
            titles={titles}
        />
    );
};

export default QubePrayerTimeContainer;
