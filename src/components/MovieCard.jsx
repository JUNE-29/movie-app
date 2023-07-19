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
                    ? "py-10 border-b border-[#AEAEAE] border-opacity-50 "
                    : "flex flex-col mb-7 w-full items-center"
            } flex-shrink-0`}
        >
            <div className={search ? "flex flex-col md:flex-row" : ""}>
                {poster_path ? (
                    <div
                        className="relative iamge_hovering md:w-[13rem]"
                        onClick={goToDetail}
                    >
                        <img
                            className="w-full object-cover cursor-pointer "
                            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                            alt={title}
                        />
                    </div>
                ) : (
                    <p className="p-16 py-36 bg-[#AEAEAE] opacity-80 text-center md:w-[13rem]">
                        <MdHideImage className="m-auto text-3xl" />
                    </p>
                )}

                <div
                    className={`${
                        search ? "mt-3 md:ml-5 md:mt-0 md:w-4/5" : "mt-5"
                    }`}
                >
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
                    {search && (
                        <p className="mt-2">
                            {overview.length > 130
                                ? `${overview.substring(0, 130)}....`
                                : `${overview}`}
                        </p>
                    )}
                </div>
            </div>
        </li>
    );
}
