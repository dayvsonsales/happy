import React from "react";
import Sidebar from "../../components/Sidebar";

import "./styles.css";

const DefaultLayout: React.FC<{ isDashboard: boolean }> = ({ children }) => {
  return (
    <div className="container-default">
      <Sidebar isDashboard />

      <div className="content">{children}</div>
    </div>
  );
};

export default DefaultLayout;
