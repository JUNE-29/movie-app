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
                <div className="flex mt-24">
                    <div className="w-1/2">
                        {movie.poster_path && (
                            <img
                                className="w-1/2 object-cover m-auto"
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={movie.title}
                            />
                        )}
                    </div>
                    <div className="w-1/2">
                        <p>{movie.title}</p>
                        <p>{`${getDate()} | ${getGenres()} | ${Math.trunc(
                            movie.runtime / 60
                        )}h ${movie.runtime % 60}m`}</p>
                        {movie.vote_average ? (
                            <>
                                <Rating
                                    name="read-only"
                                    size="medium"
                                    value={Math.floor(movie.vote_average) / 2}
                                    readOnly
                                />
                                <span>
                                    ({Math.floor(movie.vote_average) / 2})
                                </span>
                            </>
                        ) : (
                            <p className="text-xl opacity-30 text-[#AEAEAE]">
                                <FaRegStar />
                            </p>
                        )}
                        <p>영화소개</p>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            )}
        </>
    );
}
