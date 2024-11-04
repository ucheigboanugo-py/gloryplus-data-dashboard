// Map.js
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

// Set your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoidWNoZWxvdWlzNDUiLCJhIjoiY20zMHhoMjU4MG52czJtc2dyZzk1ZTF1cCJ9.mEGv1tIskRGRlIpqb0MO-A';

const Map = ({ coordinates }) => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        // Initialize the map
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [coordinates.lng, coordinates.lat], // Make sure coordinates are in [lng, lat] format
            zoom: 15
        });

        // Add a marker at the given coordinates
        new mapboxgl.Marker()
            .setLngLat([coordinates.lng, coordinates.lat])
            .addTo(map);

        // Clean up on component unmount
        return () => map.remove();
    }, [coordinates]);

    return (
        <div
            ref={mapContainerRef}
            style={{ width: '100%', height: '300px' }}
        />
    );
};

export default Map;

