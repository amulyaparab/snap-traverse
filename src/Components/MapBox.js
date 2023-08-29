import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import { NavigationControl } from "react-map-gl";
import { useScreenshot } from "../Contexts/ScreenShotProvider";
import { useBox } from "../Contexts/BoxProvider";

export const MapBox = () => {
  const initialLongitude = 73.8562;
  const initialLatitude = 18.5204;
  const initialViewport = {
    width: "100%",
    height: "100%",
    longitude: initialLongitude,
    latitude: initialLatitude,
    zoom: 10,
  };

  const [viewPort, setViewPort] = useState(
    initialViewport
      ? JSON.parse(localStorage.getItem("prevMapState"))
      : initialViewport
  );

  const { setScreenShot, setShowModal } = useScreenshot();
  const { setBoxTexture } = useBox();
  const accessToken = process.env.REACT_APP_MAP_TOKEN;

  console.log(viewPort);
  const fetchImage = async () => {
    const res = await fetch(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${viewPort.longitude},${viewPort.latitude},${viewPort.zoom},0/300x300?access_token=${accessToken}`
    );
    if (res.status === 200 || res.status === 201) {
      const data = await res.arrayBuffer();
      const blob = new Blob([data], { type: "image/jpeg" });
      const objectURL = URL.createObjectURL(blob);
      setScreenShot(objectURL);
      setBoxTexture(objectURL);
      setShowModal(true);
      setTimeout(() => setShowModal(false), 1500);
    } else {
      console.error("Error fetching image data");
    }
  };
  useEffect(() => {
    localStorage.setItem("prevMapState", JSON.stringify(viewPort));
  }, [viewPort]);
  useEffect(() => {
    setViewPort(JSON.parse(localStorage.getItem("prevMapState")));
  }, []);
  const mapStyles = "mapbox://styles/ames2700/cllw50r3000g901pj638y82b0";

  return (
    <div id="map-container" className="map">
      <Map
        id="go-behind"
        onMove={(event) => setViewPort(event.viewState)}
        {...viewPort}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        mapStyle={mapStyles}
        aria-label="Open Street Map"
      >
        <NavigationControl />
        <Marker
          id="go-behind"
          aria-label="Map Marker"
          longitude={initialLongitude}
          latitude={initialLatitude}
        />
        <GeolocateControl
          id="go-behind"
          position="top-left"
          positionOptions={{ enableHighAccuracy: true }}
        />
      </Map>
      <button
        className="screenshot-btn"
        onClick={() => {
          fetchImage();
          // navigate("/cube");
        }}
      >
        Take a Screenshot
      </button>
    </div>
  );
};

//   useEffect(() => {
//     mapboxgl.accessToken = accessToken;
//     const mapBox = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v12",
//       center: [viewPort.longitude, viewPort.latitude],
//       zoom: viewPort.zoom,
//     });
//     if (!map.current) {
//       map.current = mapBox;
//     }
//     const nav = new mapboxgl.NavigationControl();
//     mapBox.addControl(nav, "top-right");
//     mapBox.addControl(
//       new mapboxgl.GeolocateControl({
//         positionOptions: {
//           enableHighAccuracy: true,
//         },
//         trackUserLocation: true,
//         showUserHeading: true,
//       })
//     );
//     const marker1 = new mapboxgl.Marker()
//       .setLngLat([73.8562, 18.5204])
//       .addTo(mapBox);
//     mapBox.addControl(new mapboxgl.ScaleControl());
//     console.log(map, mapContainer);
//     map.current.on("move", () => {
//       setViewPort({
//         ...viewPort,
//         longitude: map.current.getCenter().lng.toFixed(4),
//       });
//       setViewPort({
//         ...viewPort,
//         latitude: map.current.getCenter().lat.toFixed(4),
//       });
//       setViewPort({ ...viewPort, zoom: map.current.getZoom().toFixed(2) });
//     });
//     console.log(viewPort);
//     return () => mapBox.remove();
//   }, []);
