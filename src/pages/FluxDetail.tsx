import { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { notesAtom } from "../atoms/atoms";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useAuth0 } from "@auth0/auth0-react";
import Bookmark from "@/components/custom/Bookmark";

interface Notes {
  title: string;
  description: string;
}

const FluxDetail = () => {
  const { user } = useAuth0();
  const email: string = user?.email || "";
  const { videoId = "" } = useParams();
  const notesLoadable = useRecoilValueLoadable(
    notesAtom({ videoId: videoId, email: email })
  );

  const [notes, setNotes] = useState<Notes>();

  useEffect(() => {
    if (notesLoadable.state === "hasValue") {
      setNotes(notesLoadable.contents);
    }
  }, [notesLoadable]);

  // console.log("notes", notes);

  let descriptionLines: string[] = [];
  if (notes?.description) {
    descriptionLines = notes?.description?.split("\n");
  }

  return (
    <>
      {notesLoadable.state === "loading" ? (
        <div className="flex w-full flex-col items-center ">
          <div className="w-full">
            <Box sx={{ width: "100%" }}>
              <LinearProgress
              // sx={{
              //   backgroundColor: "#a3adbe",
              //   "& .MuiLinearProgress-bar": {
              //     backgroundColor: "#1C2839",
              //   },
              // }}
              />
            </Box>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-2xl font-bold">{notes?.title}</div>

          <div>{notes && <Bookmark videoId={videoId} email={email} />}</div>

          <ul>
            {descriptionLines?.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default FluxDetail;
