import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Sidebar from "../components/custom/Sidebar";
import Home from "./Home";
import FluxDetail from "./FluxDetail";
import Landing from "./Landing";
import BookMarkedNotes from "./BookMarkedNotes";
import { Toaster } from "@/components/ui/toaster";
import { CommandDialogDemo } from "@/components/custom/CommandDialogDemo";

const AppLayout = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
      <CommandDialogDemo />
      <Toaster />
    </>
  );
};

const Body = () => {
  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: <AppLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "fluxdetail/:videoId",
          element: <FluxDetail />,
        },
        {
          path: "about",
          element: <div>About</div>,
        },
        {
          path: "bookmarkednotes",
          element: <BookMarkedNotes />,
        },
      ],
    },
    {
      path: "/",
      element: <Landing />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Body;
