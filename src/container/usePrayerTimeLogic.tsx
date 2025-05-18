// usePrayerTimeLogic.ts
import { useEffect, useState } from "react";
import { PrayerTimes } from "../components/center/types";

type PrayerKey = "fajr" | "sunrise" | "dhuhr" | "asr" | "maghrib" | "isha";

const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

const calculateTimeDifference = (current: number, next: number): React.ReactNode => {
    const diff = (next - current + 1440) % 1440;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return (
        <span>
            <span className="font-semibold">{hours}</span>h{" "}
            <span className="font-semibold">{minutes}</span>min
        </span>
    );
};

const calculateProgress = (current: number, start: number, end: number): number => {
    const total = (end - start + 1440) % 1440;
    const passed = (current - start + 1440) % 1440;
    return Math.min(100, Math.max(0, Math.round((passed / total) * 100)));
};

export const usePrayerTimeLogic = (prayerTimes: PrayerTimes | null) => {
    const [currentPrayer, setCurrentPrayer] = useState<PrayerKey | null>(null);
    const [timeDifference, setTimeDifference] = useState<React.ReactNode>("–");
    const [progressPercentage, setProgressPercentage] = useState<number>(0);

    useEffect(() => {
        if (!prayerTimes) return;

        const keys: PrayerKey[] = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];
        const interval = setInterval(() => {
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            const times = keys.map((key) => ({
                name: key,
                minutes: timeToMinutes(prayerTimes[key])
            }));

            let current = times.findIndex((time, index) =>
                currentMinutes >= time.minutes &&
                currentMinutes < times[(index + 1) % times.length].minutes
            );

            if (current === -1) current = times.length - 1;

            const currentKey = keys[current];
            const start = times[current].minutes;
            const end = times[(current + 1) % times.length].minutes;

            setCurrentPrayer(currentKey);
            setTimeDifference(calculateTimeDifference(currentMinutes, end));
            setProgressPercentage(calculateProgress(currentMinutes, start, end));
        }, 1000);

        return () => clearInterval(interval);
    }, [prayerTimes]);

    return { currentPrayer, timeDifference, progressPercentage };
};
