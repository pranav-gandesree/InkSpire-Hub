import { selector } from "recoil";
import axios from "axios";
import { userState } from "../atoms/userAtom";

export const fetchUserState = selector({
  key: "fetchUserState",
  get: async ({ get }) => {
    try {
      const response = await axios.get('http://localhost:1111/api/auth/refetch', {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  set: ({ set }, newValue) => {
    set(userState, newValue);
  },
});
