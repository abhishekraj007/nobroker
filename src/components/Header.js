import React from "react";
import "./Header.scss";

const Header = props => {
  return (
    <div className="menu-header">
      <a href="javascript:void(0)" className="logo">
        LOGO
      </a>
      <div className="menu-toggler">
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>
    </div>
  );
};

export default Header;
