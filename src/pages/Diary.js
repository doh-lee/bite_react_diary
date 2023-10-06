import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Button from "../component/Button";
import Header from "../component/Header";
import { getFormattedDate, setPageTitle } from "../util";
import Viewer from "../component/Viewer";
import { useEffect } from "react";

const Diary = () => {
  const { id } = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }
  const goEdit = () => {
    navigate(`/edit/${id}`);
  }

  useEffect(() => {
    setPageTitle(`Diary No.${id}`)
  }, [])

  if (!data){
    return <div>Diary loading...</div>;
  }else{
    const { date, emotionId, content } = data;
    const title = `${getFormattedDate(new Date(Number(date)))} 기록`;
    return (
      <div>
        <Header title={title} leftChild={<Button text={"< Home"} onClick={goBack} />} rightChild={<Button text={"수정"} onClick={goEdit} />} />
        <Viewer content={content} emotionId={emotionId} />
      </div>
    )
  }
}

export default Diary