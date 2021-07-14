import React from 'react'
import locationListener from '../hooks/LocationListner'
export default function Profile() {
    const {place}= locationListener()
    console.log(place)
    if(!place){
        return null
    }
    return (
        <div>
           <p>{place.country}</p>
           <p>{place.province}</p>
        </div>
    )
}
