import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Marker } from "react-leaflet";
import L from "leaflet";

import mapMarkerImg from "../../assets/images/map-marker.svg";

import PrimaryButton from "../../components/PrimaryButton";
import Sidebar from "../../components/Sidebar";
import Map from "../../components/Map";

import { Orphanage } from "../../models/Orphanage";
import { useParams } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});

interface Params {
  id?: string;
}

export default function ViewOrphanage() {
  const { id } = useParams<Params>();
  const [orphanage, setOrphanage] = useState<Orphanage | undefined>(undefined);

  const [activeImage, setActiveImage] = useState<string>("");

  function handleImageClick(event: React.MouseEvent<HTMLButtonElement>) {
    setActiveImage(event.currentTarget.children[0].attributes[0].value);
  }

  useEffect(() => {
    async function loadOrphanage() {
      const { data } = await api.get(`/orphanages/${id}`);

      setOrphanage(data);
    }

    loadOrphanage();
  }, [id]);

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="wrapper-form">
          {orphanage ? (
            <div className="orphanage-details">
              <img src={activeImage} alt={orphanage.name} />

              <div className="images">
                {orphanage.images?.map((image) => (
                  <button type="button" onClick={(e) => handleImageClick(e)}>
                    <img src={image.path} alt={orphanage.name} />
                  </button>
                ))}
              </div>

              <div className="orphanage-details-content">
                <h1>{orphanage.name}</h1>
                <p>{orphanage.about}</p>

                <div className="map-container">
                  <Map
                    interactive={false}
                    center={[orphanage.latitude, orphanage.longitude]}
                    zoom={16}
                    style={{ width: "100%", height: 280 }}
                  >
                    <Marker
                      interactive={false}
                      icon={happyMapIcon}
                      position={[orphanage.latitude, orphanage.longitude]}
                    />
                  </Map>

                  <footer>
                    <a
                      target="__blank"
                      href={`https://www.google.com/maps/@${orphanage.latitude},${orphanage.longitude},15z`}
                    >
                      Ver rotas no Google Maps
                    </a>
                  </footer>
                </div>

                <hr />

                <h2>Instruções para visita</h2>
                <p>{orphanage.instructions}</p>

                <div className="open-details">
                  <div className="hour">
                    <FiClock size={32} color="#15B6D6" />
                    {orphanage.opening_hours}
                  </div>
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                    {orphanage.open_on_weekends ? (
                      <>
                        Atendemos <br />
                        fim de semana
                      </>
                    ) : (
                      <>Infelizmente não atendemos nos finais de semana :(</>
                    )}
                  </div>
                </div>

                <PrimaryButton
                  type="button"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${orphanage.phone_number}`,
                      "__blank"
                    )
                  }
                >
                  <FaWhatsapp size={20} color="#FFF" />
                  Entrar em contato
                </PrimaryButton>
              </div>
            </div>
          ) : (
            <div className="orphanage-details">
              <div className="orphanage-details-content">
                <h1>Não encontramos este orfanato :(</h1>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
