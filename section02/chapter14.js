// async
// 어떤 함수를 비동기 함수로 만들어주는 키워드
// 함수가 프로미스를 반환하도록 변환해주는 키워드

async function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "이정환",
        id: "winterlood",
      });
    }, 1000);
  });
}

console.log(getData());

// await
// async 함수 안에서만 사용 가능
// 비동기 함수가 다 처리되기 기다리는 역할

async function printData() {
  // await 를 쓰지 않을 떄 
  // getData().then((result) => {
  //   console.log(result);
  // })

  const data = await getData();
  console.log(data);
}

printData();