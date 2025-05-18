import "./css/TodoItem.css";
import {memo} from 'react'

const TodoItem = ({id, isDone, content, date, onUpdate, onDelete}) => {

  const onChangeCheckbox = () => {
    onUpdate(id);
  }

  const onClickDelete = () => {
    onDelete(id);
  }
  return (
    <div className="TodoItem">
      <input readOnly checked={isDone} type="checkbox" onChange={onChangeCheckbox}/>
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleString()}</div>
      <button onClick={onClickDelete}>삭제</button>
    </div>
  );
};

// useMemo 사용

// export default memo(TodoItem, (prevProps, nextProps) => {
//   if(prevProps.id !== nextProps.id) return false;
//   if(prevProps.isDone !== nextProps.isDone) return false;
//   if(prevProps.content !== nextProps.content) return false;
//   if(prevProps.date !== nextProps.date) return false;
//   return true; 
// });

// useCallback 사용
export default memo(TodoItem);
