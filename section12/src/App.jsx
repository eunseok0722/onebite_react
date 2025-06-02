import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import NotFound from "./pages/NotFound";
import Button from "./components/Button";
import { getEmotionImage } from "./util/get-emotion-images.js";

// 1. "/" : 모든 일기를 조회하는 Home
// 2. "/new" : 새로운 일기를 작성하는 New
// 3. "/edit/:id" : 특정 일기를 수정하는 Edit
// 4. "/diary/:id" : 특정 일기를 조회하는 Diary
// 5. * :  와일드카드, 위 경로가 아닌 경우 404 페이지 보여주기

function App() {

  // useNavigate 훅을 사용한 라우터 이동
  const navigate = useNavigate();

  const onClickButton = () => {
    navigate("/new");
  }

  return (

    <>
      <Button text="New" />

      {/* 이미지 import 예시 */}
      {/* <img src={getEmotionImage(1)} alt="emotion1" /> */}

      {/* 라우터 이동 예시 */}
      {/* <Link to="/">Home</Link> */}

      {/* 버튼 클릭 이벤트 예시 */}
      {/* <button onClick={onClickButton}>New</button> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>


  );
}

export default App;
