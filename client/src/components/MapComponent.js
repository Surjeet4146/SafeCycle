import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const MapComponent = ({ start, end }) => {
  const mapRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!start || !end) return;

    const geocodeAddress = async (address) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/geocode`, { params: { address } });
        return response.data.location;
      } catch (err) {
        setError('Failed to geocode address. Please try again.');
        return null;
      }
    };

    const initMap = async () => {
      const startCoords = await geocodeAddress(start);
      const endCoords = await geocodeAddress(end);
      if (!startCoords || !endCoords) return;

      const map = new google.maps.Map(mapRef.current, {
        center: startCoords,
        zoom: 12,
        styles: [
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#d1d1d1' }] },
          { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'on' }] },
        ],
      });

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      const safetyScore = (route) => {
        const bikeLaneScore = Math.random() * 0.8 + 0.2; // Mock: 0.2-1.0
        const trafficScore = Math.random() * 0.5 + 0.1; // Mock: 0.1-0.6
        const accidentScore = Math.random() * 0.3 + 0.1; // Mock: 0.1-0.4
        return 0.5 * bikeLaneScore + 0.3 / (trafficScore + 0.01) + 0.2 / (accidentScore + 0.01);
      };

      directionsService.route(
        {
          origin: startCoords,
          destination: endCoords,
          travelMode: google.maps.TravelMode.BICYCLING,
          provideRouteAlternatives: true,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            const safestRoute = result.routes.reduce((best, route) => {
              const score = safetyScore(route);
              return !best || score > safetyScore(best) ? route : best;
            }, null);

            directionsRenderer.setDirections({ ...result, routes: [safestRoute] });

            const bikeLaneOverlay = new google.maps.Polyline({
              path: safestRoute.overview_path,
              strokeColor: '#00FF00',
              strokeWeight: 5,
              strokeOpacity: 0.7,
            });
            bikeLaneOverlay.setMap(map);

            const placesService = new google.maps.places.PlacesService(map);
            placesService.textSearch(
              { query: 'bicycle shop', location: startCoords, radius: 5000 },
              (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  results.slice(0, 3).forEach((place) => {
                    new google.maps.Marker({
                      position: place.geometry.location,
                      map,
                      title: place.name,
                      icon: { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
                    });
                  });
                }
              }
            );
          } else {
            setError('Failed to load route. Please try different locations.');
          }
        }
      );
    };

    if (window.google) {
      initMap();
    }
  }, [start, end]);

  return (
    <div>
      <div ref={mapRef} className="h-[500px] w-full rounded-lg" role="region" aria-label="Interactive Map"></div>
      {error && <p className="mt-2 text-red-600" role="alert">{error}</p>}
    </div>
  );
};

export default MapComponent;