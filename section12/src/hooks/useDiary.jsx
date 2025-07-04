import {useContext, useState, useEffect} from "react";
import {DiaryStateContext} from "../App";
import {useNavigate} from "react-router-dom";

const useDiary = (id) => {
  // useContext: 일기 데이터 컨텍스트 호출
  const data = useContext(DiaryStateContext);

  // useState: 현재 일기 아이템 저장
  const [curDiaryItem, setCurDiaryItem] = useState();

  // useNavigate: 라우터 이동 함수
  const nav = useNavigate();

  // useEffect: 업데이트 시 현재 일기 데이터를 반환
  useEffect(() => {
    // 일기 데이터 id와 일치하는 아이템 찾기
    // 형이 다를 수 있기 때문에 문자열로 모두 변환하여 정리
    const currentDiaryItem = data.find((item) => String(item.id) === String(id));

    // 현재 일기 아이템이 없을 경우 오류 메시지 출력
    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");

      // 루트 페이지로 이동, 이전 페이지로 돌아가기 방지
      nav("/", {replace: true});
    }

    // curDiaryItem에 id와 일치하는 일기 아이템 저장
    setCurDiaryItem(currentDiaryItem);
  }, [id]);

  // 현재 일기 아이템 반환
  return curDiaryItem;
};

export default useDiary;