import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";

interface BookmarkProps {
  videoId: string;
  email: string;
}

const Bookmark = ({ videoId, email }: BookmarkProps) => {
  const [bookmarked, setBookmarked] = useState();

  const handleBookmark = async () => {
    const response = await axios.post(
      "https://flux-backend-production.up.railway.app/api/bookmarkflux",
      {
        videoId: videoId,
        email: email,
      }
    );
    setBookmarked(response.data.message);
  };

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      const response = await axios.get(
        `https://flux-backend-production.up.railway.app/api/bookmarkstatus?videoId=${videoId}&email=${email}`
      );
      setBookmarked(response.data.message);
    };
    fetchBookmarkStatus();
  }, [videoId, email, bookmarked]);

  return (
    <div>
      {bookmarked ? (
        <FaBookmark
          className="m-4 cursor-pointer text-2xl"
          onClick={handleBookmark}
        />
      ) : (
        <FaRegBookmark
          className="m-4 cursor-pointer text-2xl"
          onClick={handleBookmark}
        />
      )}
    </div>
  );
};
export default Bookmark;
