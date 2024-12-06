import React from "react";

interface CurrentTimeDisplayProps {
    hours: string;
    minutes: string;
    seconds: string;
}

const CurrentTimeDisplay: React.FC<CurrentTimeDisplayProps> = ({ hours, minutes, seconds }) => {
    return (
        <div className="flex items-center justify-center">
            <span className="text-white font-clash text-clock time-unit">{hours}</span>
            <span className="text-white font-clash text-clock time-separator">:</span>
            <span className="text-white font-clash text-clock time-unit">{minutes}</span>
            <span className="text-white font-clash text-seconds time-unit">{seconds}</span>
        </div>
    );
};

export default CurrentTimeDisplay;
