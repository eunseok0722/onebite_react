// JSX 주의 사항
// 1. 중괄호 내부에는 자바스크립트 표현식만 넣을 수 있다.
// 2. 숫자, 문자열, 배열 값만 렌더링 된다.
// 3. 모든 태그는 닫혀있어야한다.
// 4. 최상위 태그는 반드시 하나여야만 한다.

import "./Main.css";

const Main = () => {
  // const number = 10;
  // const obj = {a: 1, b: 2};

  // return <main>
  //   <h1>main</h1>
  //   {/* 삼항연산자와 숫자까지만 중괄호 안에 들어갈 수 있음 */}
  //   <h2>{number + 10}</h2>
  //   <h2>{number % 2 === 0 ? "짝수" : "홀수"}</h2>

  //   {/* 조건문 사용 시 주의사항 불가능 */}
  //   {true} {undefined} {null} {NaN}

  //   {/* 객체는 중괄호 안에 넣으면 정상적으로 렌더링이 되지 않음 */}
  //   {obj.a}
  // </main>;

  const user = {
    name: "이정환",
    isLogin: true,
  };

  // return <>{user.isLogin ? <div>로그아웃</div> : <div>로그인</div>}</>;

  if (user.isLogin) {
    // 스타일을 설정하는 방법
    // 1. 인라인 스타일 만들기 객체를 전달하기 때문에 중괄호를 한번 더
    // 인라인 스타인 적용 방식
    // return <div style={{
    //   backgroundCOlor: "red",
    //   borderBottom: "5px solid blue",
    // }}>로그아웃</div>;


    // 2. import 문을 이용해서 css를 적용한 방식
    return <div className="logout">로그아웃</div>;
  } else {
    return <div>로그인</div>;
  }
  // 편한 방식으로 선택해서 하면 될 것

  
};

export default Main;
