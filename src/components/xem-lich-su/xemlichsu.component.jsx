import React, { useState } from "react";

import "./xemlichsu.syles.css";
import LsMuaGiay from "./mua-giay-in/lsmuagiaiyin.component";
import { ReactComponent as DropdownLogo } from "../../assets/mingcute_down-fill.svg";
import Popup from "../popup/popup.component";
import LsIn from "./giao-dich-in/lsgiaodichin.component";

const XemLichSuUser = () => {
  // state for dropdown
  const [xemLichSu, setXemLichSu] = useState(false);
  // states for popup
  const [giaoDichIn, setGiaoDichIn] = useState(false);
  const [muaGiayIn, setMuaGiayIn] = useState(false);
  return (
    <div className="dropdown">
      <div
        className="dropdown-title-wrapper"
        onClick={() => setXemLichSu(!xemLichSu)}
      >
        <div className="dropdown-title">Xem lịch sử</div>
        <DropdownLogo className="dropdown-logo" />
      </div>
      {xemLichSu && (
        <div className="dropdown-content">
          <div className="dropdown-item" onClick={() => setGiaoDichIn(true)}>
            Giao dịch in
          </div>
          <div className="dropdown-item" onClick={() => setMuaGiayIn(true)}>
            Mua giấy in
          </div>
        </div>
      )}
      {giaoDichIn && (
        <Popup openPopup={setGiaoDichIn} closeBtn={false}>
          <div className="popup-title">
            <h1>Lịch sử giao dịch in</h1>
          </div>
          <div className="popup-body">
            <LsIn />
          </div>
          <div className="popup-footer">
            <button type="button" className="button-footer" onClick={() => setGiaoDichIn(false)}>
              Quay lại
            </button>
          </div>
        </Popup>
      )}
      {muaGiayIn && (
        <Popup openPopup={setMuaGiayIn} closeBtn={false}>
          <div className="popup-title">
            <h1>Lịch sử mua giấy in</h1>
          </div>
          <div className="popup-body">
            <LsMuaGiay />
          </div>
          <div className="popup-footer">
            <button type="button" className="button-footer" onClick={() => setMuaGiayIn(false)}>
              Quay lại
            </button>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default XemLichSuUser;
