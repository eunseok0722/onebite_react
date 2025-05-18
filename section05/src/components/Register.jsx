import {useState, useRef} from "react";

const Register = () => {
  // const [name, setName] = useState("이름");
  // const [birth, setBirth] = useState("");
  // const [country, setCountry] = useState("");
  // const [bio, setBio] = useState("");

  // const onChangeName = (e) => {
  //   setName(e.target.value);
  // };
  // const onChangeBirth = (e) => {
  //   setBirth(e.target.value);
  // };
  // const onChangeCountry = (e) => {
  //   setCountry(e.target.value);
  // };
  // const onChangeBio = (e) => {
  //   setBio(e.target.value);
  // };

  // 반복적으로 하는 것을 배열로 만들어서 진행할 예정
  const [input, setInput] = useState({
    name: "이름",
    birth: "",
    country: "",
    bio: "",
  });

  //  const onChangeName = (e) => {
  //    setInput({
  //      // 기존 값이 변경되지 않도록 기존 값을 먼저 스프레드 연산자로 불러오는 역할을 한다.
  //      ...input,
  //      name: e.target.value,
  //    });
  //  };
  //  const onChangeBirth = (e) => {
  //    setInput({
  //      ...input,
  //      birth: e.target.value,
  //    });
  //  };
  //  const onChangeCountry = (e) => {
  //    setInput({
  //      ...input,
  //      country: e.target.value,
  //    });
  //  };
  //  const onChangeBio = (e) => {
  //    setInput({
  //      ...input,
  //      bio: e.target.value,
  //    });
  //  };

  // 현재값을 저장하는 객체
  // 래퍼런스 객체는 리렌더링을 발생시키지 않아야되는 변수를 만들 때 된다
  const countRef = useRef(0);
  // count = 0; 
  // 위와 같이 useRef()를 사용하지 않으면 리랜더링 되는 상황에서 초기화가 되기 때문에 
  // 1. state 값 변화에 따라 리랜더링 될 때 값 변화가 적용되지 않는다.
  // 2. 컴포넌트가 여러번 재사용 될 때 동일한 변수이기 때문에 중복해서 변경되게된다.
  const inputRef = useRef();

  // 통합버전
  const onChange = (e) => {
    countRef.current++;
    console.log(countRef.current);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    if(input.name === "이름") {
      // 이름을 입력하지 않았을 떄 해당 DOM 요소 포커스
      console.log(inputRef.current);

      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }

  return (
    <div>
      <button onClick={onChange}>ref + 1</button>

      <div>
        <h2>이름</h2>
        {/* ref를 저장하면 해당 요소가 레퍼런스 객체에 저장되게 된다 */}
        <input name="name" ref={inputRef} value={input.name} onChange={onChange} placehoder={"이름"} />
        <br />
        {input.name}
      </div>
      <div>
        <h2>생년월일</h2>
        <input name="date" type="date" value={input.birth} onChange={onChange} />
        <br />
        {input.birth}
      </div>
      <div>
        <h2>국적</h2>
        <select name="country" value={input.country} onChange={onChange}>
          <option value=""></option>
          <option value="일본">일본</option>
          <option value="미국">미국</option>
          <option value="한국">한국</option>
        </select>
        <br />
        {input.country}
      </div>
      <div>
        <h2>자기소개</h2>
        <textarea name="bio" onChange={onChange}></textarea>
        <br />
        <div style={{maxWidth: "50%", textWrap: "pre"}}>{input.bio}</div>
      </div>

      <div>
        <button onClick={onSubmit}>제출</button>
      </div>
    </div>
  );
};

export default Register;
