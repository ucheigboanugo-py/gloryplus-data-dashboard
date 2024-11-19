import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const Popup = ({ map, coordinates, content }) => {
    useEffect(() => {
        const isValidCoordinate = (lat, lng) =>
            lat != null && lng != null && typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng);
        
        // Only create popup if map and valid coordinates are provided
        if (map && isValidCoordinate(coordinates.lat, coordinates.lng)) {
            const popup = new mapboxgl.Popup({ offset: 25 })
                .setLngLat([coordinates.lng, coordinates.lat])
                .setHTML(`<p>${content}</p>`)
                .addTo(map);

            // Clean up popup on component unmount
            return () => popup.remove();
        }
    }, [map, coordinates, content]);

    return null; // Popups do not render anything directly to the DOM
};

export default Popup;
