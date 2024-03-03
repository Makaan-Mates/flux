import { IoSearch } from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Sidebar = () => {
  const { logout, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  // console.log(isAuthenticated);
  console.log(user);

  const [params, setParams] = useSearchParams();
  console.log(params.get("code"));

  // exhanging code for access token
  const storeUserData = async () => {
    if (user) {
      await axios.post("http://localhost:4000/user/create", {
        email: user.email,
        name: user.name,
        photoUrl: user.picture,
      });
      // console.log(response);
    }
  };

  useEffect(() => {
    const getAccessToken = async () => {
      if (params.get("code")) {
        const response = await axios.post(
          "http://localhost:4000/api/accesstoken",
          {
            code: params.get("code"),
          },
        );

        console.log(response);
        if (response?.data?.message?.access_token) {
          localStorage.setItem(
            "accessToken",
            response?.data?.message?.access_token,
          );
        }
      }
    };

    getAccessToken();
  }, [params.get("code")]);

  useEffect(() => {
    if (isAuthenticated) {
      storeUserData();
    }
  }, [user, isAuthenticated]);

  return (
    <>
      <div className="h-screen w-56 bg-[#1C2839] shadow-md shadow-[#B4B4B4]">
        <div className="branding ml-14 mt-7 flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-[#E2E5EB]"></div>
          <h1 className="text-3xl font-extrabold text-[#E2E5EB]">flux</h1>
        </div>
        <div className="search-container ml-4 mt-8">
          <div className="flex h-8 w-[185px] cursor-pointer items-center rounded-md bg-[#2A3647] pl-4 text-[#B7BFCC]">
            <IoSearch className="text-md text-[#B7BFCC]" />
            <label className="cursor-pointer pl-4 text-base">Search</label>
          </div>
        </div>
        <div
          className="ml-4 mt-10 flex cursor-pointer items-center gap-2 text-base text-[#E2E5EB] hover:bg-slate-600"
          onClick={() => navigate("/dashboard")}
        >
          <IoAddCircle className="text-xl" />
          <label className="cursor-pointer ">New Flux</label>
        </div>
        <div
          className="ml-4 mt-4 flex items-center gap-2 text-base text-[#E2E5EB] hover:bg-slate-600"
          onClick={() => navigate("/dashboard/bookmarkednotes")}
        >
          <IoAddCircle className="text-xl" />
          <label>Bookmarks</label>
        </div>
        <div className="m-8 p-4 text-white">{user?.name}</div>
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
          className="m-8 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        >
          Logout
        </button>

        <a href="https://api.notion.com/v1/oauth/authorize?client_id=d022d63c-bf14-4483-b742-8f261dbcc2f3&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fdashboard">
          <button>Connect to Notion</button>
        </a>
      </div>
    </>
  );
};

export default Sidebar;
