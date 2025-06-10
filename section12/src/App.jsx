import "./App.css";
import {useReducer, useRef, createContext} from "react";
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

const mockData = [
  {
    id: 1,
    createdDate: new Date("2025-06-01").getTime(),
    emotionId: 1,
    content: "1번 일기내용",
  },
  {
    id: 2,
    createdDate: new Date("2025-05-31").getTime(),
    emotionId: 2,
    content: "2번 일기내용",
  },
  {
    id: 3,
    createdDate: new Date("2025-06-02").getTime(),
    emotionId: 3,
    content: "3번 일기내용",
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) => (String(item.id) === String(action.data.id) ? action.data : item));
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.targetId));
    default:
      return state;
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  // useNavigate 훅을 사용한 라우터 이동
  // const navigate = useNavigate();

  // const onClickButton = () => {
  //   navigate("/new");
  // }

  const [data, dispatch] = useReducer(reducer, mockData);

  // 일기 초기 데이터 3
  const idRef = useRef(4);

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
