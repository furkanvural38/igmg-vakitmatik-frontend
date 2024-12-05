import { useAutoScroll } from "./scrollFunction.tsx";
import useDailyContent from "./useDailyContent.tsx";
import { useEffect, useState } from "react";

function Footer() {
    // Zustände für DOM-Referenzen
    const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);
    const [content, setContent] = useState<HTMLDivElement | null>(null);

    // Laden des Inhalts
    const { text, image } = useDailyContent();

    // Scroll-Funktion aktualisieren, wenn neue Daten kommen
    useEffect(() => {
        if (text && content) {
            // Zum Beispiel, aktualisieren Sie den Inhaltstext dynamisch, wenn erforderlich
            setContent((prev) => {
                if (prev) {
                    prev.textContent = text;
                }
                return prev;
            });
        }
    }, [text, content]);

    // Initialisieren der Scroll-Funktion
    useAutoScroll({ current: scrollContainer }, { current: content });

    // Ref-Callbacks zur Zuweisung von DOM-Elementen
    const handleScrollContainerRef = (node: HTMLDivElement | null) => {
        setScrollContainer(node);
    };
    const handleContentRef = (node: HTMLDivElement | null) => {
        setContent(node);
    };

    return (
        <footer
            className="flex items-center bg-[#343434] text-white rounded-3xl h-footer">
            <div className="flex-shrink-0 ml-2 border-r border-white">
                <img src={image} alt="igmg-logo" className="h-400" />
            </div>
            <div
                className="flex-grow items-center justify-center rounded-2xl ml-10 mr-4 h-400 flex overflow-hidden"
                ref={handleScrollContainerRef}>
                <div className="text-center pt-5">
                    <p className="text-footer h-400 grid place-items-center" ref={handleContentRef}>
                        {text}
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
