import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlus } from "react-icons/fi";

import mapMarkerImg from "../../assets/images/map-marker.svg";
import Map from "../../components/Map";

import api from "../../services/api";
import { Orphanage } from "../../models/Orphanage";

import ReactLeafletSearch from "react-leaflet-search";

import "./styles.css";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState([] as Orphanage[]);
  const [latitude, setLatitude] = useState(-27.2092052);
  const [longitude, setLongitude] = useState(-49.6401092);

  useEffect(() => {
    async function loadOrphanages() {
      const { data } = await api.get("/orphanages?pending=false");

      setOrphanages(data);
    }

    loadOrphanages();

    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Escolha uma cidade</strong>
          <span>Brasil</span>
        </footer>
      </aside>

      <Map center={[latitude, longitude]} boxZoom={true} zoomControl={true}>
        <ReactLeafletSearch
          position="topleft"
          inputPlaceholder="Search a location"
          showMarker={false}
          zoom={15}
          closeResultsOnClick={true}
          openSearchOnLoad={false}
          className="search-custom-style"
        >
          {(info) => <></>}
        </ReactLeafletSearch>
        {orphanages.map((orphanage) => (
          <Marker
            icon={happyMapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
          >
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#fff" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}
