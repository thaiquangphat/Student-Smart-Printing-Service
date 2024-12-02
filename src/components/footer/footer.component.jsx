import React from "react";
import logo from '../../assets/spss_logo.svg';
import address from '../../assets/address.svg';
import tel from '../../assets/tel.svg';
import mail from '../../assets/mail.svg';
import { Link } from "react-router-dom";

import "./footer.styles.css";

const Footer = (props) => {
  return (
    <div className="footer">
      <div className="logo-container">
        <div className="LogoSPSS">
          <Link to="/">
            <img src={logo} alt="LogoSPSS" className="LogoSPSS" />
          </Link>
        </div>
        <div className="LogoHCMUT">
          <img src="/HCMUT_logo.png" alt="LogoHCMUT" className="LogoHCMUT" />
        </div>
      </div>
      <div className="icon-container">
        <div className="icon">
          <img src={address} alt="address"/>
          <span className="contact">268 Lý Thường Kiệt, P.14, Q.10, TP.HCM</span>
        </div>
        <div className="icon">
          <img src={tel} alt="tel"/>
          <span className="contact">(028) 12 345 678</span>
        </div>
        <div className="icon">
          <img src={mail} alt="mail"/>
          <span className="contact">spso@hcmut.edu.vn</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
