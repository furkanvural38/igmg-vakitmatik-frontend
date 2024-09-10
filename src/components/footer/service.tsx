// service.tsx

import { DailyContentApiResponse } from "./types"; // Importiere die Typen

export const fetchDailyContent = async (): Promise<DailyContentApiResponse> => {
    try {
        const response = await fetch('http://localhost:8080/getIslamContent');
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

/*
import { ApiResponse } from "./types";

export const fetchDailyContent = async (): Promise<ApiResponse> => {
    // Dummy-Daten, die der API-Antwort entsprechen
    const dummyData: ApiResponse = {
        data: {
            id: 0,
            dayOfYear: 209,
            verse: "\"Göğün, erimiş maden gibi ve dağların atılmış renkli yün gibi olacağı günü hatırla.(O gün) hiçbir samimi dost, dostunu sormaz.\"",
            verseSource: "(Meâric, 70/8-10)",
            hadith: "\"Ramazandan sonra oruçların en faziletlisi, Allah'ın ayı olan Muharrem ayında tutulan oruçtur. Farz namazlardan sonra en faziletli namaz da gece kılınan namzdır.\"",
            hadithSource: "(Müslim, \"Sıyâm\", 202)",
            pray: "\"Ey görünen ve görünmeyeni bilen, gökleri ve yeri yaratan, her şeyin Rabbi ve sahibi olan Allah’ım! Ben tanıklık ederim ki Senden başka ilâh yoktur. \nNefsimin şerrinden, şeytanın ve ortaklarının şerrinden sana sığınırım.\"",
            praySource: "(İbn Hıbbân, \"Ed’ıye\", No: 962; İbn Ebî Şeybe, \"Dua\", 22, No: 29265)"
        },
        success: true,
        message: null
    };

    // Simuliere eine kurze Verzögerung, um das Laden von Daten zu imitieren
    return new Promise((resolve) => {
        setTimeout(() => resolve(dummyData), 500);
    });
};
*/