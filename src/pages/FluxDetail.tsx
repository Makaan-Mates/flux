import { useRecoilValue } from "recoil";
import { notesAtom } from "../atoms/atoms";
const FluxDetail = () => {
  const notes = useRecoilValue(notesAtom);

  return (
    <>
      <div>FluxDetails</div>
      <div>{notes}</div>
    </>
  );
};

export default FluxDetail;
