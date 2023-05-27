import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import TmdbApi from "../api/TmdbApi";
import MovieCard from "./MovieCard";
import { useEffect } from "react";

export default function MovieCategories() {
    const tmdbApi = new TmdbApi();
    const { category } = useParams();
    const {
        isLoading,
        error,
        data: movies,
    } = useQuery(["movies", category], () => tmdbApi.getCategory(category), {
        staleTime: 1000 * 60 * 360,
    });

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something is wrong😫</p>}
            <h1>{category}</h1>
            {movies && (
                <ul>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </ul>
            )}
        </>
    );
}
