import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

export default function Home() {
  const mapContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mapContainer.current) return;
    import mapboxgl from 'mapbox-gl';
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-79.94, 32.78],
      zoom: 12,
    });

    map.on('load', () => {
      map.addSource('parcels', {
        type: 'vector',
        tiles: [`https://${process.env.NEXT_PUBLIC_TILE_DOMAIN}/tiles/{z}/{x}/{y}.pbf`],
      });
      map.addLayer({
        id: 'parcel-fill',
        source: 'parcels',
        'source-layer': 'parcels',
        type: 'fill',
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.2,
        },
      });
    });
    return () => map.remove();
  }, []);

  return <div ref={mapContainer} className="w-full h-screen" />;
}
