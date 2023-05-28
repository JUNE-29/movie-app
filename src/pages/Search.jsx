import TmdbApi from "../api/TmdbApi";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "../components/MovieCard";

export default function Search() {
    const tmdbApi = new TmdbApi();
    const { keyword } = useParams();

    const {
        isLoading,
        error,
        data: movies,
    } = useQuery(["movies", keyword], () => tmdbApi.search(keyword), {
        staleTime: 1000 * 60 * 360,
    });

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something is wrong😫</p>}
            {movies && (
                <>
                    <h1>
                        {keyword}에 대한 검색 결과 ( {movies.total_results} )
                    </h1>
                    <ul>
                        {movies.results.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </ul>
                </>
            )}
        </>
    );
}
