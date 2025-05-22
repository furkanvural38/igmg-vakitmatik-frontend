
type Props = {
    image: string;
    text: string;
    handleScrollContainerRef: (node: HTMLDivElement | null) => void;
    handleContentRef: (node: HTMLDivElement | null) => void;
};

const FooterView = ({ image, text, handleScrollContainerRef, handleContentRef }: Props) => (
    <footer className="flex items-center bg-[#343434] text-white rounded-3xl h-footer">
        <div className="flex-shrink-0 ml-2">
            <img src={image} alt="logo" className="h-400" />
        </div>
        <div
            className="flex-grow items-center justify-center rounded-2xl ml-10 mr-4 h-400 flex overflow-hidden"
            ref={handleScrollContainerRef}
        >
            <div className="text-center pt-5">
                <p className="text-footer h-400 grid place-items-center" ref={handleContentRef}>
                    {text}
                </p>
            </div>
        </div>
    </footer>
);

export default FooterView;
