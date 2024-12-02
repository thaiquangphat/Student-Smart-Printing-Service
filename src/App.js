import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./components/homepage/homepage.component";
import NhanGiaoDichIn from "./components/nhan-giao-dich-in-nvia/nhangiaodichin_nvia.component";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/" element={<NhanGiaoDichIn />} /> */}
      </Routes>
    </div>
  );
}

export default App;
