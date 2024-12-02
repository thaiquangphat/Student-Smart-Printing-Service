import React, { useContext, useState } from "react";

import "./thongsoin.styles.css";
import Popup from "../popup/popup.component";
import Button from "../button/button.component";

import { DocContext } from "../../contexts/doc.context";

const ThongSoIn = (props) => {
  // useState var
  // const [xacNhanGiaoDich, setXacNhanGiaoDich] = useState(false);
  const { doc, setDoc } = useContext(DocContext);
  let printProperties = {};
  const handleChange = (e) => {
    const newDoc = { ...doc };
    newDoc.list.forEach((element) => {
      element.khoGiay = e.target.value;
    });
    console.log(newDoc);
    setDoc(newDoc);
  };
  return (
    <Popup openPopup={props.openPopup}>
      <div className="container">
        <div className="popup-title">
          <h1>Tùy chỉnh thông số in</h1>
        </div>
        <div className="main-page">
          <div className="preview-container">
            <div className="preview-title">Xem trước</div>
            <div className="preview-page"></div>
          </div>
          <div className="adjust-container">
            <div className="adjust-row">
              <label htmlFor="">Số bản:</label>
              <input type="number" name="" id="" defaultValue={1} />
            </div>
            <div className="adjust-row size-select">
              <label htmlFor="">Kích thước:</label>
              <select
                name="khogiay"
                defaultValue={"A4"}
                onChange={handleChange}
              >
                <option value="A3">A3</option>
                <option value="A4">A4</option>
                <option value="A5">A5</option>
              </select>
            </div>
            <div className="adjust-row">
              <label htmlFor="">In từ trang: </label>
              <input type="number" name="fromPage" defaultValue={1} />
              <span> đến </span>
              <input type="number" name="toPage" defaultValue={"-"} />
            </div>
            <div className="adjust-row print-direction">
              <label htmlFor="">Hướng in:</label>
              <input
                type="radio"
                name="direction"
                id=""
                value="vertical"
                defaultChecked
              />
              <span>Dọc</span>
              <input type="radio" name="direction" id="" value="horizontal" />
              <span>Ngang</span>
            </div>
            <div className="adjust-row align-row">
              <label htmlFor="">Canh lề (Inch)</label>
              <div>
                <div>
                  <span>Trái:</span>
                  <input type="number" name="left" id="" defaultValue={1} />
                  <span>Phải:</span>
                  <input type="number" name="right" id="" defaultValue={1} />
                </div>
                <div>
                  <span>Trên:</span>
                  <input type="number" name="top" id="" defaultValue={1} />
                  <span>Dưới:</span>
                  <input type="number" name="bottom" id="" defaultValue={1} />
                </div>
              </div>
            </div>
            <div className="adjust-row">
              <label htmlFor="">Số trang/1 mặt:</label>
              <input type="number" name="" id="" defaultValue={1} />
            </div>
          </div>
        </div>
        <div className="save-option">
          <label htmlFor="">Lưu tài liệu trong vòng 7 ngày</label>
          <input type="checkbox" name="" id="" />
        </div>
        <div className="popup-footer">
          <Button
            className="button-footer"
            onClick={() => props.setXacNhanGiaoDich(true)}
          >
            Xác nhận
          </Button>
          <Button
            className="button-footer"
            onClick={() => props.openPopup(false)}
          >
            Quay lại
          </Button>
        </div>
      </div>
    </Popup>
  );
};

export default ThongSoIn;
