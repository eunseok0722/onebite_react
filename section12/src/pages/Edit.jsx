import {useParams, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import {DiaryStateContext, DiaryDispatchContext} from "../App";
import useDiary from "../hooks/useDiary";
import usePageTitle from "../hooks/usePageTitle";

const Edit = () => {
  const nav = useNavigate();
  const params = useParams();
  const {onDelete, onUpdate} = useContext(DiaryDispatchContext);
  usePageTitle(`감정일기장 | ${params.id}번 일기 수정`);


  const curDiaryItem = useDiary(params.id);
  // 처음 호출 시 undefined 호출되기 때문에 해당 내용을 처리하는 로직 필요
  if (!curDiaryItem) {
    return <div>데이터 로딩중...!</div>;
  }
  const {createdDate, emotionId, content} = curDiaryItem;

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요?")) {
      // 일기 삭제하는 로직
      onDelete(params.id);
      // 뒤로가기 버튼 누르면 삭제된 일기 페이지로 이동하지 않게 하기 위해 replace 옵션 사용
      nav("/", {replace: true});
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("일기를 수정할까요?")) {
      onUpdate(params.id, input.createdDate.getTime(), input.emotionId, input.content);
      nav("/", {replace: true});
    }
  };

  // const getCurrentDiaryItem = () => {
  //   // 형이 다를 수 있기 때문에 문자열로 모두 변환하여 정리
  //   const currentDiaryItem = data.find((item) => String(item.id) === String(params.id));

  //   if(!currentDiaryItem) {
  //     window.alert("존재하지 않는 일기입니다.");

  //     // 컴포넌트가 호출될 때 랜더링 하고 싶을 경우 위 경우 랜더링 되지 않는다.
  //     // 컴포넌트가 랜더링 된 다음에 사용되는 기능이기 때문이다.
  //     // useEffect hook 사용하면 된다.
  //     nav("/", {replace: true});
  //   }

  //   return currentDiaryItem;
  // }

  // const currentDiaryItem = getCurrentDiaryItem();

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
