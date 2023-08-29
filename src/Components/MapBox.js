import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import ReactMapGl from "react-map-gl";
export const MapBox = () => {
  const map = useRef(null);
  const mapContainer = useRef(null);
  const [mapParameters, setMapParameters] = useState({
    lon: -122.3293,
    lat: 37.5516,
    zoom: 17.38,
    width: 300,
    height: 200,
  });

  const accessToken = process.env.REACT_APP_MAP_TOKEN;

  const [imageURL, setImageURL] = useState("");
  const fetchImage = async () => {
    const res = await fetch(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${mapParameters.lon},${mapParameters.lat},${mapParameters.zoom},0/${mapParameters.width}x${mapParameters.height}?access_token=${accessToken}`
    );
    if (res.status === 200 || res.status === 201) {
      const data = await res.arrayBuffer();
      const base64Data = btoa(
        new Uint8Array(data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      console.log(map?.current?.getCenter());
      const { lng, lat } = map?.current?.getCenter();
      const zoom = map.current.getZoom();
      console.log("Longitude:", lng);
      console.log("Latitude:", lat);
      console.log("Zoom:", zoom);
      const objectURL = `data:image/jpeg;base64,${base64Data}`;
      setImageURL(objectURL);
    } else {
      console.error("Error fetching image data");
    }
  };
  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    const mapBox = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [mapParameters.lon, mapParameters.lat],
      zoom: 10,
    });
    if (!map.current) {
      map.current = mapBox;
    }
    const nav = new mapboxgl.NavigationControl();
    mapBox.addControl(nav, "top-right");
    mapBox.addControl(
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
      .addTo(mapBox);
    mapBox.addControl(new mapboxgl.ScaleControl());
    console.log(map, mapContainer);
    return () => mapBox.remove();
  }, []);
  return (
    <>
      <div ref={mapContainer} id="map-container" className="map">
        {/* <ReactMapGl></ReactMapGl> */}
      </div>
      <button onClick={() => fetchImage()}>Take a Screenshot</button>
      {imageURL && <img src={imageURL} alt="API Fetched" />}
    </>
  );
};
