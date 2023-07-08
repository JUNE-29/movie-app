import { BiArrowToTop } from "react-icons/bi";

export default function ScrollToTopBtn() {
    return (
        <div className="absolute right-20">
            <h1
                className="fixed z-10 p-3 bottom-3 text-2xl border hover:cursor-pointer hover:bg-white/20 large:right-0"
                onClick={() =>
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                }
            >
                <BiArrowToTop />
            </h1>
        </div>
    );
}
