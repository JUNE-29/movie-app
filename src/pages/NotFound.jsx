import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="text-center m-5">
            <p>페이지를 찾을 수 없습니다.</p>
            <button onClick={() => navigate("/")}>메인으로 돌아가기</button>
        </div>
    );
}
