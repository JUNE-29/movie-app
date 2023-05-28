import { useNavigate } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { useState } from "react";

export default function Header() {
    const [text, setText] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/movies/search/${text}`);
    };

    const goHome = () => {
        setText("");
        navigate("/");
    };

    return (
        <header className="flex justify-between">
            <section className="flex-1">
                <img
                    className="cursor-pointer"
                    src="/images/logo.png"
                    alt="logo"
                    onClick={goHome}
                />
            </section>
            <section className="flex-1 relative">
                <form onSubmit={handleSubmit}>
                    <button className="absolute right-0">
                        <RiSearchLine />
                    </button>
                    <input
                        className="w-full bg-backgroundColor border-0 border-b"
                        type="text"
                        placeholder="영화를 검색해보세요!"
                        value={text}
                        onChange={handleChange}
                    />
                </form>
                <div className="flex flex-col gap-2 w-1/2">
                    <p
                        className="pb-1 mt-2 border-b cursor-pointer hover:text-gray-300"
                        onClick={() => navigate(`/movies/trending`)}
                    >
                        트렌딩
                    </p>
                    <p
                        className="pb-1 border-b cursor-pointer hover:text-gray-300"
                        onClick={() => navigate(`/movies/popular`)}
                    >
                        인기 있는 영화
                    </p>
                    <p
                        className="pb-1 border-b cursor-pointer hover:text-gray-300"
                        onClick={() => navigate(`/movies/nowPlaying`)}
                    >
                        현재 상영중인 영화
                    </p>
                    <p
                        className="pb-1 border-b cursor-pointer hover:text-gray-300"
                        onClick={() => navigate(`/movies/upcoming`)}
                    >
                        개봉예정인 영화
                    </p>
                </div>
            </section>
        </header>
    );
}
