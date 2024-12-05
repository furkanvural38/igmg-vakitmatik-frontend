import React from "react";
import { PrayerTimes } from "../types.ts";

interface DateBoxesProps {
    prayerTimes: PrayerTimes | null;
}

const DateBoxes: React.FC<DateBoxesProps> = ({ prayerTimes }) => {
    return (
        <div>
            {/* Sonnenkalender */}
            <div className="bg-[#004731] p-6 shadow-md text-white text-center mb-8 rounded-3xl">
                <div className="text-date font-bold">
                    {prayerTimes?.gregorianDateShort || new Date().toLocaleDateString()}
                </div>
            </div>
            {/* Mondkalender */}
            <div className="bg-transparent border-white border p-6 rounded-3xl shadow-md text-white text-center">
                <div className="text-date">
                    {prayerTimes?.hijriDateLong || new Date().toLocaleDateString()}
                </div>
            </div>
        </div>
    );
};

export default DateBoxes;
