import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import TmdbApi from "../api/TmdbApi";
import { Rating } from "@mui/material";
import { FaRegStar } from "react-icons/fa";

export default function MovieDetail() {
    const tmdbApi = new TmdbApi();
    const { movieId } = useParams();

    const {
        data: movie,
        error,
        isLoading,
    } = useQuery(["movie", movieId], () => tmdbApi.getMovieDetail(movieId), {
        staleTime: 1000 * 60 * 360,
    });

    const getDate = () => {
        const date = movie.release_date.split("-");
        return `${date[0]}년 ${date[1]}월 ${date[2]}일`;
    };

    const getGenres = () => {
        const result = movie.genres.map((g) => g.name);
        return result.join(", ");
    };

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something is wrong😫</p>}
            {movie && (
                <div className="flex flex-col mt-24 xl:flex-row">
                    <div className="xl:w-1/2">
                        {movie.poster_path && (
                            <img
                                className="object-cover m-auto xl:w-1/2"
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={movie.title}
                            />
                        )}
                    </div>
                    <div className="mt-5 xl:w-1/2 xl:mt-0">
                        <div className="mb-5">
                            <p className="text-3xl font-bold mb-3">
                                {movie.title}
                            </p>
                            <div className="mb-3 flex flex-col xl:flex-row">
                                <span className="xl:mr-2">{`${getDate()}`}</span>
                                <span className="xl:mx-2">{`${getGenres()}`}</span>

                                <span className="xl:ml-2">{`${Math.trunc(
                                    movie.runtime / 60
                                )}h ${movie.runtime % 60}m`}</span>
                            </div>
                            {movie.vote_average ? (
                                <div className="flex flex-row">
                                    <Rating
                                        name="read-only"
                                        size="medium"
                                        precision={0.5}
                                        value={
                                            Math.floor(movie.vote_average) / 2
                                        }
                                        readOnly
                                    />
                                    <span className="text-white/70">
                                        ({Math.floor(movie.vote_average) / 2})
                                    </span>
                                </div>
                            ) : (
                                <p className="text-xl opacity-30 text-[#AEAEAE]">
                                    <FaRegStar />
                                </p>
                            )}
                        </div>
                        <p className="border-t border-white/20"></p>
                        <p className="mt-6 mb-3 text-2xl font-bold">영화소개</p>
                        <p className="mb-6 xl:mb-0">{movie.overview}</p>
                    </div>
                </div>
            )}
        </>
    );
}
