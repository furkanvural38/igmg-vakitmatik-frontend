import React, { useRef } from "react";
import { useAutoScroll } from "./scrollFunction.tsx";

function Footer() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useAutoScroll(scrollContainerRef, contentRef);

    return (
        <footer className="flex items-center justify-between bg-transparent text-white border-7 border-white w-full rounded-2xl h-32">
            <div className="flex-shrink-0 border-white border ml-2">
                <img src="../../../ressources/dua-image.png" alt="igmg-logo" className="h-20" />
            </div>
            <div className="flex-grow items-center justify-center border border-violet-900 rounded-2xl ml-5 mr-5 h-20 flex overflow-hidden" ref={scrollContainerRef}>
                <div className="text-center">
                    <h1 className="text py-2" ref={contentRef}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                    </h1>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
