import React from "react";
import Sidebar from "../../components/Sidebar";

const DefaultLayout: React.FC<{ isDashboard: boolean }> = () => {
  return (
    <div>
      <Sidebar isDashboard />
    </div>
  );
};

export default DefaultLayout;
