import "./EmotionItem.css";
import { getEmotionImage } from "../util/get-emotion-images";

// EmotionItem 컴포넌트
const EmotionItem = ({ emotionId, emotionName, isSelected, onClick}) => {
  return (
    <div className={`EmotionItem ${isSelected ? `emotion_on_${emotionId}` : ""}`} onClick={onClick}>
      <img className="emotion_img" src={getEmotionImage(emotionId)} alt="" />
      <div className="emotion_name">{emotionName}</div>
    </div>
  )
}

export default EmotionItem;