'use client'
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

type Props = {}

const Geopoint = ({lat, lng} :{lat:number; lng:number}) => {
  // const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const mapContainer = useRef<HTMLDivElement>(null);
    


  useEffect(() => {
    // @ts-ignore
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",

        //@ts-ignore
        center: [lng,lat],
        zoom: 10,
        maxZoom: 12,
        

      });

      const marker = new mapboxgl.Marker(
      )
            .setLngLat([lng,lat])
            .addTo(map);
      return () => map.remove();
    }
  }, []);

   // const {coordinates} ;  
  return (
  
      <div ref={mapContainer}
      style={{height:'400px', }} />
  )
}

export default Geopoint