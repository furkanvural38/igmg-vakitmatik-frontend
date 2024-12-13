// service.tsx

import { DailyContentApiResponse } from "./types"; // Importiere die Typen

export const fetchDailyContent = async (): Promise<DailyContentApiResponse> => {
    try {
        const response = await fetch('https://igmg-namaz.synology.me:3838/getIslamContent');
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok.');
        }
        const data: DailyContentApiResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Es gab ein Problem mit dem Fetch-Vorgang:', error);
        throw error;
    }
};
