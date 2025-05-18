import "./App.css";
import {useState, useRef, useReducer, useCallback, createContext} from "react";
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


function reducer(state, action) {
  switch(action.type) {
    case "CREATE":
      return [action.data, ...state]
    case "UPDATE":
      return state.map((item) => {
        return item.id === action.targetId ? {...item, isDone: !item.isDone} : item;
      })
    case "DELETE":
      return state.filter((item) => {
        return item.id !== action.targetId ? true : false;
      })
    default:
      return state;
  }
}


// 컨텍스트 생성
export const TodoContext = createContext();

function App() {
  // useReducer 사용을 위해 주석 처리
  // const [todos, setTodos] = useState(mockData);

  // useReducer 사용
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  // dispatch 사용 전
  // const onCreate = (content) => {
  //   const newTodo = {
  //     id: idRef.current++,
  //     isDone: false,
  //     content: content,
  //     date: new Date().getTime(),
  //   };
  //   setTodos([newTodo,...todos])
  // };

  // dispatch 사용 후
  // const onCreate = (content) => {
  //   dispatch({
  //     type: "CREATE",
  //     data: {
  //       id: idRef.current++,
  //       isDone: false,
  //       content: content,
  //       date: new Date().getTime(),
  //     },
  //   });
  // }

  // useCallback 사용
  // 불필요하게 재생성되는 함수를 방지하기 위해 useCallback 사용
  // useCallback(콜백 함수, 의존성 배열)
  // deps가 비어있으니까 함수를 memoization 하여 불필요하게 재생성되는 함수를 방지
  const onCreate = useCallback((content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  // dispatch 사용 전
  // const onUpdate = (targetId) => {
  //   // todos State의 값들 중에
  //   // targetId와 일치하는 id를 갖는 투두 아이템의 isDone 변경
  //   setTodos(todos.map((todo) => {
  //     return todo.id === targetId ? {...todo, isDone: !todo.isDone} : todo;
  //   }))
  // }

  // dispatch 사용 후
  // const onUpdate = (targetId) => {
  //   dispatch({
  //     type: "UPDATE",
  //     targetId: targetId,
  //   })
  // }

  // useCallback 사용
  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  }, []);

  // dispatch 사용 전
  // const onDelete = (targetId) => {
  //   setTodos(
  //     todos.filter((todo) => {
  //       return todo.id !== targetId ? true : false;
  //     })
  //   );
  // }

  // dispatch 사용 후
  // const onDelete = (targetId) => {
  //   dispatch({
  //     type: "DELETE",
  //     targetId: targetId,
  //   })
  // }

  // useCallback 사용
  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <TodoContext.Provider value={{todos, onCreate, onUpdate, onDelete}}>
        <Editor />
        <List />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
