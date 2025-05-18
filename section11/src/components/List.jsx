import "./css/List.css";
import TodoItem from "./TodoItem";
import {useState, useMemo, useContext} from "react";
import {TodoContext} from '../App'

const List = () => {
  const { todos } = useContext(TodoContext);
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") return todos;
    // 검색어에 대소문자 구분 없애기 toLowerCase()
    return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()));
  };
  const filteredTodos = getFilteredData();

  // const getAnalyzedData = () => {
  //   // search에 무엇을 입력하면 입력할 때마다 호출되는 문제가 발생한다.
  //   console.log("getAnalyzedData 호출");
  //   const totalCount = todos.length;
  //   const doneCount = todos.filter((todo) => todo.isDone).length;
  //   const notDoneCount = totalCount - doneCount;

  //   return {
  //     totalCount,
  //     doneCount,
  //     notDoneCount,
  //   };
  // };
  // const {totalCount, doneCount, notDoneCount} = getAnalyzedData();

  // useMemo (콜백 함수, 의존성 배열)
  // deps: 의존성 배열
  // deps에 있는 값이 변경되면 콜백 함수가 호출됨
  const {totalCount, doneCount, notDoneCount} = useMemo(() => {
    console.log("getAnalyzedData 호출");
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;

    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);


  return (
    <div className="List">
      <h4>Todo List ✅</h4>
      <div>
        <div>TOTAL: {totalCount}</div>
        <div>DONE: {doneCount}</div>
        <div>NOT DONE: {notDoneCount}</div>
      </div>
      <input type="text" placeholder="검색어를 입력하세요." value={search} onChange={onChangeSearch} />
      <div className="todos_wrapper">
        {/* {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))} */}

        {filteredTodos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </div>
    </div>
  );
};

export default List;
