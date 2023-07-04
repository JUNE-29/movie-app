import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import Title from "./Title";

export default function Movies({ categories, title, home }) {
    const { isLoading, error, data: movies } = categories;

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something is wrong😫</p>}
            <div className="mt-24">
                <div className="flex justify-between">
                    <div className="mb-12">
                        <Title title={title} />
                    </div>
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
