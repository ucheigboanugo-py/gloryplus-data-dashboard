// src/components/Map.js

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Ensure the access token is a valid string
mapboxgl.accessToken = "pk.eyJ1IjoidWNoZWxvdWlzNDUiLCJhIjoiY20zMHhoMjU4MG52czJtc2dyZzk1ZTF1cCJ9.mEGv1tIskRGRlIpqb0MO-A";

const Map = ({ coordinatesArray }) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    // Validate the coordinates array
    const isValidCoordinates = (coords) =>
        Array.isArray(coords) &&
        coords.every(coord => 
            typeof coord.lat === "number" && 
            typeof coord.lng === "number" && 
            !isNaN(coord.lat) &&
            !isNaN(coord.lng)
        );

    useEffect(() => {
        console.log("Map.js - coordinatesArray:", coordinatesArray); // Debugging log

        if (isValidCoordinates(coordinatesArray)) {
            try {
                // Initialize the map
                const bounds = coordinatesArray.reduce(
                    (bounds, coord) => bounds.extend([coord.lng, coord.lat]),
                    new mapboxgl.LngLatBounds([coordinatesArray[0].lng, coordinatesArray[0].lat], [coordinatesArray[0].lng, coordinatesArray[0].lat])
                );

                const map = new mapboxgl.Map({
                    container: mapContainerRef.current,
                    style: "mapbox://styles/mapbox/streets-v11",
                    center: [coordinatesArray[0].lng, coordinatesArray[0].lat],
                    zoom: 8,
                });

                // Add navigation controls (optional)
                map.addControl(new mapboxgl.NavigationControl());

                // Once the map is loaded, fit bounds and add markers
                map.on("load", () => {
                    map.fitBounds(bounds, {
                        padding: 20,
                        easing: (t) => t * (2 - t),
                    });

                    // Add markers for each coordinate
                    coordinatesArray.forEach((coord) => {
                        if (typeof coord.lng === "number" && typeof coord.lat === "number") {
                            console.log("Adding marker:", coord);
                            const marker = new mapboxgl.Marker()
                                .setLngLat([coord.lng, coord.lat])
                                .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(getBranchName(coord)))
                                .addTo(map);
                        } else {
                            console.error("Invalid marker coordinates:", coord);
                        }
                    });
                });

                mapRef.current = map;

                // Clean up on unmount
                return () => map.remove();
            } catch (error) {
                console.error("Error initializing Mapbox map:", error);
            }
        } else {
            console.error("Invalid coordinates provided for the map:", coordinatesArray);
        }
    }, [coordinatesArray]);

    // Helper function to map coordinates to branch names
    const getBranchName = (coord) => {
        const branchMap = {
            "6.9746,4.8472": "Port Harcourt",
            "7.4922,5.5250": "Umuahia",
            "7.3733,5.1216": "Aba",
            "3.3969,6.5855": "Ketu",
            "3.3515,6.6018": "Ikeja",
            "3.5725,6.4646": "Ajah",
        };
        const key = `${coord.lng},${coord.lat}`;
        return branchMap[key] || "Unknown Branch";
    };

    return <div style={{ width: "100%", height: "500px" }} ref={mapContainerRef} />;
};

export default Map;
