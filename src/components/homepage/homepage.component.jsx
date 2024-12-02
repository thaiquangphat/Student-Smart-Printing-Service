import React, { useContext, useState } from "react";
import Navigation from "../navigation/navigation.component";
import Footer from "../footer/footer.component";
import Popup from "../popup/popup.component";
import Button from "../button/button.component";
import XacNhanGiaoDich from "../xac-nhan-giao-dich/xacnhangiaodich.component";
import ChonMayIn from "../chon-may-in/chonmayin.component";
import Upload from "../Upload_file/Upload_file.component";
import NhanGiaoDichIn from "../nhan-giao-dich-in-nvia/nhangiaodichin_nvia.component";
import ThongTinIn from "../thong-tin-may-in/thongtinin_nvia.components";
import ThongTinIn1 from "../thong-tin-may-in/thongtinin1_nvia.components";
import { UserContext } from "../../contexts/user.context";

import {
  signInWithGooglePopup,
  createUserFromAuth,
  db,
  getPrinters,
  updatePrintHistory,
  getUserInfo,
} from "../../ultis/firebase/firebase";

import "./homepage.styles.css";
import MuaGiayIn from "../mua-giay-in/muagiayin.component";

import { DocContext } from "../../contexts/doc.context";
import ThongSoIn from "../thong-so-in/thongsoin.components";
import { RoleContext } from "../../contexts/role.context";

// sign in function
const logGoogleUser = async () => {
  const { user } = await signInWithGooglePopup();
  createUserFromAuth(user, { numOfPaper: 500, role: "user" });
};

const Homepage = (props) => {
  // states for popup
  const [nhanGiaoDich, setNhanGiaoDich] = useState(false);
  const [thongTinMayIn, setThongTinMayIn] = useState(false);
  const [thongTinMayIn1, setThongTinMayIn1] = useState(false);
  const [inTaiLieu, setInTaiLieu] = useState(false);
  const [muaGiayIn, setMuaGiayIn] = useState(false);
  const [chonMayIn, setChonMayIn] = useState(false);
  const [thongSoIn, setThongSoIn] = useState(false);
  const [xacNhanGiaoDich, setXacNhanGiaoDich] = useState(false);
  // user context for different ui
  const { currentUser } = useContext(UserContext);
  const { doc, setDoc } = useContext(DocContext);
  const { role, setRole } = useContext(RoleContext);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showConfigForm, setShowConfigForm] = useState(false);
  const [showAddSuccessMessage, setShowAddSuccessMessage] = useState(false);
  const [showConfigSuccessMessage, setShowConfigSuccessMessage] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setShowAddForm(false);
  };

  const togglePopup1 = () => {
    setShowPopup1(!showPopup1);
    setShowAddForm(false);
  };



  if (currentUser) {
    const fetchData = async () => {
      const data = await getUserInfo(currentUser);
      setRole(data.role);
    };
    fetchData();
  }
  return (
    <div className="homepage">
      <Navigation />
      <div className="homepage_body">
        {/* <h1 className="title">HCMUT SSPS</h1> */}
        <h2 className="subtitle">Student Smart Printing Service</h2>
        {!currentUser ? (
          <Button
            type="button"
            buttonType={"body"}
            onClick={logGoogleUser}
            className="button-custom"
          >
            Đăng nhập
          </Button>
        ) : role == "user" ? (
          <div>
            <Button
              type="button"
              buttonType={"body"}
              onClick={() => setInTaiLieu(true)}
              className="button-custom"
            >
              In tài liệu
            </Button>
            <Button
              type="button"
              buttonType={"body"}
              onClick={() => setMuaGiayIn(true)}
              className="button-custom"
            >
              Mua giấy in
            </Button>
          </div>
        ) : (
          <div>
            <Button
              type="button"
              buttonType={"body"}
              className="button-custom"
              onClick={togglePopup1}
            >
              Dịch vụ
            </Button>
            {showPopup1 && (
              <div className="popup-overlay">
                <div className="popup-content">
                  <h2>Các loại dịch vụ</h2>
                  <div className="popup-buttons">
                    <button className="button-footer1" onClick={() => { setNhanGiaoDich(true); setShowPopup1(false); }
                    }>Xem</button>
                    <button className="button-footer1" onClick={() => { setShowConfigForm(true); setShowPopup1(false); }}>Cài đặt</button>
                  </div>
                  <button className="button-footer" onClick={togglePopup1}>Quay lại</button>
                </div>
              </div>
            )}
            {showConfigForm && (
              <div className="popup-overlay">
                <div className="popup-content">
                  <h2>Điều chỉnh thông số in</h2>
                  <form className="add-printer-form">
                    <label>
                      Chọn ngày:
                      <input type="date" defaultValue="2024-10-10" />
                    </label>
                    <label>
                      Giá mặc định:
                      <input type="number" defaultValue="1000" /> VND / trang
                    </label>
                    <label>
                      Số file mặc định:
                      <input type="number" defaultValue="20" /> / kỳ
                    </label>
                    <label>
                      Thêm loại file:
                      <input type="text" defaultValue=".docx" />
                    </label>
                    <label>
                      Số file tối đa:
                      <input type="number" defaultValue="5" /> / lần
                    </label>
                    <div className="form-buttons">
                      <button className="button-footer" onClick={() => {
                        setShowConfigForm(false);
                        setShowConfigSuccessMessage(true);
                      }}>
                        Xác nhận
                      </button>
                      <button
                        type="button"
                        className="button-footer"
                        onClick={() => {
                          setShowConfigForm(false);
                          setShowPopup1(true);
                        }}
                      >
                        Quay lại
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            { showConfigSuccessMessage && (
              <div className="popup-overlay">
              <div className="popup-content2">
                <h2>Cài đặt được cập nhật</h2>
                <p>Hãy xem trong danh sách in để có thêm thông tin chi tiết</p>
                <button
                  className="button-footer2"
                  onClick={() => {
                    setShowConfigSuccessMessage(false);
                  }}
                >
                  Quay lại
                </button>
              </div>
            </div>  
            )}

            <Button
              type="button"
              buttonType={"body"}
              className="button-custom"
              onClick={togglePopup}>
              Máy in
            </Button>

            {showPopup && (
              <div className="popup-overlay">
                <div className="popup-content">
                  <h2>Cài đặt máy in</h2>
                  <div className="popup-buttons">
                    <button className="button-footer1" onClick={() => { setThongTinMayIn(true); setShowPopup(false); }
                    }>Xem máy in</button>
                    <button className="button-footer1" onClick={() => { setThongTinMayIn1(true); setShowPopup(false); }
                    }>Cài đặt</button>
                    <button className="button-footer1" onClick={() => { setShowAddForm(true); setShowPopup(false);
                    }}>Thêm máy</button>
                  </div>
                  <button className="button-footer" onClick={togglePopup}>Quay lại</button>
                </div>
              </div>
            )}
            {showAddForm && (
              <div className="popup-overlay">
                <div className="popup-content">
                  <h2>Thêm máy in</h2>
                  <form className="add-printer-form">
                    <label>
                      Mã máy in:
                      <input type="text" defaultValue="BK-DA-004" />
                    </label>
                    <label>
                      Tên máy in:
                      <input type="text" defaultValue="Huawei Printer Plus" />
                    </label>
                    <label>
                      Vị trí:
                      <input type="text" defaultValue="H6-303" /> at{" "}
                      <input type="text" defaultValue="Di An" />
                    </label>
                    <label>
                      Công ty:
                      <input type="text" defaultValue="Huawei" />
                    </label>
                    <label>
                      Ngày nhập:
                      <input type="date" defaultValue="2024-10-10" />
                    </label>
                    <div className="form-buttons">
                      <button className="button-footer" onClick={() => {
                        setShowAddForm(false);
                        setShowAddSuccessMessage(true);
                      }}>
                        Xác nhận
                      </button>
                      <button
                        type="button"
                        className="button-footer"
                        onClick={() => {
                          setShowAddForm(false);
                          setShowPopup(true);
                        }}
                      >
                        Quay lại
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {showAddSuccessMessage && (
              <div className="popup-overlay">
                <div className="popup-content2">
                  <h2>Đã thêm máy in</h2>
                  <p>Kiểm tra danh sách máy in để có thêm thông tin chi tiết</p>
                  <button
                    className="button-footer2"
                    onClick={() => {
                      setShowAddSuccessMessage(false);
                    }}
                  >
                    Quay lại
                  </button>
                </div>
              </div>
            )}
          </div>

        )}
        {/* nvia */}
        {nhanGiaoDich && <NhanGiaoDichIn openPopup={setNhanGiaoDich} />}
        {thongTinMayIn && <ThongTinIn openPopup={setThongTinMayIn} />}
        {thongTinMayIn1 && <ThongTinIn1 openPopup={setThongTinMayIn1} />}

        {/* user */}
        {inTaiLieu && (
          <Popup openPopup={setInTaiLieu}>
            <div className="popup-title">
              <h1>Tải tài liệu lên</h1>
            </div>
            <div className="popup-body">
              <Upload />
            </div>
            <div className="popup-footer">
              <button
                className="button-footer"
                onClick={() => setChonMayIn(true)}
              >
                Xác nhận
              </button>
              <button
                className="button-footer"
                onClick={() => {
                  setInTaiLieu(false);
                  setDoc({
                    list: [],
                    date: null,
                    printer: "",
                  });
                }}
              >
                Hủy
              </button>
            </div>
          </Popup>
        )}
        {muaGiayIn && (
          <Popup openPopup={setMuaGiayIn}>
            <div className="popup-title muagiayin-popup-title">
              <h1>Mua giấy in</h1>
            </div>
            <div className="popup-body">
              <MuaGiayIn setMuaGiayIn={setMuaGiayIn} />
            </div>
            {/* <div className="popup-footer">
              
            </div> */}
          </Popup>
        )}

        {chonMayIn && (
          <Popup openPopup={setChonMayIn}>
            <div className="popup-title">
              <h1>Chọn máy in</h1>
            </div>
            <div className="popup-body">
              <ChonMayIn />
            </div>
            <div className="popup-footer">
              <button
                className="button-footer"
                onClick={() => {
                  setThongSoIn(true);
                }}
              >
                Xác nhận
              </button>
              <button
                className="button-footer"
                onClick={() => {
                  setChonMayIn(!chonMayIn);
                  const newDoc = { ...doc };
                  newDoc.printer = "";
                  setDoc(newDoc);
                }}
              >
                Quay lại
              </button>
            </div>
          </Popup>
        )}

        {thongSoIn && (
          <ThongSoIn
            openPopup={setThongSoIn}
            setXacNhanGiaoDich={setXacNhanGiaoDich}
          />
        )}

        {xacNhanGiaoDich && (
          <Popup openPopup={setXacNhanGiaoDich}>
            <div className="popup-title">
              <h1>Xác nhận giao dịch</h1>
            </div>
            <div className="popup-body">
              <XacNhanGiaoDich />
            </div>
            <div className="popup-footer">
              <button
                className="button-footer"
                onClick={() => {
                  setXacNhanGiaoDich(false);
                  setChonMayIn(false);
                  setThongSoIn(false);
                  setInTaiLieu(false);
                  doc.list.forEach((element) => {
                    updatePrintHistory(currentUser, {
                      date: doc.date,
                      printerCode: doc.printer,
                      name: element.file_name,
                      khoGiay: element.khoGiay,
                      numPage: element.soTrang,
                      printed: false,
                    });
                  });
                  setDoc({
                    list: [],
                    date: null,
                    printer: "",
                  });
                }}
              >
                Xác nhận
              </button>
              <button
                className="button-footer"
                onClick={() => setXacNhanGiaoDich(false)}
              >
                Quay lại
              </button>
            </div>
          </Popup>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
