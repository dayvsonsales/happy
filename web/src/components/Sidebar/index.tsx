import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import mapMarkerImg from "../../assets/images/map-marker.svg";
import logoutIcon from "../../assets/images/logout.svg";
import readyIcon from "../../assets/images/ready-locations-icon.svg";
import pendingIcon from "../../assets/images/pending-locations-icon.svg";

import "./styles.css";
import { useUserContext } from "../../contexts/UserContext";

interface SidebarProps {
  isDashboard?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isDashboard }: SidebarProps) => {
  const { goBack } = useHistory();
  const { logout } = useUserContext();

  return (
    <aside className="sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      {isDashboard && (
        <div className="group-button">
          <Link to="/dashboard?type=active">
            <img src={readyIcon} alt="Active" />
          </Link>
          <Link to="/dashboard?type=pending">
            <img src={pendingIcon} alt="Pending" />
          </Link>
        </div>
      )}

      <footer>
        {isDashboard ? (
          <button type="button" onClick={logout}>
            <img src={logoutIcon} alt="Logout" />
          </button>
        ) : (
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        )}
      </footer>
    </aside>
  );
};

export default Sidebar;
