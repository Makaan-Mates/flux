import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Fill } from "react-icons/ri";

interface Notes {
  title: string;
  description: string;
  bookmarked: boolean;
  _id: string;
  videoId: string;
}

const BookMarkedNotes = () => {
  const { user } = useAuth0();
  const email: string = user?.email || "";
  const [notes, setNotes] = useState<Notes[]>([]);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/getUserNotes?email=${email}`
        );
        setNotes(response.data.message);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const deleteNoteHandler = async (_id: string) => {
    try {
      await axios.delete(`${apiUrl}/api/deleteBookMarkedNote/${_id}`);
      const updatedNotes = notes?.filter((note: Notes) => note._id !== _id);
      setNotes(updatedNotes);
    } catch (error) {
      console.log(error);
    }
  };

  //   console.log("notes", notes);
  const bookmarkedNotes = notes?.filter((note: Notes) => note.bookmarked);

  return (
    <div className="flex flex-wrap px-12">
      {bookmarkedNotes
        ? bookmarkedNotes?.reverse().map((note: Notes) => (
            <div
              key={note?._id}
              className="m-4  h-56 w-[60vw] cursor-pointer overflow-hidden rounded bg-gray-300  shadow-lg "
              onClick={() => {
                navigate(`/dashboard/fluxdetail/${note?.videoId}`);
              }}
            >
              <div className="px-6 py-4 ">
                <div className="mb-2 text-xl font-bold">{note?.title}</div>
                <p className="line-clamp-3 text-base ">{note?.description}</p>
              </div>
              <div className="px-6 pb-2 pt-4">
                <RiDeleteBin6Fill
                  className=" cursor-pointer text-2xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNoteHandler(note?._id);
                  }}
                />
              </div>
            </div>
          ))
        : "No Bookmarked Notes"}
    </div>
  );
};

export default BookMarkedNotes;
