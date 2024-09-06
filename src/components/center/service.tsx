// service.tsx
/*
import { PrayerTimesApiResponse } from "./types"; // Importiere die Typen

export const fetchDailyPrayerTime = async (): Promise<PrayerTimesApiResponse> => {
    try {
        const response = await fetch('http://localhost:8080/getPrayerTime');
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok.');
        }
        const data: PrayerTimesApiResponse = await response.json().then();
        return data;
    } catch (error) {
        console.error('Es gab ein Problem mit dem Fetch-Vorgang:', error);
        throw error;
    }
};

 */


import { PrayerTimesApiResponse } from "./types"; // Importiere die Typen

export const fetchDailyPrayerTime = async (): Promise<PrayerTimesApiResponse> => {
    try {
        // Beispiel-Daten
        const data: PrayerTimesApiResponse = {
            data: [
                {
                    shapeMoonUrl: "https://awqatsalah.diyanet.gov.tr/images/d7.gif",
                    fajr: "04:36",
                    sunrise: "06:34",
                    dhuhr: "13:24",
                    asr: "17:01",
                    maghrib: "20:05",
                    isha: "21:46",
                    astronomicalSunset: "21:21",
                    astronomicalSunrise: "05:34",
                    hijriDateShort: "3.3.1446",
                    hijriDateShortIso8601: null,
                    hijriDateLong: "3 Rebiulevvel 1446",
                    hijriDateLongIso8601: null,
                    qiblaTime: "11:22",
                    gregorianDateShort: "06.09.2024",
                    gregorianDateShortIso8601: "06.09.2024",
                    gregorianDateLong: "06 Eylül 2024 Cuma",
                    gregorianDateLongIso8601: "2024-07-27T00:00:00.0000000+03:00",
                    greenwichMeanTimeZone: 2
                }
            ],
            success: true,
            message: null
        };

        return data;
    } catch (error) {
        console.error('Es gab ein Problem mit dem Fetch-Vorgang:', error);
        throw error; // Optional: Du kannst eine spezifischere Fehlerbehandlung hinzufügen
    }
};

