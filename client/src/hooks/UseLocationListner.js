import { useState, useEffect } from "react";
const axios = require("axios");

function useLocationListener() {
  const [location, setLocation] = useState(null);
  const [place, setPlace] = useState(null);
  useEffect(() => {
    const checkLocation = function checkLocationInfo() {
      const userLocation = navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log("Latitude is :", position.coords.latitude);
          // console.log("Longitude is :", position.coords.longitude);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    };
    checkLocation();
  }, []);
  useEffect(() => {
    const placeAddress = async function getCurrentPlaceAddress() {
      if (location !== null) {
        try {
          const latitude = location.latitude;
          const longitude = location.longitude;
          const apikey = process.env.REACT_APP_API_KEY;
          const response = await axios.get(
            `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=en-US&apiKey=${apikey}`
          );
          console.log(response.data.items[0]);
          setPlace({
            country: response.data.items[0].address.countryName,
            province: response.data.items[0].address.state,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("no location found");
      }
    };
    placeAddress();
  }, [location]);

  return { place };
}
export default useLocationListener;
