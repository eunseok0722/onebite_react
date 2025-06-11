import {useContext, useState, useEffect} from "react";
import {DiaryStateContext} from "../App";
import {useNavigate} from "react-router-dom";

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();
  const nav = useNavigate();

  useEffect(() => {
    // 형이 다를 수 있기 때문에 문자열로 모두 변환하여 정리
    const currentDiaryItem = data.find((item) => String(item.id) === String(id));

    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");

      // 컴포넌트가 호출될 때 랜더링 하고 싶을 경우 위 경우 랜더링 되지 않는다.
      // 컴포넌트가 랜더링 된 다음에 사용되는 기능이기 때문이다.
      // useEffect hook 사용하면 된다.
      nav("/", {replace: true});
    }

    setCurDiaryItem(currentDiaryItem);
    // }, [params.id, data]);
    // react-router-dom에서 useNavitage 훅이 동기로 진행하다가 비동기로 진행하는 것으로 변경됨
  }, [id]);

  return curDiaryItem;
};

export default useDiary;