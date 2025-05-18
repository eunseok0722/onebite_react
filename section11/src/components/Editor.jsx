import './css/Editor.css'
import {useState, useRef, useContext} from 'react'
import {TodoContext} from '../App'

const Editor = () => {

  // 컨텍스트 사용
  const {onCreate} = useContext(TodoContext);
  const [content, setContent] = useState("");
  const contentRef = useRef(null);
  const onChangeContent = (e) => {
    setContent(e.target.value);
  }
  const onSubmit = () => {
    // 제출될 때 인풋에 포커스
    contentRef.current.focus();
    if (content === "") return;
    onCreate(content);
    setContent("");
  }
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === 13) {
      onSubmit();
    }
  }
  return (
    <div className="Editor">
      <input ref={contentRef} type="text" placeholder="새로운 Todo..." value={content} onChange={onChangeContent} onKeyDown={onKeyDown} />
      <button type="button" onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
