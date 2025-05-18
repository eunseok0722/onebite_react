// 1. 상수 객체 

const animal = {
    name: '멍멍이',
    type: '개',
    color: '검정색',
}

// 상수객체에 저장을 해도 추가, 수정, 삭제가 모두 가능하다. 
animal.age = 2;
animal.name = "까망이";
delete animal.color;

console.log(animal);


// 2. 메서드
// -> 값이 함수인 프로퍼티

const person = {
  name: "lee",
  sayHi: function() { // 메서드 -> 객제의 동작을 정의
    console.log('Hi');
  }
}

person.sayHi();