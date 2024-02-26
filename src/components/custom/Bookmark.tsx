import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import {  useState } from "react";
import axios from "axios";

interface BookmarkProps {
  videoId: string;
  email: string;
}

const Bookmark = ({ videoId, email }: BookmarkProps) => {
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmark = async () => {
    const response = await axios.post(
      "http://localhost:4000/api/bookmarkflux",
      {
        videoId: videoId,
        email: email,
      }
    );
    console.log(response.data);
    setBookmarked(response.data.message);
  };

  return (
    <div>
      {bookmarked ? (
        <FaBookmark
          className="m-4 text-2xl cursor-pointer"
          onClick={handleBookmark}
        />
      ) : (
        <FaRegBookmark
          className="m-4 text-2xl cursor-pointer"
          onClick={handleBookmark}
        />
      )}
    </div>
  );
};
export default Bookmark;
