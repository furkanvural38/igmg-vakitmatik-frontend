// service.tsx
/*
import { ApiResponse } from "./types"; // Importiere die Typen

export const fetchDailyContent = async (): Promise<ApiResponse> => {
    try {
        const response = await fetch('http://localhost:8080/getIslamContent');
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok.');
        }
        const data: ApiResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Es gab ein Problem mit dem Fetch-Vorgang:', error);
        throw error;
    }
};

*/
import { ApiResponse } from "./types";

export const fetchDailyContent = async (): Promise<ApiResponse> => {
    // Dummy-Daten, die der API-Antwort entsprechen
    const dummyData: ApiResponse = {
        data: {
            id: 0,
            dayOfYear: 209,
            verse: "“Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet..” ",
            verseSource: "(İsrâ, 17/88)",
            hadith: "\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\"",
            hadithSource: "(İbn Şeybe, Musannef, \"İman ve Rüya\",6)",
            pray: "\"Lorem ipsum dolor sit amet, consetetur sadipscing elitr\"",
            praySource: "(İbn-i Mâce, \"Taharet\", 10)"
        },
        success: true,
        message: null
    };

    // Simuliere eine kurze Verzögerung, um das Laden von Daten zu imitieren
    return new Promise((resolve) => {
        setTimeout(() => resolve(dummyData), 500);
    });
};
