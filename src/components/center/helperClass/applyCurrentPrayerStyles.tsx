interface StyleResult {
    containerClassName: string;
    containerStyle: React.CSSProperties;
    textClassName: string;
    textStyle: React.CSSProperties;
    timeClassName: string;
    timeStyle: React.CSSProperties;
}

export const applyCurrentPrayerStyles = (isCurrent: boolean): StyleResult => {
    if (isCurrent) {
        return {
            containerClassName: 'bg-white bg-opacity-90 border-white',
            containerStyle: { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
            textClassName: 'text-green-600',
            textStyle: { color: '#004d00' },
            timeClassName: 'text-green-600',
            timeStyle: { color: '#004d00' },
        };
    }

    return {
        containerClassName: 'bg-transparent border-white',
        containerStyle: {},
        textClassName: 'text-black',
        textStyle: {},
        timeClassName: 'text-black',
        timeStyle: {},
    };
};
