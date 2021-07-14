import {useState, useEffect} from 'react'
const axios = require('axios');

function useLocationListener() {
   const [location, setLocation]= useState(null)
   const [place, setPlace]= useState(null)
  useEffect(() => {
      checkLocation()
  }, [])
  useEffect(() => {
    placeAddress()
}, [location])
    const checkLocation= async function checkLocationInfo(){
       const userLocation = await navigator.geolocation.getCurrentPosition(function(position) {
        // console.log("Latitude is :", position.coords.latitude);
        // console.log("Longitude is :", position.coords.longitude);
        setLocation({latitude: position.coords.latitude, longitude:position.coords.longitude})
      });
   }
   const placeAddress = async function getCurrentPlaceAddress(){
     try {
      const latitude = location.latitude;
      const longitude = location.longitude;
      const apikey= process.env.REACT_APP_API_KEY
      const response = await axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=en-US&apiKey=${apikey}`)
      console.log(response.data.items[0])
      setPlace({country:response.data.items[0].address.countryName, province:response.data.items[0].address.state})
     } catch (error) {
       console.log(error)
     }
   }
    return {place}
}
export default useLocationListener