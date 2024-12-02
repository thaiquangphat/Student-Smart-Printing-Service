import React, { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserFromAuth,
  getUserInfo,
} from "../ultis/firebase/firebase";

export const UserContext = createContext({
  currentUser: null,
  role: "",
  setCurrentUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState("");
  const value = { currentUser, role, setCurrentUser };
  useEffect(() => {
    const unsubcribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserFromAuth(user);
      }
      setCurrentUser(user);
      // const fetchData = async () => {
      //   const data = await getUserInfo(currentUser);
      //   return data.role;
      // };
      // const newRole = fetchData();
      // console.log(newRole);
      // setRole(newRole);
    });
    return unsubcribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
