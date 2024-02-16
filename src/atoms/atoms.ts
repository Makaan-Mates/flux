import { atomFamily,selectorFamily,atom } from "recoil";
import axios from "axios";

export const notesAtom = atomFamily({
  key: "notesAtom",
  default: selectorFamily({
    key: 'MyAtom/Default',
    get:(videoId:string)=> async() => {
     const response = await axios.get(`http://localhost:4000/api/getfluxdetail?videoId=${videoId}`);
      return response.data.message.description;
    }
  }),
});

export const videoIdAtom = atom({
  key: "videoIdAtom",
  default: "",
});
