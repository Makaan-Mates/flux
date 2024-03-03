import { atomFamily, selectorFamily } from "recoil";
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
