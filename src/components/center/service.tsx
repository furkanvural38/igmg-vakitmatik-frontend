// service.tsx

import { PrayerTimesApiResponse } from "./types"; // Importiere die Typen

export const fetchDailyPrayerTime = async (): Promise<PrayerTimesApiResponse> => {
    try {
        const response = await fetch('https://igmg-namaz.synology.me:3838/hannover');
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok.');
        }
        const data: PrayerTimesApiResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Es gab ein Problem mit dem Fetch-Vorgang:', error);
        throw error;
    }
};
