import { PrayerTimes, PrayerTimesApiResponse } from "../components/center/types";

import { read, utils } from "xlsx";

interface ExcelPrayerRow {
    "Miladi Tarih": string;
    "Hicri Tarih": string;
    "İmsak": string;
    "Güneş": string;
    "Öğle": string;
    "İkindi": string;
    "Akşam": string;
    "Yatsı": string;
}

export const fetchPrayerTimesFromLocalExcel = async (): Promise<PrayerTimesApiResponse> => {
    try {
        const response = await fetch("../../public/hannoverPrayerTimes.xlsx");
        const arrayBuffer = await response.arrayBuffer(); // ✅ Richtiges Format

        const workbook = read(arrayBuffer, { type: "array" }); // ✅ NICHT 'binary' oder 'string'
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = utils.sheet_to_json<ExcelPrayerRow>(sheet);

        // optional logs:
        console.log("📄 Excel-Zeilen:", rows);

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
            fajr: row["İmsak"] || "",
            sunrise: row["Güneş"] || "",
            dhuhr: row["Öğle"] || "",
            asr: row["İkindi"] || "",
            maghrib: row["Akşam"] || "",
            isha: row["Yatsı"] || "",
            shapeMoonUrl: "",
            astronomicalSunset: "",
            astronomicalSunrise: "",
            hijriDateShort: "",
            hijriDateShortIso8601: null,
            hijriDateLong:row["Hicri Tarih"] || "",
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
            message: "Excel-Daten erfolgreich geladen",
            data: [prayerTimes],
        };
    } catch (err) {
        console.error("❌ Fehler beim Laden der Excel-Datei:", err);
        return {
            success: false,
            message: "Excel konnte nicht gelesen werden",
            data: [],
        };
    }
};
