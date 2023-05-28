import MovieCard from "./MovieCard";

export default function Movies({ categories, title }) {
    const { isLoading, error, data: movies } = categories;

    const addTitle = () => {
        if (title === "trending") {
            return <h1>트렌딩</h1>;
        } else if (title === "popular") {
            return <h1>인기 있는 영화</h1>;
        } else if (title === "nowPlaying") {
            return <h1>현재 상영중인 영화</h1>;
        } else if (title === "upcoming") {
            return <h1>개봉예정인 영화</h1>;
        }
    };

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something is wrong😫</p>}
            <div>{addTitle()}</div>
            {movies && (
                <ul>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </ul>
            )}
            <hr></hr>
        </>
    );
}
