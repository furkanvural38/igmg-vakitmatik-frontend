import React from "react";
import { PrayerTimes } from "../components/center/types";
import DateBoxes from "../components/center/prayerTimeAndClockCenter/dateBoxes";
import CurrentTimeDisplay from "../components/center/prayerTimeAndClockCenter/currentTimeDisplay";
import { FaMoon } from "react-icons/fa6";
import { HiOutlineSun } from "react-icons/hi";
import { AiFillSun } from "react-icons/ai";
import { PiSunHorizonFill, PiSunHorizonLight } from "react-icons/pi";
import { LuCloudSun } from "react-icons/lu";
import WeatherTileContainer from "../container/WeatherTileContainer";

interface Props {
    prayerTimes: PrayerTimes | null;
    currentPrayer: string | null;
    currentTime: string;
    timeDifference: React.ReactNode;
    progressPercentage: number;
    titles: { [key: string]: string };
}

const icons: { [key: string]: JSX.Element } = {
    fajr: <PiSunHorizonLight className="text-9xl mb-4" />,
    sunrise: <HiOutlineSun className="text-9xl mb-4" />,
    dhuhr: <AiFillSun className="text-9xl mb-4" />,
    asr: <LuCloudSun className="text-9xl mb-4" />,
    maghrib: <PiSunHorizonFill className="text-9xl mb-4" />,
    isha: <FaMoon className="text-9xl mb-4" />,
};

const QubePrayerTimeView: React.FC<Props> = ({
                                                 prayerTimes,
                                                 currentPrayer,
                                                 currentTime,
                                                 timeDifference,
                                                 progressPercentage,
                                                 titles,
                                             }) => {
    const timeParts = currentTime?.split(":") ?? ["00", "00", "00"];
    const [hours, minutes, seconds] = timeParts;

    const prayerLabels: { [key: string]: string } = {
        fajr: "İmsak",
        sunrise: "Güneş",
        dhuhr: "Öğle",
        asr: "İkindi",
        maghrib: "Akşam",
        isha: "Yatsı",
    };

    if (!prayerTimes) {
        return <div className="text-white text-center p-10">Gebetszeiten werden geladen…</div>;
    }

    return (
        <div className="relative w-full">
            <div className="flex items-center justify-between mb-4 w-full px-10">
                {/* Datum */}
                <div>
                    <DateBoxes prayerTimes={prayerTimes} />
                </div>

                {/* Uhrzeit */}
                <div className="text-center scale-y-110 scale-x-150">
                    <CurrentTimeDisplay hours={hours} minutes={minutes} seconds={seconds} />
                </div>

                {/* Wetter */}
                <div className="mb-20 mr-2">
                    <WeatherTileContainer />
                </div>
            </div>

            {/* Gebetszeiten */}
            <div className="flex justify-center items-center space-x-28">
                {Object.entries(prayerLabels).map(([key, label]) => {
                    const isActive = key === currentPrayer;
                    const displayTime = prayerTimes?.[key as keyof PrayerTimes] ?? "00:00";

                    return (
                        <div key={key} className="relative w-full">
                            {isActive && (
                                <div className="absolute -top-44 w-box">
                                    <div className="text-center text-white mb-4 text-8xl">
                                        {timeDifference}
                                    </div>
                                    <div
                                        className={`h-8 relative w-full rounded-3xl overflow-hidden ${
                                            progressPercentage > 90 ? "bg-red-500" : "bg-[#009972]"
                                        }`}
                                    >
                                        <div
                                            className="bg-[#4b4b4b] rounded-3xl h-full"
                                            style={{ width: `${progressPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                            <div
                                className={`w-box h-box flex flex-col justify-center items-center rounded-3xl shadow-lg ${
                                    isActive
                                        ? progressPercentage > 90
                                            ? "bg-red-600"
                                            : "bg-[#009972]"
                                        : "bg-[#343434]"
                                }`}
                            >
                                <div className={`text-8xl mb-4 ${isActive ? "text-white" : "text-[#a7a7a7]"}`}>
                                    {icons[key]}
                                </div>
                                <span className={`text-6xl mb-6 ${isActive ? "text-white" : "text-[#a7a7a7]"}`}>
                                    {titles?.[key] ?? "-"}
                                </span>
                                <span className={`text-8xl font-semibold ${isActive ? "text-white" : "text-[#a7a7a7]"}`}>
                                    {label}
                                </span>
                                <span className={`text-time font-semibold mt-4 ${isActive ? "text-white" : "text-[#a7a7a7]"}`}>
                                    {displayTime}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default QubePrayerTimeView;
