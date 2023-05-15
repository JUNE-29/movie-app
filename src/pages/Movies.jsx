import axios from "axios";
import { useEffect, useState } from "react";

export default function Movies() {
    const [movies, setMovies] = useState();

    useEffect(() => {
        movieResult().then((movie) => setMovies(movie));
    }, []);

    return (
        <>
            <h1>Trending</h1>
            {movies && (
                <ul>
                    {movies.map((movie) => (
                        <li key={movie.id}>{movie.title}</li>
                    ))}
                </ul>
            )}
        </>
    );
}

async function movieResult() {
    const client = axios.create({
        baseURL: "https://api.themoviedb.org/3/",
        params: { api_key: process.env.REACT_APP_TMDB_API_KEY },
    });

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
