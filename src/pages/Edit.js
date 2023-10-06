import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Button from "../component/Button";
import Header from "../component/Header";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import Editor from "../component/Editor";
import { setPageTitle } from "../util";

const Edit = () => {
  const { id } = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);

  const goBack = () => {
    navigate(-1);
  }
  const onClickDelete = () => {
    if(window.confirm("Are you sure you want to delete this diary?")){
      onDelete(id);
      navigate("/", {replace: true});
    }
  }
  const onSubmit = (data) => {
    if(window.confirm("Are you sure you want to edit this diary?")){
      const { date, content, emotionId } = data;
      onUpdate(id, date, content, emotionId);
      navigate("/", {replace: true});
    }
  }

  useEffect(() => {
    setPageTitle(`Diary No.${id} edit`)
  }, [])

  if(!data){
    return <div>Diary loading...</div>
  }else{
    return (
      <div>
        <Header title={"Diary Edit"} leftChild={<Button text={"<"} onClick={goBack} />} rightChild={<Button type={"negative"} text={"delete"} onClick={onClickDelete} />} />
        <Editor initData={data} onSubmit={onSubmit} />
      </div>
    )
  }
}

export default Edit