import { IoSearch } from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";
const Sidebar = () => {
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
        <div className="ml-4 mt-10 flex items-center gap-2 text-base text-[#E2E5EB]">
          <IoAddCircle className="text-xl" />
          <label>New Flux</label>
        </div>
        <div className="ml-4 mt-4 flex items-center gap-2 text-base text-[#E2E5EB]">
          <IoAddCircle className="text-xl" />
          <label>Bookmarks</label>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
