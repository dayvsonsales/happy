import React from "react";
import {
  Map as LeafletMap,
  MapProps as LeafletMapProps,
  TileLayer,
} from "react-leaflet";

interface MapProps extends LeafletMapProps {
  interactive?: boolean;
  children: React.ReactNode;
}

export default function Map({
  children,
  interactive = true,
  doubleClickZoom = true,
  touchZoom = true,
  zoom = 15,
  zoomControl = false,
  ...props
}: MapProps) {
  return (
    <LeafletMap
      center={props.center ? props.center : [-27.2092052, -49.6401092]}
      zoom={zoom}
      style={{ width: "100%", height: "100%" }}
      dragging={interactive}
      touchZoom={touchZoom}
      zoomControl={zoomControl}
      scrollWheelZoom={interactive}
      doubleClickZoom={doubleClickZoom}
      {...props}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
      />
      {children}
    </LeafletMap>
  );
}
