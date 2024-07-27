import React, { useRef } from "react";
import { useAutoScroll } from "./scrollFunction.tsx";
import useDailyContent from "./useDailyContent.tsx";

function Footer() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const { text, image } = useDailyContent();
    useAutoScroll(scrollContainerRef, contentRef);

    return (
        <footer className="flex items-center justify-between bg-transparent text-white border-7 border-white w-full rounded-2xl h-52">
            <div className="flex-shrink-0 border-white border ml-2">
                <img src={image} alt="igmg-logo" className="h-40" />
            </div>
            <div className="flex-grow items-center justify-center border border-violet-900 rounded-2xl ml-10 mr-5 h-40 flex overflow-hidden" ref={scrollContainerRef}>
                <div className="text-center">
                    <p className="text-5xl py-2" ref={contentRef}>
                        {text}
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
