import axios from "axios";
import { useQueries } from "@tanstack/react-query";
import MovieCard from "../components/MovieCard";
import TmdbApi from "../api/TmdbApi";

export default function Movies() {
    const tmdbApi = new TmdbApi();
    const staleTime = 1000 * 60 * 360;
    const [trending, popular, nowPlaying, upcoming] = useQueries({
        queries: [
            {
                queryKey: ["trending"],
                queryFn: () => tmdbApi.getTrendingMovies(),
                staleTime: staleTime,
            },
            {
                queryKey: ["popular"],
                queryFn: () => tmdbApi.getPopularMovies(),
                staleTime: staleTime,
            },
            {
                queryKey: ["nowPlaying"],
                queryFn: () => tmdbApi.getNowPlayingMovies(),
                staleTime: staleTime,
            },
            {
                queryKey: ["upcoming"],
                queryFn: () => tmdbApi.getUpcomingMovies(),
                staleTime: staleTime,
            },
        ],
    });

    return (
        <>
            <h1>Trending</h1>
            {trending.data && (
                <ul>
                    {trending.data.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </ul>
            )}
            <hr></hr>
            <h1>Popular</h1>
            {popular.data && (
                <ul>
                    {popular.data.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </ul>
            )}
            <hr></hr>
            <h1>Now Playing</h1>
            {nowPlaying.data && (
                <ul>
                    {nowPlaying.data.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </ul>
            )}
            <hr></hr>
            <h1>Upcoming</h1>
            {upcoming.data && (
                <ul>
                    {upcoming.data.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </ul>
            )}
        </>
    );
}
