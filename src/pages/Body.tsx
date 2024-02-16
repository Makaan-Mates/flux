import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Sidebar from "../components/custom/Sidebar";
import Home from "./Home";
import FluxDetail from "./FluxDetail";
const AppLayout = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

const Body = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/fluxdetail:videoId",
          element: <FluxDetail />,
        },
        {
          path: "/about",
          element: <div>About</div>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Body;
