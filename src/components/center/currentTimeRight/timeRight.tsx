import React, { useState, useEffect } from 'react';
import useCurrentTime from './useCurrentTime'; // Pfad zur useCurrentTime-Datei anpassen
import { getDate } from './getDate'; // Pfad zur dateUtils-Datei anpassen

const TimeRight = () => {
    const currentTime = useCurrentTime(); // Verwende den benutzerdefinierten Hook
    const [dates, setDates] = useState({ hicriDate: '', miladiDate: '' }); // Hole die Datumsinformationen

    useEffect(() => {
        const fetchData = async () => {
            const fetchedDates = await getDate();
            setDates(fetchedDates);
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
            <div className="text-white text-7xl mt-4 text-center">
                <p>{dates.miladiDate}</p>
                <p>{dates.hicriDate}</p>
            </div>
        </div>
    );
};

export default TimeRight;
