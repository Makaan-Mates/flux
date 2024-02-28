import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState<string>("");
  const videoId = videoUrl.split("v=")[1];

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleCreateFlux = async () => {
    if (videoId) {
      setIsLoading(true);
      await axios.post("https://flux-backend-production.up.railway.app/api/createflux", {
        videoId: videoId,
        email: user?.email,
      });
      // console.log(message);
      navigate(`/dashboard/fluxdetail/${videoId}`);
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <div className="flex w-full flex-col items-center">
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
      <div className="m-16 flex h-[30%] w-[40%] flex-col items-center justify-center gap-y-2 rounded-lg bg-[#d7dbe3] text-[#2d394b] ">
        <h1 className="text-3xl font-semibold">Creating notes for you...</h1>
        <h2 className="mb-2 font-normal">Please wait for a moment</h2>
        <Box sx={{ display: "flex" }}>
          {/* <CircularProgress sx={{ color: "#2d394b" }} size={30} /> */}
        </Box>
      </div>
    </div>
  ) : (
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
