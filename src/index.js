import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import { DocProvider } from "./contexts/doc.context";
import { RoleProvider } from "./contexts/role.context";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <DocProvider>
      <UserProvider>
        <RoleProvider>
          <App />
        </RoleProvider>
      </UserProvider>
    </DocProvider>
  </BrowserRouter>

  // </React.StrictMode>
);
