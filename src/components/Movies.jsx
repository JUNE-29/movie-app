import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";

export default function Movies({ categories, title, home }) {
    const { isLoading, error, data: movies } = categories;

    const addTitle = () => {
        if (title === "trending") {
            return <h1>트렌딩</h1>;
        } else if (title === "popular") {
            return <h1>인기 있는 영화</h1>;
        } else if (title === "nowPlaying") {
            return <h1>현재 상영중인 영화</h1>;
        } else if (title === "upcoming") {
            return <h1>개봉예정인 영화</h1>;
        }
    };

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something is wrong😫</p>}
            <div className="mt-24">
                <div className="flex justify-between">
                    <div className="text-3xl font-bold mb-12">{addTitle()}</div>
                    {home && <p>더보기</p>}
                </div>
                {movies &&
                    // <ul
                    //     className={
                    //         home
                    //             ? `flex overflow-x-scroll mb-5 gap-9`
                    //             : `grid grid-flow-row grid-cols-5`
                    //     }
                    // >
                    //     {movies.map((movie) => (
                    //         <MovieCard key={movie.id} movie={movie} />
                    //     ))}
                    // </ul>
                    (home ? (
                        <div className="mb-5">
                            <Swiper
                                slidesPerView={6}
                                spaceBetween={30}
                                freeMode={true}
                                modules={[FreeMode]}
                                className="mySwiper"
                            >
                                {movies.map((movie) => (
                                    <SwiperSlide>
                                        <MovieCard
                                            key={movie.id}
                                            movie={movie}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    ) : (
                        <ul className="grid grid-flow-row grid-cols-5">
                            {movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    ))}
            </div>
        </>
    );
}
