function add10(num) {
  const promise = new Promise((resolve, reject) => {
    // 비동기 작업 실행하는 함수
    // executor

    setTimeout(() => {
      // console.log('안녕');

      // 성공
      // resolve("안녕");

      // 실패
      // reject("왜 실패했는지 이유...");

      // const num = 10;

      if (typeof num === "number") {
        resolve(num + 10);
      } else {
        reject("num이 숫자가 아닙니다.");
      }
    }, 1000);
  });

  return promise;
}

// Pending 상태
// console.log(promise);

// setTimeout(() => {
//   console.log(promise);
// }, 3000); // 3초 뒤에 실행

// then 메서드
// resolve 상태일 경우 실행
// promise
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// reject 상태일 경우 실행
// promise.catch((error) => {
//   console.error(error);
// });

add10(0)
  .then((result) => {
    console.log(result);
    // 콜백 지옥이 나타날 수 있음
    // const newP = add10(result);
    // newP.then((result) => {
    //   console.log(result);
    // });

    return add10(result);
  })
  .then((result) => {
    console.log(result);
    // return add10(result);
    return add10(undefined);
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
