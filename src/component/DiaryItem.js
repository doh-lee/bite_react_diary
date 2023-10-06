import React from "react";
import "./DiaryItem.css";
import { getEmotionImgById } from "../util";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const DiaryItem = ({ id, emotionId, content, date }) => {
  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/diary/${id}`)
  }
  const goEdit = () => {
    navigate(`/edit/${id}`);
  }

  return (
    <div className="DiaryItem">
      <div onClick={goDetail} className={["img_section", `img_section_${emotionId}`].join(" ")}>
        <img alt={`emotion${emotionId}`} src={getEmotionImgById(emotionId)} />
      </div>
      <div onClick={goDetail} className="info_section">
        <div className="date_wrapper">
          {new Date(parseInt(date)).toLocaleDateString()}
        </div>
        <div className="content_wrapper">{
          content.length < 25 
          ? content
          : content.slice(0, 25) + '...'
        }</div>
      </div>
      <div className="button_section">
        <Button onClick={goEdit} text={"수정"} />
      </div>
    </div>
  )
}

export default React.memo(DiaryItem);