import "./App.css";
import {useReducer, useRef, createContext, useEffect, useState} from "react";
import {Routes, Route, Link, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import NotFound from "./pages/NotFound";
import Edit from "./pages/Edit";
import Button from "./components/Button";
import Header from "./components/Header";
import {getEmotionImage} from "./util/get-emotion-images.js";

// 1. "/" : 모든 일기를 조회하는 Home
// 2. "/new" : 새로운 일기를 작성하는 New
// 3. "/edit/:id" : 특정 일기를 수정하는 Edit
// 4. "/diary/:id" : 특정 일기를 조회하는 Diary
// 5. * :  와일드카드, 위 경로가 아닌 경우 404 페이지 보여주기

// const mockData = [
//   {
//     id: 1,
//     createdDate: new Date("2025-06-01").getTime(),
//     emotionId: 1,
//     content: "1번 일기내용",
//   },
//   {
//     id: 2,
//     createdDate: new Date("2025-05-31").getTime(),
//     emotionId: 2,
//     content: "2번 일기내용",
//   },
//   {
//     id: 3,
//     createdDate: new Date("2025-06-02").getTime(),
//     emotionId: 3,
//     content: "3번 일기내용",
//   },
// ];

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      // return [action.data, ...state];
      {
        nextState = [action.data, ...state];
        break;
      }
    case "UPDATE":
      // return state.map((item) => (String(item.id) === String(action.data.id) ? action.data : item));
      {
        nextState = state.map((item) => (
          String(item.id) === String(action.data.id) 
          ? action.data 
          : item
        ));
        break;
      }
    case "DELETE":
      // return state.filter((item) => String(item.id) !== String(action.targetId));
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
  // useNavigate 훅을 사용한 라우터 이동
  // const navigate = useNavigate();

  // const onClickButton = () => {
  //   navigate("/new");
  // }

  // 로딩 문제를 해결하기 위한 로딩 상태 저장
  const [isLoading, setIsLoading] = useState(true);

  // const [data, dispatch] = useReducer(reducer, mockData);
  const [data, dispatch] = useReducer(reducer, []);

  // 일기 초기 데이터 3
  // const idRef = useRef(4);
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      setIsLoading(false);
      return;
    }
    const parsedData = JSON.parse(storedData);
    // 데이터가 배열이 아닐 경우 종료
    if(!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    })
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
  // localStorage는 배열을 저장하지 못하기 때문에 문자열로 변경해야한다.
  // localStorage.setItem("person", JSON.stringify({name: "이정환"}));

  // 데이터 조회
  // console.log(localStorage.getItem("test"));
  // 문자열로 받은 객체값을 객체로 변경해주는 기능
  // undefined, null 일 경우 오류 발생하기 때문에 주의
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
      {/* <Header title={"header"} leftChild={<Button text={"<"} />} rightChild={<Button text={">"} />} /> */}

      {/* 버튼 클릭 이벤트 예시 */}
      {/* <Button text={"New"} type={"POSITIVE"} onClick={onClickButton} /> */}

      {/* 이미지 import 예시 */}
      {/* <img src={getEmotionImage(1)} alt="emotion1" /> */}

      {/* 라우터 이동 예시 */}
      {/* <Link to="/">Home</Link> */}

      {/* 버튼 클릭 이벤트 예시 */}
      {/* <button onClick={onClickButton}>New</button> */}

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
