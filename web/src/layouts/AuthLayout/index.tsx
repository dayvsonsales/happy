import React, { useEffect, useState } from "react";

import "./styles.css";

import logoAuth from "../../assets/images/logo-auth.svg";
import { useLocation } from "react-router-dom";
import Login from "../../pages/Auth/Login";
import ResetPassword from "../../pages/Auth/ResetPassword";
import RequestReset from "../../pages/Auth/RequestReset";

const AuthLayout: React.FC = () => {
  const [children, setChildren] = useState<React.ReactFragment>();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/login") {
      setChildren(<Login />);
    } else if (pathname === "/reset-password") {
      setChildren(<ResetPassword />);
    } else if (pathname === "/request-reset") {
      setChildren(<RequestReset />);
    }
  }, [pathname]);

  return (
    <div className="container">
      <div className="left-side">
        <img src={logoAuth} alt="Happy logo" />
      </div>
      <div className="right-side">{children}</div>
    </div>
  );
};

export default AuthLayout;
