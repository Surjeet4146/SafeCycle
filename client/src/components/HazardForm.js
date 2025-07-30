import React, { useState } from 'react';
import axios from 'axios';

const HazardForm = () => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/hazards`, { description, location });
      setMessage('Hazard reported successfully!');
      setDescription('');
      setLocation('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error reporting hazard. Please try again.');
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold text-gray-800" role="heading" aria-level="2">Report a Hazard</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-label="Hazard Reporting Form">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the hazard (e.g., pothole)"
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Hazard description"
          required
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g., 123 Main St)"
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Hazard location"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Submit hazard report"
        >
          Report
        </button>
      </form>
      {message && <p className="mt-2 text-gray-700" role="alert">{message}</p>}
    </div>
  );
};

export default HazardForm;