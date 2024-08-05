// getDate.tsx
import { fetchDailyPrayerTime } from './service.tsx';
import { PrayerTimes } from './types.ts';

export const getDate = async (): Promise<PrayerTimes | null> => {
    try {
        const response = await fetchDailyPrayerTime();

        if (response.success && response.data.length > 0) {
            return response.data[0];
        } else {
            throw new Error('Ungültige API-Antwort');
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        return null; // Standardwert bei Fehler
    }
};
