import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { FaRegStar } from "react-icons/fa";
import { MdHideImage } from "react-icons/md";

export default function MovieCard({ movie, search }) {
    const { title, poster_path, release_date, vote_average, overview, id } =
        movie;
    const navigate = useNavigate();

    const getDate = () => {
        const date = release_date.split("-");
        return `${date[0]}년 ${date[1]}월 ${date[2]}일`;
    };

    const goToDetail = () => {
        navigate(`/movies/detail/${id}`);
    };

    return (
        <li
            className={`${
                search
                    ? "flex flex-row py-10 border-b border-[#AEAEAE] border-opacity-50"
                    : "flex flex-col w-full items-center mb-7 lg:w-[13rem] lg:items-start"
            } flex-shrink-0`}
        >
            {poster_path ? (
                <div
                    className="relative w-[13rem] iamge_hovering"
                    onClick={goToDetail}
                >
                    <img
                        className="w-full object-cover cursor-pointer "
                        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                        alt={title}
                    />
                </div>
            ) : (
                <p className="w-[13rem] p-16 py-36 bg-[#AEAEAE] opacity-80 text-center">
                    <MdHideImage className="m-auto text-3xl" />
                </p>
            )}

            <div className={`${search ? "mt-0 ml-5 w-4/5" : "mt-5"}`}>
                <div
                    className="font-bold text-xl cursor-pointer hover:text-gray-300"
                    onClick={goToDetail}
                >
                    {search ? (
                        title
                    ) : (
                        <p>
                            {title.length > 12
                                ? `${title.substring(0, 12)}..`
                                : `${title}`}
                        </p>
                    )}
                </div>
                <p className="text-[#AEAEAE] mt-2">
                    {release_date ? getDate() : "미정"}
                </p>
                <div className="mt-2">
                    {vote_average ? (
                        <Rating
                            name="read-only"
                            size="medium"
                            precision={0.5}
                            value={Math.floor(vote_average) / 2}
                            readOnly
                        />
                    ) : (
                        <p className="text-xl opacity-30 text-[#AEAEAE]">
                            <FaRegStar />
                        </p>
                    )}
                </div>
                {search && <p className="mt-2">{overview}</p>}
            </div>
        </li>
    );
}
