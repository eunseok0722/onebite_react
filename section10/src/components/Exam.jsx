import {useReducer} from "react";

// reducer: 변환기
// -> 상태를 실제로 변환시키는 변환기 역할
const reducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "INCREASE":
      return state + action.data;
    case "DECREASE":
      return state - action.data;
  }
};

export default function Exam() {
  const [state, dispatch] = useReducer(reducer, 0);

  const onClickPlus = () => {
    // 인수: 상태가 어떠게 변화되길 원하는지
    // -> 액션 객체
    dispatch({
      type: "INCREASE",
      data: 1,
    });
  };
  const onClickMinus = () => {
    dispatch({
      type: "DECREASE",
      data: 1,
    });
  };

  return (
    <div>
      <h1>Exam</h1>
      <div>
        <h2>{state}</h2>
        <button onClick={onClickPlus}>+</button>
        <button onClick={onClickMinus}>-</button>
      </div>
    </div>
  );
}
