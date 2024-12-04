import React from "react";
import { PrayerTimes } from "../center/types.ts";

interface DateBoxesProps {
    prayerTimes: PrayerTimes | null;
}

const DateBoxes: React.FC<DateBoxesProps> = ({ prayerTimes }) => {
    return (
        <div>
            {/* Sonnenkalender */}
            <div className="bg-[#009972] p-6 shadow-md text-white text-center mb-8 rounded-3xl">
                <div className="text-7xl font-bold mt-2">
                    {prayerTimes?.gregorianDateShort || "Lädt..."}
                </div>
            </div>
            {/* Mondkalender */}
            <div className="bg-transparent border-white border p-6 rounded-3xl shadow-md text-white text-center">
                <div className="text-7xl mt-2">
                    {prayerTimes?.hijriDateLong || "Lädt..."}
                </div>
            </div>
        </div>
    );
};

export default DateBoxes;
