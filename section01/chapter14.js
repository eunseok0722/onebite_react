// 스코프 : 변수나 함수에 접근하거나 호출할 수 있는 범위

// 전역 스코프 -> 전체 영역에서 접근 가능
let a = 1;

function funcA() {
  let b = 2; // 지역 스코프
  console.log(a);
  function funcB() { // 지역스코프를 가지게 된다
    let c = 3;
    console.log(b);
  }
}

funcA();
// 지역 스코프 -> 특정 영역에서 접근 가능
// 중괄호 안에는 지역스코프이기 때문에 어렵다
if (true) {
  let c = 3;
  function funcC() {
    let e = 5;
  }
}

for (let i = 0; i < 5; i++) {
  let d = 4;
  function funcC() { // 반복문이나 의문문에서 선언 시 전역스코프를 가지게 된다. 
    let e = 5;
    return e;
  }
}

funcC();