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
  const [inTaiLieu, setInTaiLieu] = useState(false);
  const [muaGiayIn, setMuaGiayIn] = useState(false);
  const [chonMayIn, setChonMayIn] = useState(false);
  const [thongSoIn, setThongSoIn] = useState(false);
  const [xacNhanGiaoDich, setXacNhanGiaoDich] = useState(false);
  // user context for different ui
  const { currentUser } = useContext(UserContext);
  const { doc, setDoc } = useContext(DocContext);
  const { role, setRole } = useContext(RoleContext);
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
              onClick={() => setNhanGiaoDich(true)}
              className="button-custom"
            >
              Nhận giao dịch
            </Button>
            <Button
              type="button"
              buttonType={"body"}
              onClick={() => setThongTinMayIn(true)}
              className="button-custom"
            >
              Thông tin máy in
            </Button>
          </div>
        )}
        {/* nvia */}
        {nhanGiaoDich && <NhanGiaoDichIn openPopup={setNhanGiaoDich} />}
        {thongTinMayIn && <ThongTinIn openPopup={setThongTinMayIn}/>}
          {/* <Popup openPopup={setThongTinMayIn} closeBtn={false}>
            <div className="popup-title">
              <h1>Thông tin máy in</h1>
            </div>
            <div className="popup-body">Body</div>
            <div className="popup-footer">
              <button
                className="button-footer"
                type="button"
                onClick={() => {
                  setThongTinMayIn(false);
                }}
              >
                Quay lại
              </button>
            </div>
          </Popup>
        )} */}

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
