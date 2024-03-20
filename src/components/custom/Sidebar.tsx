import { IoSearch } from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Customkey from "./CustomKey";
import { IoBookmarks } from "react-icons/io5";
import { SiInfluxdb } from "react-icons/si";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdKeyboardCommandKey } from "react-icons/md";
import { useRecoilState } from "recoil";
import { SearchBoxAtom } from "../../atoms/atoms";
import { IoIosArrowBack } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

const Sidebar = () => {
  const { logout, user, isAuthenticated } = useAuth0();
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const navigate = useNavigate();
  const [toggleCustomKey, setToggleCustomKey] = useState<boolean>(false);
  const [toggleProfile, setToggleProfile] = useState<boolean>(false);
  // console.log(user)
  const [toggleSearch, setToggleSearch] = useRecoilState(SearchBoxAtom);
  const [toggleSideBar, setToggleSideBar] = useState<boolean>(false);

  const [params] = useSearchParams();

  const redirectUri =
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_LOCAL_REDIRECT_URI
      : import.meta.env.VITE_PROD_REDIRECT_URI;

  useEffect(() => {
    const storeUserData = async () => {
      if (user) {
        await axios.post(`${apiUrl}/user/create`, {
          email: user.email,
          name: user.name,
          photoUrl: user.picture,
        });
      }
    };

    if (isAuthenticated) {
      storeUserData();
    }
  }, [user, isAuthenticated, apiUrl]);

  // exhanging code for access token

  useEffect(() => {
    const getAccessToken = async () => {
      if (params.get("code")) {
        const response = await axios.post(`${apiUrl}/api/accesstoken`, {
          code: params.get("code"),
        });

        console.log(response);
        if (response?.data?.message?.access_token) {
          localStorage.setItem(
            "accessToken",
            response?.data?.message?.access_token
          );
        }
      }
    };

    getAccessToken();
  }, [params]);

  const handleToggleCustomKey = () => {
    setToggleCustomKey(!toggleCustomKey);
  };

  const toggleCustomKeyVisibility = () => {
    setToggleCustomKey(!toggleCustomKey);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setToggleSideBar(false);
      }
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <>
      {toggleSideBar ? (
        <div
          onClick={() => {
            setToggleSideBar(!toggleSideBar);
          }}
          className="absolute top-3 left-2"
        >
          <RxHamburgerMenu />
        </div>
      ) : (
        <div
          className={`  sticky top-0 max-h-screen w-56 bg-[#1C2839] shadow-md shadow-[#B4B4B4] ${
            toggleSideBar ? "max-md:hidden" : ""
          }`}
        >
          <div className="branding flex h-[10vh] items-center justify-center gap-2 py-5 ">
            <IoIosArrowBack
              onClick={() => {
                setToggleSideBar(!toggleSideBar);
              }}
              className="text-white text-xl absolute top-2 right-2 md:hidden"
            />
            <SiInfluxdb className="text-2xl text-white " />
            <h1 className="text-3xl font-extrabold text-[#E2E5EB]">flux</h1>
          </div>
          <div className="flex h-[90vh] flex-col items-center justify-between">
            {" "}
            <div className="">
              <div className="search-container  mt-8 flex items-center ">
                <div
                  onClick={() => {
                    setToggleSearch(!toggleSearch);
                  }}
                  className="flex h-8 w-[185px] cursor-pointer items-center justify-between rounded-md bg-[#2A3647] pl-4 text-[#B7BFCC]"
                >
                  <div className="flex cursor-pointer items-center ">
                    <IoSearch className="text-md text-[#B7BFCC]" />
                    <label className="cursor-pointer pl-2 text-base">
                      Search
                    </label>
                  </div>

                  <div className="hidden sm:flex  items-center border-[1px] border-[#363636] rounded-md text-sm px-1 ">
                    <MdKeyboardCommandKey className=" text-[#9B9B9B]  " />
                    <span>K</span>
                  </div>
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
                <IoBookmarks className="text-xl" />
                <label>Bookmarks</label>
              </div>
            </div>
            <div className="flex flex-col justify-center px-2">
              <div className="my-2 flex h-10 cursor-pointer items-center justify-center rounded-md bg-[#2A3647] px-2 py-2 text-[#B7BFCC]">
                <a
                  href={`https://api.notion.com/v1/oauth/authorize?client_id=d022d63c-bf14-4483-b742-8f261dbcc2f3&response_type=code&owner=user&redirect_uri=${encodeURIComponent(
                    redirectUri
                  )}`}
                >
                  <button>Connect to Notion</button>
                </a>
              </div>

              <div
                onClick={handleToggleCustomKey}
                className="flex h-10 w-52 cursor-pointer items-center justify-center rounded-md bg-[#2A3647] px-2 py-2 text-[#B7BFCC]"
              >
                <FaPlus className="text-sm text-[#B7BFCC]" />
                <label className="cursor-pointer pl-1 text-sm">
                  Enter your OpenAI API Key{" "}
                </label>
              </div>
              <div
                onClick={() => {
                  setToggleProfile(!toggleProfile);
                }}
                className="relative mb-4 mt-6 flex cursor-pointer items-center justify-center gap-2 text-white"
              >
                <Avatar>
                  <AvatarImage src={user?.picture} alt={user?.name} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {user?.name}
                {toggleProfile && (
                  <div className="absolute -top-7 left-40">
                    <button
                      onClick={() =>
                        logout({
                          logoutParams: { returnTo: window.location.origin },
                        })
                      }
                      className="m-8 rounded bg-red-500 px-4 py-1 font-bold text-white hover:bg-red-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {toggleCustomKey && (
        <Customkey
          email={user?.email || ""}
          onRequestClose={toggleCustomKeyVisibility}
        />
      )}
    </>
  );
};

export default Sidebar;
