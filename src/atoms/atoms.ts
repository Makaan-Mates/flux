import { atom, atomFamily, selectorFamily } from "recoil";
import axios from "axios";

type Params = {
  videoId: string;
  email: string;
};
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const notesAtom = atomFamily({
  key: "notesAtom",
  default: selectorFamily({
    key: "MyAtom/Default",
    get:
      ({ videoId, email }: Params) =>
      async () => {
        if (!videoId || !email) {
          return Promise.resolve(null);
        }
        const response = await axios.get(
          `${apiUrl}/api/getfluxdetail?videoId=${videoId}&email=${email}`
        );
        return response.data.message;
      },
  }),
});
export const bookmarkAtom = atomFamily({
  key: "bookmarkAtom",
  default: selectorFamily({
    key: "bookmark/selector",
    get: (email) => async () => {
      if (!email) {
        return Promise.resolve(null);
      }
      const response = await axios.get(
        `${apiUrl}/api/getUserNotes?email=${String(email)}`
      );
      return response.data.message;
    },
  }),
});

export const SearchBoxAtom = atom({
  key: "ToggleSearchBox",
  default: false,
});
