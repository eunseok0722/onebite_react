// import {useState} from "react";
import useInput from "../hooks/useInput";

// 3가지 hook 관련된 팁
// 1. 함수 컴포넌트, 커스텀 훅 내부에서만 호출 가능
// 2. 조건부로 호출될 수 없다
//     불러오는 순서가 엉망이 될 수 있기 떄문이다
// 3. 나만의 훅(Custrom Hook) 직접 만들 수 있다.

// 함수명 앞에 use- 를 이용해서 만들어주면 커스텀 훅으로 인식해서 안에서 훅을 사용할 수 있게 된다
// function useInput() {
//   const [input, setInput] = useState("");
//   const onChange = (e) => {
//     setInput(e.target.value);
//   };

//   return [input, onChange];
// }

const HookExam = () => {
  const [input, onChange] = useInput();

  return (
    <div>
      <input value={input} onChange={onChange} />
      {input}
    </div>
  );
};

export default HookExam;
