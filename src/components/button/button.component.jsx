import React from "react";
import "./button.styles.css";

const BUTTON_TYPE = { nav: "nav-button", body: "body-button" };

const Button = (props) => {
  const { children, buttonType, ...otherProps } = props;
  return (
    <button className={`${BUTTON_TYPE[buttonType]}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
