import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import "./muagiayin.styles.css";
import { updateBuyHistory } from "../../ultis/firebase/firebase";
import Popup from "../popup/popup.component";

const defaultFormFields = {
  khogiay: "A4",
  soluonggiay: "0",
};

const MuaGiayIn = (props) => {
  const { setMuaGiayIn } = props;
  const { currentUser } = useContext(UserContext);
  const [openXacNhan, setOpenXacNhan] = useState(false);
  const [cart, setCart] = useState([]);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { khogiay, soluonggiay } = formFields;
  const handleSummit = (e) => {
    e.preventDefault();
    const finalCart = cart.map((row) => {
      return {
        ...row,
        date: new Date(),
        paid: false,
        added: false,
      };
    });
    finalCart.forEach((row) => {
      updateBuyHistory(currentUser, { ...row });
    });
    setCart([]);
    setOpenXacNhan(true);
  };
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  let total = 0;
  if (khogiay == "A4") {
    total = 1000 * Number(soluonggiay);
  } else if (khogiay == "A3") {
    total = 2000 * Number(soluonggiay);
  } else {
    total = 500 * Number(soluonggiay);
  }
  const handleAdd = (e) => {
    if (formFields.soluonggiay == "0") alert("Số lượng giấy phải lớn hơn 0!!!");
    else {
      setCart((prevCart) => [...prevCart, { ...formFields, giatien: total }]);
      setFormFields(defaultFormFields);
    }
  };
  return (
    <div>
      <form onSubmit={handleSummit}>
        <div className="muagiayin_container">
          <div className="muagiay-wrapper">
            <div className="khogiay">
              <label>
                <h2 className="lable-text">Khổ giấy:</h2>
                <select
                  name="khogiay"
                  defaultValue={"A4"}
                  onChange={handleChange}
                  value={khogiay}
                  className="table-khogiay"
                >
                  <option value="A3">A3</option>
                  <option value="A4">A4</option>
                  <option value="A5">A5</option>
                </select>
              </label>
            </div>
            <div className="soluonggiay">
              <label>
                <h2 className="lable-text">Số lượng:</h2>
                <input
                  type="number"
                  required
                  onChange={handleChange}
                  name="soluonggiay"
                  value={soluonggiay}
                  min="0"
                  className="table-soluong"
                />
              </label>
            </div>
            <div className="giatien">
              <h2 className="lable-text lable-text-giatien">Giá tiền: </h2>
              <span className="giatien-total">{total} VNĐ</span>
            </div>
            <button className="add-button" type="button" onClick={handleAdd}>
              Thêm
            </button>
          </div>
          <div className="cart-wrapper">
            <h2 className="lable-text lable-text-cart">Giỏ hàng</h2>
            <table className="table-cart">
              <thead>
                <tr>
                  <th>Khổ giấy</th>
                  <th>Số lượng</th>
                  <th>Giá tiền (VNĐ)</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(({ khogiay, soluonggiay, giatien }, i) => {
                  return (
                    <tr key={i}>
                      <td className="in-table">{khogiay}</td>
                      <td className="in-table">{soluonggiay}</td>
                      <td className="in-table in-table-price">{giatien}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <button type="submit" className="button-footer">
          Xác nhận
        </button>
        <button
          type="button"
          className="button-footer"
          onClick={() => setMuaGiayIn(false)}
        >
          Quay lại
        </button>
      </form>
      {openXacNhan && (
        <Popup openPopup={openXacNhan}>
          <div className="popup-title title-thanhtoan">
            <h1>Xác nhận thanh toán</h1>
          </div>

          <div className="popup-body body-thanhtoan">
            <h2>Vui lòng kiểm tra tài khoản BKPay của bạn để thanh toán</h2>
          </div>

          <div className="popup-footer footer-thanhtoan">
            <button
              type="button"
              className="button-footer"
              onClick={() => {
                setOpenXacNhan(false);
                setMuaGiayIn(false);
              }}
            >
              Quay lại
            </button>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default MuaGiayIn;
