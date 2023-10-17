import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Dropdown = () => {
  const data = useSelector(state => state.location.data);
  const isDataArray = Array.isArray(data);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");

  const statesForSelectedCountry = selectedCountry ? selectedCountry.state : [];
  const citiesForSelectedState = selectedState ? selectedState.city : [];

  const handleSubmit = () => {
    console.log('Selected Country:', selectedCountry ? selectedCountry.country : 'No country selected');
    console.log('Selected State:', selectedState ? selectedState.state : 'No state selected');
    console.log('Selected City:', selectedCity || 'No city selected');
  };

  return (
    <div>
      {isDataArray && (
        <>
          <div>
            <label>Country: </label>
            <select 
              value={selectedCountry ? selectedCountry.country : ""}
              onChange={(e) => {
                const country = data.find(c => c.country === e.target.value);
                setSelectedCountry(country);
                setSelectedState(null);
                setSelectedCity("");
              }}
            >
              <option value="">Select a country</option>
              {data.map(country => (
                <option key={country.id} value={country.country}>
                  {country.country}
                </option>
              ))}
            </select>
          </div>

          {selectedCountry && (
            <div>
              <label>State: </label>
              <select 
                value={selectedState ? selectedState.state : ""}
                onChange={(e) => {
                  const state = statesForSelectedCountry.find(s => s.state === e.target.value);
                  setSelectedState(state);
                  setSelectedCity("");
                }}
              >
                <option value="">Select a state</option>
                {statesForSelectedCountry.map(state => (
                  <option key={state.id} value={state.state}>
                    {state.state}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedState && (
            <div>
              <label>City: </label>
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Select a city</option>
                {citiesForSelectedState.map(city => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button title="search" onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  );
};

export default Dropdown;
