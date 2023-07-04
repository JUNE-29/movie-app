import { useParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import TmdbApi from "../api/TmdbApi";
import { useEffect } from "react";
import MovieCard from "../components/MovieCard";

export default function MovieCategories() {
    const tmdbApi = new TmdbApi();
    const { category } = useParams();

    // const result = useQuery(
    //     ["movies", category],
    //     () => tmdbApi.getCategory(category),
    //     {
    //         staleTime: 1000 * 60 * 360,
    //     }
    // );

    // const { data, error, fetchNextPage } = useInfiniteQuery({
    //     queryKey: ["popularMovie"],
    //     queryFn: ({ pageParam = 1 }) => tmdbApi.getPopularMovies(pageParam),
    //     getNextPageParam: (lastPage, pages) => {
    //         return lastPage.page < lastPage.total_pages
    //             ? lastPage.page + 1
    //             : undefined;
    //     },
    // });
    const { data, error, fetchNextPage, refetch, hasNextPage } =
        useInfiniteQuery({
            queryKey: ["movies"],
            queryFn: async ({ pageParam = 1 }) => {
                if (category === "trending") {
                    return await tmdbApi.getTrendingMovies(pageParam);
                } else if (category === "popular") {
                    return await tmdbApi.getPopularMovies(pageParam);
                } else if (category === "nowPlaying") {
                    return await tmdbApi.getNowPlayingMovies(pageParam);
                } else if (category === "upcoming") {
                    return await tmdbApi.getUpcomingMovies(pageParam);
                }
            },
            getNextPageParam: (lastPage, pages) => {
                return lastPage.page < lastPage.total_pages
                    ? lastPage.page + 1
                    : undefined;
            },
            staleTime: 60 * 5000,
        });

    useEffect(() => {
        refetch();
    }, [category]);

    return (
        <>
            {error && <p>Something is wrong😫</p>}
            {data.pages &&
                data.pages.map((movies) => (
                    <ul className="grid grid-flow-row grid-cols-5">
                        {movies.results.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </ul>
                ))}

            <button
                onClick={() =>
                    hasNextPage
                        ? fetchNextPage()
                        : alert("다음 리스트가 없습니다!😅")
                }
            >
                리스트 더 보기
            </button>
        </>
    );
}
