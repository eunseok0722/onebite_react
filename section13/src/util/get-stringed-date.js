// 날짜 형식을 문자열로 변환하는 함수
export const getStringedDate = (date) => {
  // 날짜 -> YYY-MM-DD
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};
