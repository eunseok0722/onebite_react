import "./App.css";
import {useEffect, useLayoutEffect} from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import NotFound from "./pages/NotFound";
import Edit from "./pages/Edit";
import mockData from "./api/mock-data.json";
// 스토어 호출
import useDiaryStore from "./store/useDiaryStore.js";

// 1. "/" : 모든 일기를 조회하는 Home
// 2. "/new" : 새로운 일기를 작성하는 New
// 3. "/edit/:id" : 특정 일기를 수정하는 Edit
// 4. "/diary/:id" : 특정 일기를 조회하는 Diary
// 5. * :  와일드카드, 위 경로가 아닌 경우 404 페이지 보여주기

// App 컴포넌트
const App = () => {
  // useDiaryStore: 일기 데이터 상태 관리
  // const {isLoading, initData, setIsLoading, setIdRef} = useDiaryStore();
  const isLoading = useDiaryStore((state) => state.isLoading);
  const initData = useDiaryStore((state) => state.initData);
  const setIsLoading = useDiaryStore((state) => state.setIsLoading);
  const setIdRef = useDiaryStore((state) => state.setIdRef);
  

  // useLayoutEffect: 데이터 초기화
  useLayoutEffect(() => {
    // 데이터가 없을 경우 mockdata 저장
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      localStorage.setItem("diary", JSON.stringify(mockData));
    }
  });

  // useEffect: 데이터 초기화
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

    // 데이터의 최대 번호 찾기
    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });
    setIdRef(maxId + 1);
    initData(parsedData);
    setIsLoading(false);
  }, []);

  // 로딩이 완료되지 않았을 경우
  if (isLoading) {
    return <div>데이터 로딩중입니다...</div>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
