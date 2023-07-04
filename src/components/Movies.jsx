import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

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
                    (home ? (
                        <div className="mb-5">
                            <Swiper
                                slidesPerView={6}
                                spaceBetween={30}
                                freeMode={true}
                                navigation={true}
                                modules={[FreeMode, Navigation]}
                                className="mySwiper"
                            >
                                {movies.results.map((movie) => (
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
                            {movies.results.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    ))}
            </div>
        </>
    );
}
