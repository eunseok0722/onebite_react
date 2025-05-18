import "./App.css";
// import {useState} from "react";
// import Header from "./components/Header";
// import Main from "./components/Main";
// import Footer from "./components/Footer";
// import Button from "./components/Button";
// import Bulb from "./components/Bulb";
// import Counter from "./components/Counter";
// import Register from "./components/Register";
import HookExam from "./components/HookExam";

// 부모 컴포넌트
function App() {
  // const [count, setCount] = useState(0);
  // const buttonProps = {
  //   text: "메일",
  //   color: "green",
  //   a: 1,
  //   b: 2,
  //   c: 3,
  // };
  // return (
  // <>
  {
    /* <Header />
      <Main />
      <Footer /> */
  }

  {
    /* <Button text={"메일"} color={"red"} />
        <Button text={"카페"} />
        <Button text={"블로그"} /> */
  }
  {
    /* 스프레드 연산자를 이용해서 이렇게 전달하는 것도 가능하다 */
  }
  {
    /* <Button {...buttonProps} /> */
  }
  {
    /* <Button text={"카페"} /> */
  }

  {
    /* 자식요소는 물론이고 컴포넌트도 전달 가능하다 */
  }
  {
    /* <Button text={"블로그"}>
        <span> 자식 요소 </span>
        <Header />
      </Button> */
  }
  {
    /* </> */
  }
  // );

  /* state 자체가 [값, 함수]로 이루어져있기 떄문에 아래와 같이 구조 분해 할당, 비 구조화 할당을 해준다 */
  // const [count, setCount] = useState(0);
  /*   const [light, setLight] = useState("OFF"); */

  return (
    <>
      {/* <h1>현재 카운트 {count}</h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button> */}

      {/* <Counter></Counter> */}
      {/* <br /> */}

      {/* react 앱이 리랜더링 되는 조건 */}
      {/* 1. 자신이 관리하는 state 값이 변경될 경우 */}
      {/* 2. 자신이 관리하는 props의 값이 변경되는 경우 */}
      {/* 3. 부모컴포넌트가 리랜더링 되는 경우 */}

      {/* <h1>전구</h1>
      <button onClick={() => setLight(light === "OFF" ? "ON" : "OFF")}>{light === "ON" ? "끄기" : "켜기"}</button> */}

      {/* 자식컴포넌트는 부모컴포넌트에게 받는 props의 값이 변화하게 되면 리랜더링 하게 된다 */}
      {/* 하나의 앱 안에서 스테이트 변화가 일어나면 불필요한 부분까지 리랜더링이 발생하게 되기 떄문에 앱 안에서 선언하지 않고 따로 컴포넌트를 만든다  */}
      {/* <Bulb light={light}></Bulb> */}
      {/* <button onClick={() => setLight(light === "OFF" ? "ON" : "OFF")}>{light === "ON" ? "끄기" : "켜기"}</button> */}
      {/* <Bulb></Bulb> */}

      {/* <Register /> */}
      <HookExam />
    </>
  );
}

export default App;
