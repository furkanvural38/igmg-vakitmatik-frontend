import useCurrentTime from './useCurrentTime'; // Pfad zur useCurrentTime-Datei anpassen
import { getDate } from '../getDate.tsx';
import {PrayerTimes} from "../types.ts";
import {useEffect, useState} from "react";

const TimeRight = () => {
    const currentTime = useCurrentTime(); // Verwende den benutzerdefinierten Hook
    const [dates, setDates] = useState({ hicriDate: '', miladiDate: '' }); // Hole die Datumsinformationen


    const loadData = async () => {
        try {
            const fetchedDates = await getDate();
            if (JSON.stringify(fetchedDates) !== JSON.stringify(dates)) {
                const { gregorianDateLong, hijriDateLong } = fetchedDates;
                setDates({ hicriDate: hijriDateLong, miladiDate: gregorianDateLong });
            }
        } catch (error) {
            console.error('Fehler beim Laden der Daten:', error);
        }
    };

    useEffect(() => {
        loadData();

        const interval = setInterval(() => {
            loadData();
        }, 60000);

        return () => clearInterval(interval);
    }, [dates]);


    useEffect(() => {
        const fetchData = async () => {
            const fetchedDates: PrayerTimes | null = await getDate();
            if (fetchedDates) {
                const { gregorianDateLong, hijriDateLong } = fetchedDates;
                setDates({ hicriDate: hijriDateLong, miladiDate: gregorianDateLong });
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-transparent border-7 border-white rounded-header p-4">
            {/* Uhrzeit */}
            <span className="text-white text-180xl font-bold">
                {currentTime}
            </span>
            {/* Datum */}
            <div className="text-white text-9xl mt-4 text-center font-bold">
                <p className="mb-7">{dates.miladiDate}</p>
                <p>{dates.hicriDate}</p>
            </div>
        </div>
    );
};

export default TimeRight;
