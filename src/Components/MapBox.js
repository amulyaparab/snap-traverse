import mapboxgl from "mapbox-gl";
import { useEffect } from "react";

export const MapBox = () => {
  const accessToken =
    "pk.eyJ1IjoiYW1lczI3MDAiLCJhIjoiY2xscm9rbGdhMHRndTNocHM5ZTJqZDc4MiJ9.XWi7h4ohG2YIbhjR3Li6lg";
  //     const initialViewport = {
  //       latitude: 37.7577,
  //       longitude: -122.4376,
  //       zoom: 10,
  //     };
  //       const [viewport, setViewport] = useState(initialViewport);

  //       const handleViewportChange = (newViewport) => {
  //         setViewport(newViewport);
  //       };

  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [73.8567, 18.5204],
      zoom: 10,
    });
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-right");
    return () => map.remove();
  }, []);
  return (
    <>
      <div id="map-container" className="map" />
    </>
  );
};
