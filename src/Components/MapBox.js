import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import { NavigationControl } from "react-map-gl";
import { useBox } from "../Contexts/BoxProvider";
import { useLocation } from "react-router-dom";
import {
  initialLatitude,
  initialLongitude,
  initialViewport,
  mapStyles,
} from "../Constants/constants";
import { fetchMapImage } from "../Constants/api";

export const MapBox = () => {
  const location = useLocation();

  const { setShowCube, setBoxTexture, setScreenShot, setShowModal } = useBox();
  const mapStateFromLocalStorage = localStorage.getItem("prevMapState");

  const defaultViewportValue = mapStateFromLocalStorage
    ? JSON.parse(mapStateFromLocalStorage)
    : initialViewport;

  const [viewPort, setViewPort] = useState(defaultViewportValue);
  const viewportRef = useRef(defaultViewportValue);

  const accessToken = process.env.REACT_APP_MAP_TOKEN;

  const { latitude, longitude, zoom } = viewPort || {};

  const fetchImage = async () => {
    try {
      const res = await fetch(
        fetchMapImage(longitude, latitude, zoom, accessToken)
      );
      if (res.status === 200 || res.status === 201) {
        const data = await res.arrayBuffer();

        const base64Data = btoa(
          new Uint8Array(data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );

        const objectURL = `data:image/jpeg;base64,${base64Data}`;

        localStorage.setItem("screenshot", objectURL);
        setScreenShot(objectURL);
        setBoxTexture(objectURL);
        setShowModal(true);
        setTimeout(() => setShowModal(false), 3000);
        setShowCube(true);
      } else {
        console.error("Error fetching image data");
      }
    } catch (error) {
      console.error("Error fetching image data");
    }
  };

  useEffect(() => {
    return () => {
      localStorage.setItem("prevMapState", JSON.stringify(viewportRef.current));
    };
  }, [location.pathname]);

  return (
    <div id="map-container" className="map">
      <Map
        onMove={(event) => {
          viewportRef.current = event.viewState;
          setViewPort(event.viewState);
        }}
        {...viewPort}
        reuseMaps
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        mapStyle={mapStyles}
        aria-label="Open Street Map"
        preserveDrawingBuffer={true}
      >
        <Marker
          aria-label="Map Marker"
          longitude={initialLongitude}
          latitude={initialLatitude}
        />
        <GeolocateControl
          position="top-left"
          positionOptions={{ enableHighAccuracy: true }}
        />
        <NavigationControl />
      </Map>
      <button className="screenshot-btn" onClick={fetchImage}>
        Take a Screenshot
      </button>
    </div>
  );
};
