import Body from "./pages/Body";
import { RecoilRoot } from "recoil";
function App() {
  return (
    <>
      <RecoilRoot>
        <div className="bg-[#E2E5EB]">
          <Body />
        </div>
      </RecoilRoot>
    </>
  );
}

export default App;
