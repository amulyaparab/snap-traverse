import mapboxgl from "mapbox-gl";
import { useEffect } from "react";

export const MapBox = () => {
  const accessToken =
    "pk.eyJ1IjoiYW1lczI3MDAiLCJhIjoiY2xscm9rbGdhMHRndTNocHM5ZTJqZDc4MiJ9.XWi7h4ohG2YIbhjR3Li6lg";

  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [73.8567, 18.5204],
      zoom: 10,
    });
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-right");
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );
    const marker1 = new mapboxgl.Marker()
      .setLngLat([73.8562, 18.5204])
      .addTo(map);
    map.addControl(new mapboxgl.ScaleControl());

    return () => map.remove();
  }, []);
  return (
    <>
      <div id="map-container" className="map" />
    </>
  );
};
