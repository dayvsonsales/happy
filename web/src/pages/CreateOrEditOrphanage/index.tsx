import React, { FormEvent, useEffect, useState } from "react";
import { Marker } from "react-leaflet";

import PrimaryButton from "../../components/PrimaryButton";
import Sidebar from "../../components/Sidebar";

import { FiPlus } from "react-icons/fi";
import Map from "../../components/Map";
import happyMapIcon from "../../components/Map/happMapIcon";
import { useHistory, useParams } from "react-router-dom";
import api from "../../services/api";
import { LeafletEvent, LeafletMouseEvent } from "leaflet";

import ReactLeafletSearch from "react-leaflet-search";
import Done from "../../components/Actions/Done";
import { Image } from "../../models/Image";

import "./styles.css";

interface OrphanageParams {
  id?: string | undefined;
}

const DEFAULT_LATITUDE = -27.2092052;
const DEFAULT_LONGITUDE = -49.6401092;

export default function CreateOrEditOrphanage() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [zoom, setZoom] = useState(15);
  const [showAlertSuccess, setShowAlertSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedImages, setSelectedImages] = useState<Image[]>([] as Image[]);

  const [error, setError] = useState<boolean>(false);

  const { id } = useParams<OrphanageParams>();

  function moveMaker(e: LeafletMouseEvent) {
    const { lat, lng } = e.latlng;
    setLatitude(lat);
    setLongitude(lng);
  }

  function handleZoom(e: LeafletEvent) {
    setZoom(e.target._zoom);
  }

  async function create() {
    setLoading(true);
    try {
      await api.post("/orphanages", getData());

      setShowAlertSuccess(true);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  }

  async function edit() {
    setLoading(true);
    try {
      await api.post(`/orphanages/edit/${id}`, getData());

      setShowAlertSuccess(true);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setError(false);
    setLoading(false);

    if (!id) {
      create();
    } else {
      edit();
    }
  }

  function handleFile(inputFiles: any) {
    const files = Array.from(inputFiles);

    Promise.all(
      files.map((file: any) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = (event: any) => {
            const __file: Image = {
              path: event.target.result,
            };

            resolve(__file);
          };
          reader.readAsDataURL(file);
        });
      })
    ).then((images) => {
      setSelectedImages(images as Image[]);
    });
  }

  function showInputFile() {
    document.getElementById("file")?.click();
  }

  function getData() {
    const formData = new FormData();
    const files = document.getElementById("file") as any;

    formData.append("name", name);
    formData.append("about", about);
    formData.append("instructions", instructions);
    formData.append("opening_hours", opening_hours);
    formData.append("open_on_weekends", open_on_weekends.toString());
    formData.append("latitude", latitude.toString());
    formData.append("longitude", longitude.toString());

    for (let i = 0; i < files.files.length; i++) {
      formData.append("files", files.files[i]);
    }

    return formData;
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
  }, [id]);

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      {showAlertSuccess && !id && (
        <Done
          alertMessage="O orfanato foi editado com sucesso!"
          alertButtonMessage="Voltar"
          callback={() => setShowAlertSuccess(false)}
        />
      )}

      {showAlertSuccess && (
        <Done
          alertMessage="O cadastro deu certo e foi enviado ao administrador para
          ser aprovado. Agora é só esperar :)"
          alertButtonMessage="Voltar para o mapa"
          callback={() => history.push("/app")}
        />
      )}
      <main>
        <div className="wrapper-form">
          <form className="create-orphanage-form" onSubmit={handleSubmit}>
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
                <label htmlFor="name">
                  Nome
                  <span>Mínimo 8 caracteres e máximo de 128 caracteres</span>
                </label>
                <input
                  required
                  id="name"
                  value={name}
                  minLength={8}
                  maxLength={128}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="about">
                  Sobre
                  <span>
                    Mínimo de 30 caracteres e máximo de 300 caracteres
                  </span>
                </label>
                <textarea
                  required
                  id="about"
                  minLength={30}
                  maxLength={300}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="images">Fotos</label>

                <div className="uploaded-image">
                  {selectedImages.map((image) => (
                    <img
                      width="128"
                      height="128"
                      key={image.path}
                      alt="Orphanage"
                      src={image.path}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={showInputFile}
                  className="new-image"
                >
                  <input
                    id="file"
                    type="file"
                    multiple
                    accept="image/*"
                    name="files"
                    style={{ display: "none" }}
                    onChange={(e) => handleFile(e.target.files)}
                  />
                  <FiPlus size={24} color="#15b6d6" />
                </button>
              </div>
            </fieldset>

            <fieldset>
              <legend>Visitação</legend>

              <div className="input-block">
                <label htmlFor="instructions">
                  Instruções
                  <span>
                    Mínimo de 30 caracteres e máximo de 300 caracteres
                  </span>
                </label>
                <textarea
                  required
                  id="instructions"
                  value={instructions}
                  minLength={30}
                  maxLength={300}
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="opening_hours">
                  Horário das visitas
                  <span>Formato livre. Até 256 caracteres</span>
                </label>
                <input
                  required
                  id="opening_hours"
                  value={opening_hours}
                  maxLength={256}
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
            {error && (
              <div className="error">
                Aconteceu um erro ao cadastrar/editar orfanato.
              </div>
            )}
            {!loading ? (
              <PrimaryButton type="submit">Confirmar</PrimaryButton>
            ) : (
              <PrimaryButton type="submit" disabled>
                Aguarde...
              </PrimaryButton>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
