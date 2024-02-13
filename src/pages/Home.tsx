import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const Home = () => {
  return (
    <div className="l-0 r-0 m-auto flex h-screen w-[50%] flex-col text-center">
      <div className="mt-[25%] flex w-full justify-center space-x-12">
        <Input
          className="w-[50%] bg-[#EBEDF1] shadow-sm focus:outline-none"
          type="email"
          placeholder="Paste your youtube url here"
        />
        <Button
          className="rounded-full bg-[#2d394b] font-medium shadow-md hover:bg-[#0b1828]"
          type="submit"
        >
          Create Flux
        </Button>
      </div>
    </div>
  );
};

export default Home;
