import {useState} from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import useDiaryStore from "../store/useDiaryStore.js";
import usePageTitle from "../hooks/usePageTitle";

// getMonthlyData : 해당 월의 시작점과 끝점을 반환하는 함수
const getMonthlyData = (pivotDate, data) => {
  // 1일 = 해당 월의 첫 날짜의 0시 0분 0초
  const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0);
  // 0일 = 해당 월의 이전 달 마지막 날짜 23시 59분 59초
  const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59);
  return data.filter((item) => item.createdDate >= beginTime && item.createdDate <= endTime);
};

// Home 컴포넌트
const Home = () => {
  // useDiaryStore: 일기 데이터 스토어 호출 (선택적 구독)
  const data = useDiaryStore((state) => state.data);
  // pivotDate: 현재 기준 날짜, 초기값으로 오늘 날짜 저장
  const [pivotDate, setPivotDate] = useState(new Date());

  // usePageTitle: 페이지 타이틀 설정
  usePageTitle("감정일기장");

  // 날짜 변경 함수
  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  // monthlyData: 해당 월의 일기 데이터
  const monthlyData = getMonthlyData(pivotDate, data);

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
        rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
