import React from 'react';
import data from '../data/kandadji2_app_data.json';

export default function InfoPanel({ isInside }: { isInside: boolean }) {
  return (
    <div className="absolute bottom-4 left-4 z-[1000] bg-white p-4 rounded shadow-md w-64">
      <h2 className="font-bold text-lg mb-2">Info Site: {data.summary.site_name}</h2>
      <p>Superficie: {data.summary.area_ha} ha</p>
      <p>Périmètre: {data.summary.perimeter_m} m</p>
      <p>Points: {data.summary.point_count}</p>
      <div className={`mt-2 p-2 rounded text-white ${isInside ? 'bg-green-600' : 'bg-red-600'}`}>
        {isInside ? 'Vous êtes à l\'intérieur' : 'Vous êtes à l\'extérieur'}
      </div>
    </div>
  );
}
