// types.ts
export interface DailyContentData {
    id: number;
    dayOfYear: number;
    verse: string;
    verseSource: string;
    hadith: string;
    hadithSource: string;
    pray: string;
    praySource: string;
}

export interface ApiResponse {
    data: DailyContentData;
    success: boolean;
    message: string | null;
}
