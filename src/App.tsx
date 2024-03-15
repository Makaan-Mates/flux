import Body from "./pages/Body";
import { RecoilRoot } from "recoil";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (
    <>
      <Auth0Provider
        domain="sourabhrathour.us.auth0.com"
        clientId="j16YpB4zK6llSTvxuXIzwN4G3GUSwMwS"
        authorizationParams={{
          redirect_uri: "http://masklabs.vercel.app/dashboard/",
        }}
      >
        <RecoilRoot>
          <div className="bg-[#E2E5EB]">
            <Body />
          </div>
        </RecoilRoot>
      </Auth0Provider>
    </>
  );
}

export default App;
