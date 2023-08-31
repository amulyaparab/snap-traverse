export const fetchMapImage = (longitude, latitude, zoom, token) => {
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${longitude},${latitude},${zoom},0/300x300?access_token=${token}`;
};
