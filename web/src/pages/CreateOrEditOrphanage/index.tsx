import React, { useEffect, useState } from "react";
import { Marker } from "react-leaflet";

import PrimaryButton from "../../components/PrimaryButton";
import Sidebar from "../../components/Sidebar";

import "./styles.css";

import { FiPlus } from "react-icons/fi";
import Map from "../../components/Map";
import happyMapIcon from "../../components/Map/happMapIcon";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import {
  LeafletEvent,
  LeafletMouseEvent,
} from "leaflet";

import ReactLeafletSearch from "react-leaflet-search";

interface OrphanageParams {
  id?: string | undefined;
}

const DEFAULT_LATITUDE = -27.2092052;
const DEFAULT_LONGITUDE = -49.6401092;

export default function CreateOrEditOrphanage() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [zoom, setZoom] = useState(15);

  const { id } = useParams<OrphanageParams>();

  function moveMaker(e: LeafletMouseEvent) {
    const { lat, lng } = e.latlng;
    setLatitude(lat);
    setLongitude(lng);
  }

  function handleZoom(e: LeafletEvent) {
    setZoom(e.target._zoom);
  }

  useEffect(() => {
    async function loadOrphanage() {
      const { data } = await api.get(`/orphanages/${id}`);

      setName(data.name);
      setAbout(data.about);
      setInstructions(data.instructions);
      setOpeningHours(data.opening_hours);
      setLatitude(data.latitude);
      setLongitude(data.longitude);
      setOpenOnWeekends(data.open_on_weekends);
    }

    if (id) {
      loadOrphanage();
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, []);

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <div className="wrapper-form">
          <form className="create-orphanage-form">
            <fieldset>
              <legend>Dados</legend>

              <Map
                interactive={true}
                doubleClickZoom={false}
                touchZoom={false}
                style={{ width: "100%", height: 280 }}
                center={
                  latitude && longitude
                    ? [latitude, longitude]
                    : [DEFAULT_LATITUDE, DEFAULT_LONGITUDE]
                }
                zoom={zoom}
                onclick={(e) => moveMaker(e)}
                onzoomend={(e) => handleZoom(e)}
              >
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[latitude, longitude]}
                />
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
              </Map>

              <div className="input-block">
                <label htmlFor="name">Nome</label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="about">
                  Sobre <span>Máximo de 300 caracteres</span>
                </label>
                <textarea
                  id="about"
                  maxLength={300}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="images">Fotos</label>

                <div className="uploaded-image"></div>

                <button className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </button>
              </div>
            </fieldset>

            <fieldset>
              <legend>Visitação</legend>

              <div className="input-block">
                <label htmlFor="instructions">Instruções</label>
                <textarea
                  id="instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="opening_hours">Horário das visitas</label>
                <input
                  id="opening_hours"
                  value={opening_hours}
                  onChange={(e) => setOpeningHours(e.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="open_on_weekends">Atende fim de semana</label>

                <div className="button-select">
                  <button
                    type="button"
                    className={open_on_weekends ? "active" : ""}
                    onClick={() => setOpenOnWeekends(true)}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    className={!open_on_weekends ? "active" : ""}
                    onClick={() => setOpenOnWeekends(false)}
                  >
                    Não
                  </button>
                </div>
              </div>
            </fieldset>

            <PrimaryButton type="submit">Confirmar</PrimaryButton>
          </form>
        </div>
      </main>
    </div>
  );
}
