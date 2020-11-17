import { Marker } from "react-leaflet";
import React, { useState } from "react";
import Map from "../Map";
import L from "leaflet";

import mapMarkerImg from "../../assets/images/map-marker.svg";
import editIcon from "../../assets/images/edit.svg";
import deleteIcon from "../../assets/images/delete.svg";

import { Orphanage } from "../../models/Orphanage";

import arrow from "../../assets/images/arrow.svg";

import { useHistory } from "react-router-dom";
import Delete from "../Actions/Delete";

import "./styles.css";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

const Card: React.FC<{ orphanage: Orphanage; callback(): void }> = ({
  orphanage,
  callback,
}) => {
  const history = useHistory();

  const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);

  async function handleDelete() {
    setShowDeleteWarning(true);
  }

  return (
    <>
      {showDeleteWarning && (
        <Delete
          id={orphanage.id}
          callback={() => {
            callback();
            setShowDeleteWarning(false);
          }}
        />
      )}
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
              <img
                id="arrow"
                src={arrow}
                alt="Show orphanage"
                onClick={() =>
                  history.push(`/orphanages/edit/${orphanage.id}/pending`)
                }
              />
            ) : (
              <>
                <img
                  src={editIcon}
                  alt="Edit orphanage"
                  onClick={() =>
                    history.push(`/orphanages/edit/${orphanage.id}`)
                  }
                />
                <img
                  src={deleteIcon}
                  alt="Delete orphanage"
                  onClick={() => handleDelete()}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
