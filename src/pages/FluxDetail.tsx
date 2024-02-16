import { useRecoilValue } from "recoil";
import { notesAtom } from "../atoms/atoms";
import { useParams } from "react-router-dom";
const FluxDetail = () => {
  const { videoId='' } = useParams();
  console.log(videoId)
  const notes = useRecoilValue(notesAtom(videoId));
  console.log(notes);

  return (
    <>
      <div>FluxDetails</div>
      <div>{notes}</div>
    </>
  );
};

export default FluxDetail;
