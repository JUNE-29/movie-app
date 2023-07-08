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
        <header className="flex flex-col justify-between mt-5 lg:flex-row lg:mt-7">
            <section className="flex-1">
                <img
                    className="cursor-pointer hidden lg:block"
                    src="/images/logo.png"
                    alt="logo"
                    onClick={goHome}
                />
                <p
                    className="cursor-pointer text-2xl font-bold text-center mb-5 lg:hidden lg:mb-0"
                    onClick={goHome}
                >
                    MOVIELIST
                </p>
            </section>

            <section className="flex-1">
                <form onSubmit={handleSubmit} className="w-full text-center">
                    <div className="relative text-center m-auto w-4/5  border-0 border-b lg:w-full">
                        <input
                            className=" bg-backgroundColor pb-1 w-full"
                            type="text"
                            placeholder="영화를 검색해보세요!"
                            value={text}
                            onChange={handleChange}
                        />
                        <button className="absolute right-1 top-1">
                            <RiSearchLine />
                        </button>
                    </div>
                </form>
                <div className="flex flex-col gap-2 w-4/5 m-auto lg:w-1/4 lg:m-0">
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
