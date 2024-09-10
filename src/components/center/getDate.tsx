// getDate.tsx
import { fetchDailyPrayerTime } from './service.tsx';
import { PrayerTimes } from './types.ts';

export const getDate = async (): Promise<PrayerTimes> => {
    try {
        const response = await fetchDailyPrayerTime();

        if (!response.success) {
            throw new Error('Ungültige API-Antwort');

        }
        return response.data[0];

    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        throw error;
    }
};
