import { Marker, Popup } from "react-leaflet";
import React from "react";
import Map from "../Map";
import L from "leaflet";

import mapMarkerImg from "../../assets/images/map-marker.svg";
import editIcon from "../../assets/images/edit.svg";
import deleteIcon from "../../assets/images/delete.svg";

import "./styles.css";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

const Card: React.FC = () => {
  return (
    <div className="container-card">
      <div className="container-map">
        <Map interactive={false}>
          <Marker icon={happyMapIcon} position={[-27.2092052, -49.6401092]} />
        </Map>
      </div>

      <div className="card-information">
        <p>Orf. Esperança</p>
        <div>
          <img src={editIcon} alt="Edit orphanage" />
          <img src={deleteIcon} alt="Delete orphanage" />
        </div>
      </div>
    </div>
  );
};

export default Card;
