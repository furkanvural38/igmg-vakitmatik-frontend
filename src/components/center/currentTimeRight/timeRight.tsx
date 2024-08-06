import useCurrentTime from './useCurrentTime'; // Pfad zur useCurrentTime-Datei anpassen
import { getDate } from '../getDate.tsx';
import {PrayerTimes} from "../types.ts";
import {useEffect, useState} from "react"; // Pfad zur dateUtils-Datei anpassen

const TimeRight = () => {
    const currentTime = useCurrentTime(); // Verwende den benutzerdefinierten Hook
    const [dates, setDates] = useState({ hicriDate: '', miladiDate: '' }); // Hole die Datumsinformationen

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
        <div className="flex flex-col items-center justify-center w-full h-full bg-transparent border-7 border-white rounded-2xl p-4">
            {/* Uhrzeit */}
            <span className="text-white text-180xl font-bold">
                {currentTime}
            </span>
            {/* Datum */}
            <div className="text-white text-7xl mt-4 text-center font-bold">
                <p className="mb-7">{dates.miladiDate}</p>
                <p>{dates.hicriDate}</p>
            </div>
        </div>
    );
};

export default TimeRight;
