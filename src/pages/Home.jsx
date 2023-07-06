import { useQueries } from "@tanstack/react-query";
import TmdbApi from "../api/TmdbApi";
import Movies from "../components/Movies";

export default function Home() {
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
            {trending.data && (
                <Movies categories={trending} title={"trending"} home={true} />
            )}
            {popular.data && (
                <Movies categories={popular} title={"popular"} home={true} />
            )}
            {nowPlaying.data && (
                <Movies
                    categories={nowPlaying}
                    title={"nowPlaying"}
                    home={true}
                />
            )}
            {upcoming.data && (
                <Movies categories={upcoming} title={"upcoming"} home={true} />
            )}
        </>
    );
}
