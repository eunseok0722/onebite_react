// 1. 함수 표현식
function funcA() {
  console.log('funcA');
}

let varA = funcA;
varA();


// 여기서는 funcB를 이용해서 함수를 호출할 수 없기 때문에 익명함수로 만든다 
// 값으로 취급되기 때문에 함수 호이스팅을 할 수 없다 
let varB = function funcB() {
  console.log('funcB');
}

varB();

// 2. 화살표 함수 
let varC = (value) => {
  return value;
};
document.write(varC(10));