import { useRef, useState, useEffect } from "react";
import FooterView from "./FooterView";
import { useAutoScroll } from "../components/footer/scrollFunction";
import useDailyContent from "../components/footer/useDailyContent";

const FooterContainer = () => {
    const [scrollContainerRef, setScrollContainerRef] = useState<HTMLDivElement | null>(null);
    const [textContentRef, setTextContentRef] = useState<HTMLDivElement | null>(null);
    const { text, image, reload } = useDailyContent();

    const currentDayRef = useRef<number>(new Date().getDate());

    // Tageswechsel erkennen
    useEffect(() => {
        const interval = setInterval(() => {
            const today = new Date().getDate();
            if (today !== currentDayRef.current) {
                currentDayRef.current = today;
                reload();
            }
        }, 60000);

        return () => clearInterval(interval);
    }, [reload]);

    // ✅ Hook direkt aufrufen (nicht innerhalb von useEffect)
    useAutoScroll(
        { current: scrollContainerRef },
        { current: textContentRef }
    );

    return (
        <FooterView
            image={image}
            text={text}
            handleScrollContainerRef={setScrollContainerRef}
            handleContentRef={setTextContentRef}
        />
    );
};

export default FooterContainer;
