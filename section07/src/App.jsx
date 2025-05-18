import './App.css'
import { useState, useEffect, useRef } from 'react'
import Viewer from './components/Viewer'
import Controller from './components/Controller'
import Even from './components/Even'
function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  const isMount = useRef(false);
  
  // useEffect(() => {
  //   console.log(`count: ${count} / input: ${input}`);
  // }, [count, input]);
  // 의존성 배열 
  // deps 


  // 1. 마운트 : 탄생
  useEffect(() => {
    console.log(`mount`);
  }, []);

  // 2. 업데이트 : 변화, 리렌더링
  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }
    console.log(`update`);
  });
  // 3. 언마운트 : 죽음
  // even 컴포넌트 안에 예시 있음



  const onClickButton = (value) => {
    setCount(count + value);
    // setCount는 비동기로 호출되기 때문에 즉시 반영되지 않음
    // count 값은 이전 값이 불러와진다
    // 변경된 값을 바로사용하기 위해서는 useEffect를 사용해야 한다
  }

  return (
    <div className='App'>
      <h1>Simple Counter</h1>
      <section>
        <input type="text" value={input} onChange={(e) => {
          setInput(e.target.value);
        }} />
      </section>
      <section>
        <Viewer count={count} />
        {count % 2 === 0 ? <Even /> : null}
      </section>
      <section>
        <Controller onClickButton={onClickButton} />
      </section>
    </div>
  )
}

export default App
