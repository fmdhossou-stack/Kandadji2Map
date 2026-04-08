/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import InfoPanel from './components/InfoPanel';
import LayerControls from './components/LayerControls';
import { booleanPointInPolygon } from '@turf/turf';
import data from './data/kandadji2_app_data.json';

export default function App() {
  const [showBoundary, setShowBoundary] = useState(true);
  const [isInside, setIsInside] = useState(false);

  const handleUserLocationChange = (lat: number, lng: number) => {
    const userPoint = { type: 'Feature', geometry: { type: 'Point', coordinates: [lng, lat] }, properties: {} };
    const isInside = booleanPointInPolygon(userPoint as any, data.boundary_polygon_geojson as any);
    setIsInside(isInside);
  };

  return (
    <div className="h-screen w-screen relative">
      <MapComponent
        showBoundary={showBoundary}
        onUserLocationChange={handleUserLocationChange}
      />
      <LayerControls
        showBoundary={showBoundary}
        setShowBoundary={setShowBoundary}
      />
      <InfoPanel isInside={isInside} />
    </div>
  );
}
