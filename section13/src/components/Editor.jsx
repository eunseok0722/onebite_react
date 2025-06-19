import "./Editor.css";
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/constants";
import { getStringedDate } from "../util/get-stringed-date";

// Editor 컴포넌트
const Editor = ({onSubmit, initData}) => {
  const nav = useNavigate();

  // useState: 초기값 저장
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });

  // useEffect: props를 통해 수신된 initData가 있을 경우 초기값 저장
  useEffect(() => {
    if (initData) {
      setInput({...initData, createdDate: new Date(Number(initData.createdDate))});
    }
  }, [initData]);

  // onChangeInput: 입력 이벤트 핸들러
  const onChangeInput = (e) => {
    console.log(e.target.name); // 어떤 요소에 입력이 들어온건지
    console.log(e.target.value); // 입력값이 무엇인지?

    // 입력값이 텍스트로 오기 때문에 date 객체로 변환하는 과정
    let name = e.target.name;
    let value = e.target.value;

    // 날짜 입력 시 날짜 객체로 변환
    if (name === "createdDate") {
      value = new Date(value);
    }

    // 입력값 저장
    setInput({
      ...input,
      [name]: value,
    });
  };

  // onSubmitButtonClick: 작성 완료 버튼 클릭 이벤트 핸들러
  const onSubmitButtonClick = () => {
    // onSubmit: 작성 완료 버튼 클릭 시 호출되는 함수
    onSubmit(input);
  }

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        {/* name속성을 통해 어떤 요소에 입력이 들어가는지 알려줌 */}
        <input name="createdDate" type="date" value={getStringedDate(input.createdDate)} onChange={onChangeInput} />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
              onClick={() =>
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea name="content" placeholder="오늘은 어땠나요?" onChange={onChangeInput} value={input.content} />
      </section>
      <section className="button_section">
        <Button text={"취소하기"} onClick={() => nav(-1)} />
        <Button text={"작성완료"} type={"POSITIVE"} onClick={onSubmitButtonClick} />
      </section>
    </div>
  );
};

export default Editor;
