export default function MovieCard({ movie }) {
    const { title, poster_path } = movie;
    return (
        <li className="">
            <img
                className=""
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt={title}
            />
            <div>
                <p>{title}</p>
            </div>
        </li>
    );
}
