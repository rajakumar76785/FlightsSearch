import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [origin, setOrigin] = useState('SYD');
  const [destination, setDestination] = useState('JFK');
  const [cabin, setCabin] = useState('Economy');
  const [flights, setFlights] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const headers = {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9,hi;q=0.8',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    };

    const json_data = {
      origin,
      destination,
      partnerPrograms: [
        'Air Canada',
        'United Airlines',
        'KLM',
        'Qantas',
        'American Airlines',
        'Etihad Airways',
        'Alaska Airlines',
        'Qatar Airways',
        'LifeMiles',
      ],
      stops: 2,
      departureTimeFrom: '2024-07-09T00:00:00Z',
      departureTimeTo: '2024-10-07T00:00:00Z',
      isOldData: false,
      limit: 302,
      offset: 0,
      cabinSelection: [cabin],
      date: '2024-07-09T12:00:17.796Z',
    };

    try {
      const response = await axios.post('https://cardgpt.in/apitest', json_data, { headers });
      setFlights(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-lime-950 text-white p-8 flex items-center justify-center">
      <div className="max-w-lg w-full">
        <h1 className="text-2xl mb-4 text-center">Choose Origin & Destination Airports:</h1>
        <form className="space-y-4" onSubmit={handleSearch}>
          <div className="space-y-2">
            <label htmlFor="origin" className="block text-sm font-medium">Origin</label>
            <select
              id="origin"
              className="block w-full p-2 bg-green-800 text-white border border-gray-700 rounded-md focus:ring focus:ring-green-500 focus:border-green-500"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            >
              <option value="JFK">JFK</option>
              <option value="DEL">DEL</option>
              <option value="SYD">SYD</option>
              <option value="BOM">BOM</option>
              <option value="BNE">BNE</option>
              <option value="BLR">BLR</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="destination" className="block text-sm font-medium">Destination</label>
            <select
              id="destination"
              className="block w-full p-2 bg-green-800 text-white border border-gray-700 rounded-md focus:ring focus:ring-green-500 focus:border-green-500"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="JFK">JFK</option>
              <option value="DEL">DEL</option>
              <option value="SYD">SYD</option>
              <option value="LHR">LHR</option>
              <option value="CDG">CDG</option>
              <option value="DOH">DOH</option>
              <option value="SIN">SIN</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="cabin" className="block text-sm font-medium">Cabin Selection</label>
            <select
              id="cabin"
              className="block w-full p-2 bg-green-800 text-white border border-gray-700 rounded-md focus:ring focus:ring-green-500 focus:border-green-500"
              value={cabin}
              onChange={(e) => setCabin(e.target.value)}
            >
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First">First</option>
            </select>
          </div>
          <button type="submit" className="block w-32 mx-auto py-2 bg-green-600 text-white font-bold rounded-md focus:ring focus:ring-green-500 focus:border-green-500 hover:bg-green-700 transition">
            Search
          </button>
        </form>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {flights.length > 0 ? (
            flights.map((flight, index) => (
              <div key={index} className="bg-green-800 p-6 rounded-lg text-center shadow-lg">
                <img src="/path/to/logo.png" alt="Logo" className="w-12 h-12 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">{flight.partner_program}</h2>
                <p className="mb-2">{`${origin} → ${destination}`}</p>
                <p className="mb-4">2024-07-09 - 2024-10-07</p>
                <div className="space-y-2">
                  <p className="text-lg font-bold">
                    {flight.min_business_miles ? `${flight.min_business_miles.toLocaleString()} + $${flight.min_business_tax}` : 'N/A'} Min Business Miles
                  </p>
                  <p className="text-lg font-bold">
                    {flight.min_economy_miles ? `${flight.min_economy_miles.toLocaleString()} + $${flight.min_economy_tax}` : 'N/A'} Min Economy Miles
                  </p>
                  <p className="text-lg font-bold">
                    {flight.min_first_miles ? `${flight.min_first_miles.toLocaleString()} + $${flight.min_first_tax}` : 'N/A'} Min First Miles
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Try another search route.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

