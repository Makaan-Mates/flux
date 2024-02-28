import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
//import { MdDeleteOutline } from "react-icons/md";
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
  

  const deleteNoteHandler = async(_id:string) => {
   try{
    await axios.delete(`http://localhost:4000/api/deleteBookMarkedNote/${_id}`)
    const updatedNotes = notes?.filter((note: Notes) => note._id !== _id);
    setNotes(updatedNotes)
   }catch(error){
     console.log(error)
   }

  }

//   console.log("notes", notes);
 const bookmarkedNotes = notes?.filter((note: Notes) => note.bookmarked);

  return (
    <div className="flex flex-wrap ">
      {bookmarkedNotes
        ? bookmarkedNotes?.map((note: Notes) => ( 
            <div
              key={note?._id}
              className="m-4 w-64 h-64 rounded overflow-hidden shadow-lg bg-gray-300  cursor-pointer "
               onClick={() => {
               navigate(`/dashboard/fluxdetail/${note?.videoId}`);
              }}
            >
            <div className="px-6 py-4 ">
            <div className="font-bold text-xl mb-2">{note?.title}</div>
            <p className="text-base line-clamp-3 "  >{note?.description}</p>
            </div>
              <div className="px-6 pt-4 pb-2">
              <RiDeleteBin6Fill
                   className=" text-2xl cursor-pointer" onClick={(e) => {
                    e.stopPropagation();
                    deleteNoteHandler(note?._id)}}
                  />
              </div>
            </div>
          ))
        : "No Bookmarked Notes"}
    </div>
  );
};

export default BookMarkedNotes;
