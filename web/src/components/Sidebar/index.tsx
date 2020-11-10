import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import mapMarkerImg from "../../assets/images/map-marker.svg";
import logoutIcon from "../../assets/images/logout.svg";
import readyIcon from "../../assets/images/ready-locations-icon.svg";
import pendingIcon from "../../assets/images/pending-locations-icon.svg";

import "./styles.css";
import { useUserContext } from "../../contexts/UserContext";

type SidebarBase = Omit<React.ElementType, "component">;

interface SidebarProps extends SidebarBase {
  isDashboard?: boolean;
}

export default function Sidebar({ isDashboard }: SidebarProps) {
  const { goBack } = useHistory();
  const { logout } = useUserContext();

  return (
    <aside className="sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      {isDashboard && (
        <div className="group-button">
          <button type="button" onClick={logout}>
            <img src={readyIcon} alt="Logout" />
          </button>
          <button type="button" onClick={logout}>
            <img src={pendingIcon} alt="Logout" />
          </button>
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
}
