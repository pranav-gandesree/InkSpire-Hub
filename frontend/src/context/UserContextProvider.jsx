import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState, useRecoilValueLoadable } from "recoil";
import { userState } from "../recoil/atoms/userAtom";
import { fetchUserState } from "../recoil/selectors/userSeclector"
import { createContext } from "react";

export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useRecoilState(userState);
  const fetchUser = useSetRecoilState(fetchUserState);
  const userLoadable = useRecoilValueLoadable(fetchUserState);

  useEffect(() => {
    if (userLoadable.state === "hasValue" && userLoadable.contents !== null) {
      setUser(userLoadable.contents);
    }
  }, [userLoadable, setUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
