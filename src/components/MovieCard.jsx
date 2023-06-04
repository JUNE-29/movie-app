import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { FaRegStar } from "react-icons/fa";

export default function MovieCard({ movie }) {
    const { title, poster_path, release_date, vote_average, id } = movie;
    const navigate = useNavigate();

    const getDate = () => {
        const date = release_date.split("-");
        return `${date[0]}년 ${date[1]}월 ${date[2]}일`;
    };

    const goToDetail = () => {
        navigate(`/movies/detail/${id}`);
    };

    return (
        <li className="flex flex-col flex-shrink-0 w-[13rem] mb-5">
            <img
                className="w-full object-cover cursor-pointer"
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt={title}
                onClick={goToDetail}
            />
            <div className="mt-5">
                <p className="font-bold text-xl">
                    {title.length > 12
                        ? `${title.substring(0, 12)}..`
                        : `${title}`}
                </p>
                <p className="text-[#AEAEAE] mt-2">{getDate()}</p>
                <div className="mt-2">
                    {vote_average ? (
                        <Rating
                            name="read-only"
                            size="medium"
                            value={Math.floor(vote_average) / 2}
                            readOnly
                        />
                    ) : (
                        <p className="text-xl opacity-30 text-[#AEAEAE]">
                            <FaRegStar />
                        </p>
                    )}
                </div>
            </div>
        </li>
    );
}
