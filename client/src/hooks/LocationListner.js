import {useState, useEffect} from 'react'

function useLocationListener() {
   const [location, setLocation]=useState(null)
  useEffect(() => {
      checkLocation()
  }, [])
    const checkLocation= async function checkLocationInfo(){
       const userLocation = await navigator.geolocation.getCurrentPosition(function(position) {
        // console.log("Latitude is :", position.coords.latitude);
        // console.log("Longitude is :", position.coords.longitude);
        setLocation({latitude: position.coords.latitude, longitude:position.coords.longitude})
      });
   }
    return {location}
}
export default useLocationListener