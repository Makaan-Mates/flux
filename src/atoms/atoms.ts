import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";

type Params = {
  videoId: string;
  email: string;
};

export const notesAtom = atomFamily({
  key: "notesAtom",
  default: selectorFamily({
    key: "MyAtom/Default",
    get:
      ({ videoId, email }: Params) =>
      async () => {
        const response = await axios.get(
          `https://flux-backend-production.up.railway.app/api/getfluxdetail?videoId=${videoId}&email=${email}`,
        );
        return response.data.message;
      },
  }),
});

