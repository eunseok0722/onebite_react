import "./App.css";
import {useState, useRef} from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";

// 다시 생성하지 않도록 App 외부에 선언
const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "잠자기",
    date: new Date().getTime(),
  },
];

function App() {
  const [todos, setTodos] = useState(mockData);
  const idRef = useRef(3);
  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };
    setTodos([newTodo,...todos])
  };

  const onUpdate = (targetId) => {
    // todos State의 값들 중에
    // targetId와 일치하는 id를 갖는 투두 아이템의 isDone 변경
    setTodos(todos.map((todo) => {
      return todo.id === targetId ? {...todo, isDone: !todo.isDone} : todo;
    }))
  }

  const onDelete = (targetId) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== targetId ? true : false;
      })
    );
  }


  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
