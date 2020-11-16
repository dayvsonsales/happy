import { Marker } from "react-leaflet";
import React from "react";
import Map from "../Map";
import L from "leaflet";

import mapMarkerImg from "../../assets/images/map-marker.svg";
import editIcon from "../../assets/images/edit.svg";
import deleteIcon from "../../assets/images/delete.svg";

import { Orphanage } from "../../models/Orphanage";

import arrow from "../../assets/images/arrow.svg";

import "./styles.css";
import { useHistory } from "react-router-dom";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

const Card: React.FC<{ orphanage: Orphanage }> = ({ orphanage }) => {
  const history = useHistory();

  return (
    <div className="container-card">
      <div className="container-map">
        <Map
          interactive={false}
          center={[orphanage.latitude, orphanage.longitude]}
        >
          <Marker
            icon={happyMapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
          />
        </Map>
      </div>

      <div className="card-information">
        <p>{orphanage.name}</p>
        <div>
          {orphanage.pending ? (
            <img id="arrow" src={arrow} alt="Show orphanage" />
          ) : (
            <>
              <img
                src={editIcon}
                alt="Edit orphanage"
                onClick={() => history.push(`/orphanages/edit/${orphanage.id}`)}
              />
              <img src={deleteIcon} alt="Delete orphanage" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
