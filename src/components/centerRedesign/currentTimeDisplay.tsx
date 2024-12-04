import React from "react";

interface CurrentTimeDisplayProps {
    hours: string;
    minutes: string;
    seconds: string;
}

const CurrentTimeDisplay: React.FC<CurrentTimeDisplayProps> = ({ hours, minutes, seconds }) => {
    return (
        <div>
            <span className="text-white text-32xl">{hours}</span>
            <span className="text-white text-32xl">:</span>
            <span className="text-white text-32xl">{minutes}</span>
            <span className="text-white text-12xl">{seconds}</span>
        </div>
    );
};

export default CurrentTimeDisplay;
