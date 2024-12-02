import React, { createContext, useState } from "react";

const defaultDoc = {
  list: [],
  date: "",
  printer: "",
};

export const DocContext = createContext({
  doc: {},
  setDoc: () => {},
});

export const DocProvider = ({ children }) => {
  const [doc, setDoc] = useState(defaultDoc);
  const value = { doc, setDoc };
  return <DocContext.Provider value={value}>{children}</DocContext.Provider>;
};
