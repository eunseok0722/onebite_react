// 1. 객체 생성
let obj1 = new Object(); // 객체 생성자
let obj2 = {}; // 객체 리터럴 (대부분 이렇게 사용)


// 2. 객체 프로퍼티 (객체 속성)
let person = {
  // key : value,
  name: "Lee",
  age: 37,
  hobby: "fitness",
  job: "developer",
  // 띄어쓰기 하려고 하면 ""로 감싸줘야 함
  "home address": "Seoul"
};


// 3. 객체 프로퍼티를 다루는 방법
// 3.1 특정 프로퍼티에 접근 (점 표기법)
let name = person.name;

// 괄호 표기법 -> 동적으로 불러올 필요가 있을 떄 사용
let age = person["age"];
// 변수로 키값을 받아와서 호출하는 방식이 가능하다.
let property = "hobby";
let hobby = person[property];
console.log(hobby);

// 3.2 새로운 프로퍼티를 추가하는 방법
person.job = "designer";
console.log(person.job);
person["favoriteFood"] = "떡볶이";
console.log(person.favoriteFood);

// 3.3 프로퍼티 수정하는 방법
person.favoriteFood = "라면";
console.log(person.favoriteFood);

// 3.4 프로퍼티 삭제하는 방법
delete person.job;
console.log(person);

// 3.5 프로퍼티의 존재 유무를 확인 (in 연산자)
let result1 = "name" in person;
let result2 = "job" in person;
console.log(result1);
console.log(result2);
