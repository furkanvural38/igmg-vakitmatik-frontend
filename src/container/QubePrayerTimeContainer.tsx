import { useEffect, useRef, useState } from "react";
import { PrayerTimes, PrayerTimesApiResponse } from "../components/center/types";
import { fetchDailyPrayerTime } from "../components/center/service";
import useChangeTitle from "../components/center/prayerTimeAndClockCenter/useChangeTitle";
import useCurrentTime from "../components/center/currentTimeRight/useCurrentTime";
import QubePrayerTimeView from "./QubePrayerTimeView";
import { usePrayerTimeLogic } from "./usePrayerTimeLogic";

const QubePrayerTimeContainer = () => {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [error, setError] = useState<string | null>(null);
    const currentTime = useCurrentTime();
    const titles = useChangeTitle();
    const currentDayRef = useRef<number>(new Date().getDate());

    // Gebetszeiten laden
    const loadData = async () => {
        try {
            const response: PrayerTimesApiResponse = await fetchDailyPrayerTime();

            if (response.success && response.data.length > 0) {
                setPrayerTimes(response.data[0]);
                setError(null);
            } else {
                throw new Error("Keine gültigen Gebetszeiten erhalten.");
            }
        } catch (err: unknown) {
            console.error("Fehler beim Laden der Gebetszeiten:", err);
        }
    };

    // Initiale Daten laden
    useEffect(() => {
        loadData();
    }, []);

    // Tageswechsel erkennen
    useEffect(() => {
        const interval = setInterval(() => {
            const today = new Date().getDate();
            if (today !== currentDayRef.current) {
                currentDayRef.current = today;
                loadData();
            }
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    // Gebetslogik verwenden (nur wenn Daten vorhanden sind)
    const {
        currentPrayer,
        timeDifference,
        progressPercentage
    } = usePrayerTimeLogic(prayerTimes);

    // Fehleranzeige
    if (error) {
        return (
            <div style={{ color: "white", padding: "2rem" }}>
                Fehler beim Laden der Gebetszeiten: {error}
            </div>
        );
    }

    // Ladeanzeige
    if (!prayerTimes) {
        return (
            <div style={{ color: "white", padding: "2rem" }}>
                Lade Gebetszeiten…
            </div>
        );
    }

    // Haupt-Render
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
