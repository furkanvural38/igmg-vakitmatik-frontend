import { readFile, utils } from "xlsx";
import path from "path";
import { PrayerTimes, PrayerTimesApiResponse } from "../components/center/types";



interface ExcelPrayerRow {
    "Miladi Tarih": string;
    "İmsak": string;
    "Güneş": string;
    "Öğle": string;
    "İkindi": string;
    "Akşam": string;
    "Yatsı": string;
}


// Funktion: Lokale Excel-Datei laden
export const fetchPrayerTimesFromLocalExcel = (): PrayerTimesApiResponse => {
    try {
        const filePath = path.resolve(__dirname, "../assets/hannoverPrayerTimes.xlsx");
        const workbook = readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = utils.sheet_to_json<ExcelPrayerRow>(sheet);


        const today = new Date();
        const formatter = new Intl.DateTimeFormat("tr-TR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });

        const todayString = formatter.format(today);
        const row = rows.find((r) => r["Miladi Tarih"]?.startsWith(todayString));


        if (!row) {
            throw new Error("Kein Eintrag für heutigen Tag in der Excel-Datei gefunden.");
        }

        const prayerTimes: PrayerTimes = {
            shapeMoonUrl: "",
            fajr: row["İmsak"] || "",
            sunrise: row["Güneş"] || "",
            dhuhr: row["Öğle"] || "",
            asr: row["İkindi"] || "",
            maghrib: row["Akşam"] || "",
            isha: row["Yatsı"] || "",
            astronomicalSunset: "",
            astronomicalSunrise: "",
            hijriDateShort: "",
            hijriDateShortIso8601: null,
            hijriDateLong: "",
            hijriDateLongIso8601: null,
            qiblaTime: "",
            gregorianDateShort: "",
            gregorianDateShortIso8601: "",
            gregorianDateLong: row["Miladi Tarih"] || "",
            gregorianDateLongIso8601: "",
            greenwichMeanTimeZone: 0,
        };

        return {
            success: true,
            message: "Lokale Excel-Daten geladen.",
            data: [prayerTimes],
        };
    } catch (err) {
        console.error("Fehler beim lokalen Excel-Fallback:", err);
        return {
            success: false,
            message: "Fehler beim Einlesen der lokalen Datei",
            data: [],
        };
    }
};
