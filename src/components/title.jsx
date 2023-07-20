export default function Title({ title }) {
    const styling = "text-2xl font-bold md:text-3xl";

    if (title === "trending") {
        return <h1 className={styling}>트렌딩</h1>;
    } else if (title === "popular") {
        return <h1 className={styling}>인기 있는 영화</h1>;
    } else if (title === "nowPlaying") {
        return <h1 className={styling}>현재 상영중인 영화</h1>;
    } else if (title === "upcoming") {
        return <h1 className={styling}>개봉예정인 영화</h1>;
    }
}
