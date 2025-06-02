import { useParams } from "react-router-dom";

const Diary = () => {
    const params = useParams();
    return (
        <div>
            <h1>Diary</h1>
            <h2>일기 상세 페이지</h2>
            <p>일기 번호 : {params.id}</p>
        </div>
    )
}

export default Diary;