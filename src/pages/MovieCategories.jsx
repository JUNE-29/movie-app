import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import TmdbApi from "../api/TmdbApi";
import Movies from "../components/Movies";

export default function MovieCategories() {
    const tmdbApi = new TmdbApi();
    const { category } = useParams();

    const result = useQuery(
        ["movies", category],
        () => tmdbApi.getCategory(category),
        {
            staleTime: 1000 * 60 * 360,
        }
    );
    return <>{result && <Movies categories={result} title={category} />}</>;
}
