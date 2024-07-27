export interface PrayerTimes {
    shapeMoonUrl: string;
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    astronomicalSunset: string;
    astronomicalSunrise: string;
    hijriDateShort: string;
    hijriDateShortIso8601: string | null;
    hijriDateLong: string;
    hijriDateLongIso8601: string | null;
    qiblaTime: string;
    gregorianDateShort: string;
    gregorianDateShortIso8601: string;
    gregorianDateLong: string;
    gregorianDateLongIso8601: string;
    greenwichMeanTimeZone: number;
}

// Neue Schnittstelle für das Gebetszeiten-API-Antwort
export interface PrayerTimesApiResponse {
    data: PrayerTimes[];
    success: boolean;
    message: string | null;
}