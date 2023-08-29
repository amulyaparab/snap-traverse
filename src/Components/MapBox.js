// import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import { NavigationControl } from "react-map-gl";
import { useScreenshot } from "../Contexts/ScreenShotProvider";

export const MapBox = () => {
  const map = useRef(null);
  const initialLongitude = 73.8562;
  const initialLatitude = 18.5204;
  const [viewPort, setViewPort] = useState({
    width: "100%",
    height: "100%",
    longitude: initialLongitude,
    latitude: initialLatitude,
    zoom: 10,
  });

  const { setScreenShot } = useScreenshot();
  const accessToken = process.env.REACT_APP_MAP_TOKEN;

  console.log(viewPort);
  const fetchImage = async () => {
    const res = await fetch(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${viewPort.longitude},${viewPort.latitude},${viewPort.zoom},0/300x300?access_token=${accessToken}`
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
      setScreenShot(objectURL);
    } else {
      console.error("Error fetching image data");
    }
  };
  return (
    <div id="map-container" className="map">
      <Map
        onMove={(event) => setViewPort(event.viewState)}
        {...viewPort}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        mapStyle="mapbox://styles/ames2700/cllw50r3000g901pj638y82b0"
      >
        <NavigationControl />
        <Marker longitude={initialLongitude} latitude={initialLatitude} />
        <GeolocateControl
          position="top-left"
          positionOptions={{ enableHighAccuracy: true }}
        />
      </Map>
      <button onClick={() => fetchImage()}>Take a Screenshot</button>
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
