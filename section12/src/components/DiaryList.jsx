import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import "./DiaryList.css";


const DiaryList = ({data}) => {

  const [sortType, setSortType] = useState("latest");

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    return data.toSorted((a,b) => {
      if(sortType === "oldest"){
        // 오래된 일기 앞으로 배치
        return Number(a.createdDate) - Number(b.createdDate);
      }else{
        // 최신 일기 앞으로 배치
        return Number(b.createdDate) - Number(a.createdDate);
      }
    });
  };

  const sortedData = getSortedData();

  const nav = useNavigate();
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

