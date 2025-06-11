import {useParams, useNavigate} from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/get-stringed-date";

const Diary = () => {
  const params = useParams();
  const nav = useNavigate();
  const curDiaryItem = useDiary(params.id);

  // 처음 호출 시 undefined 호출되기 때문에 해당 내용을 처리하는 로직 필요
  if (!curDiaryItem) {
    return <div>데이터 로딩중...!</div>;
  }
  const {createdDate, emotionId, content} = curDiaryItem;
  const title = getStringedDate(new Date(createdDate));
  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftChild={<Button text={"< 뒤로가기"} onClick={() => nav(-1)} />}
        rightChild={<Button text={"수정하기"} onClick={() => nav(`/edit/${params.id}`)} />}
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;
