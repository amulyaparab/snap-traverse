import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import { NavigationControl } from "react-map-gl";
import { useBox } from "../Contexts/BoxProvider";
import { useLocation } from "react-router-dom";

export const MapBox = () => {
  const initialLongitude = 73.8562;
  const initialLatitude = 18.5204;
  const location = useLocation();
  const { setShowCube, setBoxTexture, setScreenShot, setShowModal } = useBox();

  const mapStateFromLocalStorage = localStorage.getItem("prevMapState");
  const initialViewport = {
    width: "100%",
    height: "100%",
    longitude: initialLongitude,
    latitude: initialLatitude,
    zoom: 10,
  };
  const [viewPort, setViewPort] = useState(
    mapStateFromLocalStorage
      ? JSON.parse(mapStateFromLocalStorage)
      : initialViewport
  );

  const accessToken = process.env.REACT_APP_MAP_TOKEN;
  const mapStyles = "mapbox://styles/ames2700/cllw50r3000g901pj638y82b0";

  const fetchImage = async () => {
    const res = await fetch(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${viewPort.longitude},${viewPort.latitude},${viewPort.zoom},0/300x300?access_token=${accessToken}`
    );
    if (res.status === 200 || res.status === 201) {
      const data = await res.arrayBuffer();
      // const base64Data = btoa(
      //   new Uint8Array(data).reduce(
      //     (data, byte) => data + String.fromCharCode(byte),
      //     ""
      //   )
      // const blob = new Blob([data], { type: "image/jpeg" });
      // const objectURL = URL.createObjectURL(blob);
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
  };

  useEffect(() => {
    localStorage.setItem("prevMapState", JSON.stringify(viewPort));
  }, [viewPort, location.pathname]);

  useEffect(() => {
    setViewPort(JSON.parse(localStorage.getItem("prevMapState")));
    return () => {
      console.log("map unmounted");
    };
  }, [location.pathname]);

  return (
    <div id="map-container" className="map">
      <Map
        onMove={(event) => setViewPort(event.viewState)}
        {...viewPort}
        reuseMaps
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        mapStyle={mapStyles}
        aria-label="Open Street Map"
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
      <button
        className="screenshot-btn"
        onClick={() => {
          fetchImage();
        }}
      >
        Take a Screenshot
      </button>
    </div>
  );
};
