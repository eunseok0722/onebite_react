// 1. 콜백함수

// 자신이 아닌 다른 함수에, 인수로써 전달된 함수

function main(value) {
  document.write(value()); // 값으로 함수를 받아서 sub라는 함수를 호출하는 것이다.
}

function sub() {
  return "I am sub";
}

main(sub);


// 2. 콜백함수의 활용

function repeat(count, callback) {
  for (let idx = 0; idx <= count; idx++) {
    callback(idx);
  }
}
// 중복 함수를 줄이는 법

repeat(5, (idx) => {
  console.log(idx);
});

repeat(5, (idx) => {
  console.log(idx * 2);
})