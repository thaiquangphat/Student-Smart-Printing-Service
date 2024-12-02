import React, { createContext, useContext, useState } from "react";

export const RoleContext = createContext({
  role: "",
  setRole: () => {},
});

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState("");
  const value = { role, setRole };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};
