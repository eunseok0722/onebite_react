import "./App.css";
import {useReducer, useRef, createContext, useEffect, useState, useLayoutEffect} from "react";
import {Routes, Route, Link, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import NotFound from "./pages/NotFound";
import Edit from "./pages/Edit";
import Button from "./components/Button";
import Header from "./components/Header";
import {getEmotionImage} from "./util/get-emotion-images.js";
import mockData from "./api/mock-data.json";

// 1. "/" : 모든 일기를 조회하는 Home
// 2. "/new" : 새로운 일기를 작성하는 New
// 3. "/edit/:id" : 특정 일기를 수정하는 Edit
// 4. "/diary/:id" : 특정 일기를 조회하는 Diary
// 5. * :  와일드카드, 위 경로가 아닌 경우 404 페이지 보여주기

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE": // return [action.data, ...state];
    {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": // return state.map((item) => (String(item.id) === String(action.data.id) ? action.data : item));
    {
      nextState = state.map((item) => (String(item.id) === String(action.data.id) ? action.data : item));
      break;
    }
    case "DELETE": // return state.filter((item) => String(item.id) !== String(action.targetId));
    {
      nextState = state.filter((item) => String(item.id) !== String(action.targetId));
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(nextState));
  console.log(nextState);
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  // 로딩 문제를 해결하기 위한 로딩 상태 저장
  const [isLoading, setIsLoading] = useState(true);

  // const [data, dispatch] = useReducer(reducer, mockData);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  //
  useLayoutEffect(() => {
    // 데이터가 없을 경우 mockdata 저장
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      localStorage.setItem("diary", JSON.stringify(mockData));
    }
  });

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      setIsLoading(false);
      return;
    }
    const parsedData = JSON.parse(storedData);
    // 데이터가 배열이 아닐 경우 종료
    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });
    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

  // localStorage 사용법

  // 데이터 저장
  // localStorage.setItem("test", "hello");
  // localStorage.setItem("person", JSON.stringify({name: "이정환"}));

  // 데이터 조회
  // console.log(localStorage.getItem("test"));
  // console.log(JSON.parse(localStorage.getItem("person")));

  // 데이터 삭제
  // localStorage.removeItem("test");

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

  // 로딩이 완료되지 않았을 경우
  if (isLoading) {
    return <div>데이터 로딩중입니다...</div>;
  }

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
