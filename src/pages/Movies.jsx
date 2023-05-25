import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function Movies() {
    const [trendingMovies, setTrendingMovies] = useState();
    const [popularMovies, setPopularMovies] = useState();
    const [nowPlaingMovies, setNowPlayingMovies] = useState();
    const [upcomingMovies, setUpcomingMovies] = useState();

    useEffect(() => {
        getTrendingMovies().then((movie) => setTrendingMovies(movie));
        getPopularMovies().then((movie) => setPopularMovies(movie));
        getNowPlayingMovies().then((movie) => setNowPlayingMovies(movie));
        getUpcomingMovies().then((movie) => setUpcomingMovies(movie));
    }, []);

    return (
        <>
            <h1>Trending</h1>
            {trendingMovies && (
                <ul>
                    {trendingMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </ul>
            )}
            <hr></hr>
            <h1>Popular</h1>
            {popularMovies && (
                <ul>
                    {popularMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </ul>
            )}
            <hr></hr>
            <h1>Now Playing</h1>
            {nowPlaingMovies && (
                <ul>
                    {nowPlaingMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </ul>
            )}
            <hr></hr>
            <h1>Upcoming</h1>
            {upcomingMovies && (
                <ul>
                    {upcomingMovies.map((movie) => (
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
