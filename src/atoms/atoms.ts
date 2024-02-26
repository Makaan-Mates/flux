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
          `http://localhost:4000/api/getfluxdetail?videoId=${videoId}&email=${email}`,
        );
        return response.data.message.description;
      },
  }),
});
