import { BiArrowToTop } from "react-icons/bi";

export default function ScrollToTopBtn() {
    return (
        <div className="absolute">
            <h1
                className="fixed bottom-0 right-0 m-3 p-3 text-2xl border hover:cursor-pointer hover:bg-white/20"
                onClick={() =>
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                }
            >
                <BiArrowToTop />
            </h1>
        </div>
    );
}
