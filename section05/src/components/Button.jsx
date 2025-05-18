// const Button = ({props}) => {
//   return (
//     <button style={{color: props.color}}>
//       {props.text} - {props.color.toUpperCase()}
//     </button>
//   );
// };
// 기본값을 넣기 위해서 구조분해할당을 이용

const Button = ({children, text, color = "black"}) => {
  const onClickButton = () => {
    console.log(text);
  };

  return (
    <button 
    // onClick={() => {console.log(text)}}
    onClick={onClickButton} 
    style={{color: color}}>
      {text} - {color.toUpperCase()}
      {children}
    </button>
  );
};

// Button.defaultProps = {
//   color : "black",
// }

export default Button;
