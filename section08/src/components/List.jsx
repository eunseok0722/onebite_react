import "./List.css";
import TodoItem from "./TodoItem";
import {useState} from "react";

const List = ({todos, onUpdate, onDelete}) => {
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

  return (
    <div className="List">
      <h4>Todo List ✅</h4>
      <input type="text" placeholder="검색어를 입력하세요." value={search} onChange={onChangeSearch} />
      <div className="todos_wrapper">
        {/* {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))} */}

        {filteredTodos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} onUpdate={onUpdate} onDelete={onDelete} />;
        })}
      </div>
    </div>
  );
};

export default List;
