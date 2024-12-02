import React, { useContext, useState } from "react";

import XemLichSuUser from "../xem-lich-su/xemlichsu.component";
import { UserContext } from "../../contexts/user.context";

import { signOutUser } from "../../ultis/firebase/firebase";

import { Link } from "react-router-dom";

import logo from "../../assets/spss_logo.svg";

import "./navigation.styles.css";
import XemLichSuNvia from "../xem-lich-su-nvia/xemlichsunvia.component";
import { RoleContext } from "../../contexts/role.context";

const Navigation = (props) => {
  const { currentUser } = useContext(UserContext);
  const { role } = useContext(RoleContext);

  // State to manage dropdown visibility
  const [showBalance, setShowBalance] = useState(false);
  const [currentBalance] = useState(100000); // Example balance value, replace as needed

  const toggleBalanceDropdown = () => {
    setShowBalance((prevState) => !prevState);
  };

  return (
    <div className="navigation">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      {!currentUser ? (
        <div className="link-container">
          <Link className="nav-link" to="/" id="box1">
            Trang chủ
          </Link>
          <a
            className="nav-link"
            href="https://hcmut.edu.vn/"
            id="box2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Liên hệ
          </a>
        </div>
      ) : (
        <div className="link-container">
          {role === "user" && (
            <>
              <XemLichSuUser />
              <button
                type="button"
                className="button-custom1 balance-button"
                onClick={toggleBalanceDropdown}
              >
                Số dư
                {showBalance && (
                  <span className="balance-info">
                    : {currentBalance} VND
                  </span>
                )}
              </button>
            </>
          )}
          {role !== "user" && <XemLichSuNvia />}
          <button
            type="button"
            onClick={signOutUser}
            className="button-custom1"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default Navigation;
