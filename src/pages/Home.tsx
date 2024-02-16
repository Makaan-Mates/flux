import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { useSetRecoilState } from "recoil";
//import { notesAtom } from "../atoms/atoms";
// import { Skeleton } from "@/components/ui/skeleton";
const Home = () => {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState<string>("");
  const videoId = videoUrl.split("v=")[1];

  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const setNotesAtom = useSetRecoilState(notesAtom);
  const handleCreateFlux = async () => {
    if (videoId) {
      //setIsLoading(true);
      await axios.post("http://localhost:4000/api/createflux", {
        videoId: videoId,
      });
      // console.log(message.data.message);
      // setNotesAtom(message.data.message);
      navigate(`/fluxdetail/${videoId}`);
      //setIsLoading(false);
    }
  };

  return (
    <div className="l-0 r-0 m-auto flex h-screen w-[50%] flex-col text-center">
      <div className="mt-[25%] flex w-full justify-center space-x-12">
        <Input
          className="w-[50%] bg-[#EBEDF1] shadow-sm focus:outline-none"
          type="email"
          placeholder="Paste your youtube url here"
          onChange={(e) => {
            setVideoUrl(e.target.value);
          }}
        />
        <Button
          className="rounded-full bg-[#2d394b] font-medium shadow-md hover:bg-[#0b1828]"
          type="submit"
          onClick={handleCreateFlux}
        >
          Create Flux
        </Button>
      </div>
    </div>
  );
};

export default Home;
