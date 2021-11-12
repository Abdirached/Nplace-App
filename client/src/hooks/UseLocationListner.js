import { useState, useEffect } from "react";
const axios = require("axios");

function useLocationListener() {
  const [place, setPlace] = useState(null);
  useEffect(() => {
    const placeAddress = async function getCurrentPlaceAddress() {
      try {
        const response = await axios.get("https://geolocation-db.com/json/");
        console.log(response.data);
        setPlace(response.data.country_name);
      } catch (error) {
        console.log(error);
      }
    };
    placeAddress();
  }, []);

  return { place };
}
export default useLocationListener;
