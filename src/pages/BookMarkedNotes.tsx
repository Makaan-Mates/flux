import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";

interface Notes {
  title: string;
  description: string;
  bookmarked: boolean;
  _id: string;
}

const BookMarkedNotes = () => {
  const { user } = useAuth0();
  const email: string = user?.email || "";
  const [notes, setNotes] = useState<Notes[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/getUserNotes?email=${email}`
        );
        setNotes(response.data.message);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };
    fetchNotes();
  }, [email]);

//   console.log("notes", notes);
  const bookmarkedNotes = notes?.filter((note: Notes) => note.bookmarked);

  return (
    <div className="flex">
      {bookmarkedNotes
        ? bookmarkedNotes?.map((note: Notes) => (
            
            <div
              key={note?._id}
              className="w-1/4 bg-grey-800 p-4 m-4 h-48 overflow-y-scroll "
            >
              <h1>{note?.title}</h1>
              <p>{note?.description}</p>
            </div>
          ))
        : "No Bookmarked Notes"}
    </div>
  );
};

export default BookMarkedNotes;
