import "./DiaryList.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "./Button";
import DiaryItem from "./DiaryItem";


// DiaryList 컴포넌트
const DiaryList = ({data}) => {
  // useState: 정렬 타입 상태 관리 latest, oldest
  const [sortType, setSortType] = useState("latest");
  const nav = useNavigate();

  // onChangeSortType: 정렬 타입 변경 이벤트 핸들러
  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  // getSortedData: 정렬된 일기 데이터 반환
  const getSortedData = () => {
    return data.toSorted((a, b) => {
      if (sortType === "oldest") {
        // 오래된 일기 앞으로 배치
        return Number(a.createdDate) - Number(b.createdDate);
      } else {
        // 최신 일기 앞으로 배치
        return Number(b.createdDate) - Number(a.createdDate);
      }
    });
  };

  // sortedData: 정렬된 일기 데이터
  const sortedData = getSortedData();

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select value={sortType} onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button text={"새 일기 쓰기"} type={"POSITIVE"} onClick={() => nav("/new")} />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;

