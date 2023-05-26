import axios from "axios";
import { useQueries } from "@tanstack/react-query";
import MovieCard from "../components/MovieCard";

export default function Movies() {
    const staleTime = 1000 * 60 * 360;
    const [trending, popular, nowPlaying, upcoming] = useQueries({
        queries: [
            {
                queryKey: ["trending"],
                queryFn: () => getTrendingMovies(),
                staleTime: staleTime,
            },
            {
                queryKey: ["popular"],
                queryFn: () => getPopularMovies(),
                staleTime: staleTime,
            },
            {
                queryKey: ["nowPlaying"],
                queryFn: () => getNowPlayingMovies(),
                staleTime: staleTime,
            },
            {
                queryKey: ["upcoming"],
                queryFn: () => getUpcomingMovies(),
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

const client = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: { api_key: process.env.REACT_APP_TMDB_API_KEY },
});

async function getTrendingMovies() {
    const res = await client
        .get("trending/movie/week", {
            params: {
                language: "ko-KR",
                adult: false,
            },
        })
        .catch((error) => {
            console.error(error);
        });
    return res.data.results;
}

async function getPopularMovies() {
    const res = await client
        .get("movie/popular", {
            params: {
                language: "ko-KR",
                adult: false,
                page: 1,
            },
        })
        .catch((error) => {
            console.error(error);
        });
    return res.data.results;
}

async function getNowPlayingMovies() {
    const res = await client
        .get("movie/now_playing", {
            params: {
                language: "ko-KR",
                adult: false,
                page: 1,
                sort_by: "popularity.desc",
                region: "KR",
            },
        })
        .catch((error) => {
            console.error(error);
        });
    return res.data.results;
}

async function getUpcomingMovies() {
    const res = await client
        .get("movie/upcoming", {
            params: {
                language: "ko-KR",
                adult: false,
                page: 1,
                region: "KR",
            },
        })
        .catch((error) => {
            console.error(error);
        });
    return res.data.results;
}
