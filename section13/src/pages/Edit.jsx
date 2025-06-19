import {useParams, useNavigate} from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import useDiaryStore from "../store/useDiaryStore.js";
import useDiary from "../hooks/useDiary";
import usePageTitle from "../hooks/usePageTitle";

const Edit = () => {
  const nav = useNavigate();
  const params = useParams();
  // useDiaryStore: 일기 데이터 스토어 호출 (선택적 구독)
  const deleteDiary = useDiaryStore((state) => state.deleteDiary);
  const updateDiary = useDiaryStore((state) => state.updateDiary);
  usePageTitle(`감정일기장 | ${params.id}번 일기 수정`);

  // useDiary: 현재 일기 아이템 호출
  const curDiaryItem = useDiary(params.id);
  
  // 처음 호출 시 undefined 호출되기 때문에 해당 내용을 처리하는 로직 필요
  if (!curDiaryItem) {
    return <div>데이터 로딩중...!</div>;
  }

  // const {createdDate, emotionId, content} = curDiaryItem;

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요?")) {
      // 일기 삭제하는 로직
      deleteDiary(params.id);
      // 뒤로가기 버튼 누르면 삭제된 일기 페이지로 이동하지 않게 하기 위해 replace 옵션 사용
      nav("/", {replace: true});
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("일기를 수정할까요?")) {
      updateDiary(params.id, input.createdDate, input.emotionId, input.content);
      nav("/", {replace: true});
    }
  };

  return (
    <div>
      <Header
        title="일기 수정하기"
        leftChild={
          <Button
            text={"< 뒤로가기"}
            onClick={() => {
              nav(-1);
            }}
          />
        }
        rightChild={<Button text="삭제하기" type={"NEGATIVE"} onClick={onClickDelete} />}
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
