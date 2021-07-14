import React from 'react'
import locationListener from '../hooks/LocationListner'
export default function Profile() {
    const {location}= locationListener()
    console.log(location)
    if(!location){
        return null
    }
    return (
        <div>
           <p>{location.latitude}</p>
        </div>
    )
}
