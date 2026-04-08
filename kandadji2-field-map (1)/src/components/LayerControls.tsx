import React from 'react';

export default function LayerControls({ showBoundary, setShowBoundary }: any) {
  return (
    <div className="absolute top-4 left-4 z-[1000] bg-white p-4 rounded shadow-md">
      <h3 className="font-bold mb-2">Calques</h3>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={showBoundary} onChange={(e) => setShowBoundary(e.target.checked)} />
        Périmètre
      </label>
    </div>
  );
}
