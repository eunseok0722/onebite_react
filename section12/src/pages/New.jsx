import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";


// New 컴포넌트
const New = () => {
    const nav = useNavigate();
    const {onCreate} = useContext(DiaryDispatchContext);

    // 페이지 타이틀 설정
    usePageTitle("감정일기장 | 새 일기 쓰기");

    // 일기 작성 함수
    const onSubmit = (input) => {
        onCreate(input.createdDate.getTime(), input.emotionId, input.content);
        nav("/", {replace: true});
    }

    return (
        <div className="New">
            <Header title="새 일기 쓰기" leftChild={<Button text="< 뒤로가기" onClick={() => nav(-1)} />} />
            <Editor onSubmit={onSubmit} />
        </div>
    )
}

export default New;