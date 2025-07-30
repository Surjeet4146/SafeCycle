import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import HazardForm from './components/HazardForm';
import './styles.css';

const App = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-green-600" role="heading" aria-level="1">SafeCycle</h1>
        <p className="text-lg text-gray-700">Navigate with Confidence – Safety-First Routes for Cyclists</p>
      </header>
      <main className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="Start location (e.g., 123 Main St, San Francisco, CA)"
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Start location"
            required
          />
          <input
            type="text"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            placeholder="End location (e.g., 456 Market St, San Francisco, CA)"
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="End location"
            required
          />
        </div>
        <MapComponent start={start} end={end} />
        <HazardForm />
      </main>
    </div>
  );
};

export default App;