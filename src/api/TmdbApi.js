import axios from "axios";

export default class TmdbApi {
    constructor() {
        this.httpClient = axios.create({
            baseURL: "https://api.themoviedb.org/3/",
            params: { api_key: process.env.REACT_APP_TMDB_API_KEY },
        });
    }

    async getCategory(category) {
        if (category === "trending") {
            return this.getTrendingMovies();
        } else if (category === "popular") {
            return this.getPopularMovies();
        } else if (category === "nowPlaying") {
            return this.getNowPlayingMovies();
        } else if (category === "upcoming") {
            return this.getUpcomingMovies();
        }
    }

    async getTrendingMovies() {
        const res = await this.httpClient
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

    async getPopularMovies() {
        const res = await this.httpClient
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

    async getNowPlayingMovies() {
        const res = await this.httpClient
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

    async getUpcomingMovies() {
        const res = await this.httpClient
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

    async search(keyword) {
        const res = await this.httpClient
            .get("search/movie", {
                params: {
                    language: "ko-KR",
                    include_adult: false,
                    page: 1,
                    query: keyword,
                },
            })
            .catch((error) => {
                console.error(error);
            });
        return res.data;
    }
}
