import { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { notesAtom } from "../atoms/atoms";
import { useParams } from "react-router-dom";

const FluxDetail = () => {
  const { videoId = "" } = useParams();
  const notesLoadable = useRecoilValueLoadable(notesAtom(videoId));
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    if (notesLoadable.state === "hasValue") {
      setNotes(notesLoadable.contents);
    }
  }, [notesLoadable]);

  return (
    <>
      <div>FluxDetails</div>
      <div>{notes}</div>
    </>
  );
};

export default FluxDetail;