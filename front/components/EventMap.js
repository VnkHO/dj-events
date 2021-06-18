import {useState, useEffect} from 'react'

import Image from 'next/image'
import ReactMapGl, {Marker} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Geocode from 'react-geocode'

export default function EventMap({evt}) {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [loading, setLoading] = useState(true)

  const [viewport, setViewport] = useState({
    latitude: 40.71272,
    longitude: -73.935242,
    width: '100%',
    height: '500px',
    zoom: 12,
  })

  useEffect(() => {
    Geocode.fromAddress(evt?.address).then(
      (response) => {
        const {lat, lng} = response.results[0].geometry.location
        setLat(lat)
        setLong(lng)
        setViewport({...viewport, latitude: lat, longitude: lng})
        setLoading(false)
      },
      (error) => {
        console.error(error)
      },
    )
  }, [])

  // Geo coding
  Geocode.setApiKey(proces.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY)

  if (loading) return false

  console.log('LAT', lat)
  console.log('LONG', lng)

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      <Marker key={evt?.id} latitude={lat} longitude={lng}>
        <Image src="/images/pin.svg" width={30} height={30} alt="pin" />
      </Marker>
    </ReactMapGl>
  )
}
