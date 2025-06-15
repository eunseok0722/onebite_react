// import { useSearchParams } from "react-router-dom";
import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {DiaryStateContext} from "../App";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import usePageTitle from "../hooks/usePageTitle";

const getMonthlyData = (pivotDate, data) => {
  // 1일 = 해당 월의 첫 날짜의 0시 0분 0초
  const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0);
  // 0일 = 해당 월의 이전 달 마지막 날짜
  const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59);
  return data.filter((item) => item.createdDate >= beginTime && item.createdDate <= endTime);
};

const Home = () => {
  // 쿼리 파라미터 사용하는 방법
  // const [params, setParams] = useSearchParams();

  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const nav = useNavigate();

  usePageTitle("감정일기장");

  // 날짜 변경 함수
  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

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
