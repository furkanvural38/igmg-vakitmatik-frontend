import { useAutoScroll } from "./scrollFunction.tsx";
import useDailyContent from "./useDailyContent.tsx";
import {useRef} from "react";

function Footer() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const { text, image } = useDailyContent();
    useAutoScroll(scrollContainerRef, contentRef);

    return (
        <footer className="flex items-center justify-between bg-transparent text-white border-7 border-white rounded-2xl h-400 px-4 py-2 mx-10">
            <div className="flex-shrink-0 ml-2">
                <img src={image} alt="igmg-logo" className="h-80"/>
            </div>
            <div className="flex-grow items-center justify-center rounded-2xl ml-10 mr-5 h-80 flex overflow-hidden" ref={scrollContainerRef}>
                <div className="text-center pt-5">
                    <p className="text-10xl h-80 grid place-items-center" ref={contentRef}>
                        {text}
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
