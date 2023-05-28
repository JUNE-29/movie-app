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
            {trending && <Movies categories={trending} title={"trending"} />}
            {popular && <Movies categories={popular} title={"popular"} />}
            {nowPlaying && (
                <Movies categories={nowPlaying} title={"nowPlaying"} />
            )}
            {upcoming && <Movies categories={upcoming} title={"upcoming"} />}
        </>
    );
}
