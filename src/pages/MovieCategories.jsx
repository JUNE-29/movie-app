import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import TmdbApi from "../api/TmdbApi";
import { useEffect } from "react";
import MovieCard from "../components/MovieCard";
import Title from "../components/Title";

export default function MovieCategories() {
    const tmdbApi = new TmdbApi();
    const { category } = useParams();
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
    }, [category, refetch]);

    return (
        <>
            <div className="mb-12 mt-24">
                <Title title={category} />
            </div>
            {error && <p>Something is wrong😫</p>}
            {data &&
                data.pages.map((movies) => (
                    <ul className="grid grid-flow-row grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {movies.results.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </ul>
                ))}

            <div className="m-auto text-center w-full p-3">
                <button
                    className="px-5 py-3 border border-white hover:bg-[#292C2F]"
                    onClick={() =>
                        hasNextPage
                            ? fetchNextPage()
                            : alert("다음 리스트가 없습니다!😅")
                    }
                >
                    리스트 더 보기
                </button>
            </div>
        </>
    );
}
