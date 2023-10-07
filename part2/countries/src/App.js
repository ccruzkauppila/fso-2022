import axios from "axios";
import countriesService from "./services/countriesService.js";
import weatherService from "./services/weatherService.js";
import { useState, useEffect } from "react";

const Results = ({ results, onClick }) => {
  if (results.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (results.length === 0) {
    return <p>No matches found</p>;
  } else {
    return results.map((result) => {
      return(<div key={result.name.common}>
        {result.name.common} 
        <button onClick={() => onClick(result.name.common)}>show</button>
      </div>)
    });
  }
};

const InfoCard = ({ results }) => {
  if (results.length !== 1) return null;
  const country = results[0];
  console.log(country);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h1>languages</h1>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="flag" />
      <WeatherCard results={results} />
    </div>
  );
};

const WeatherCard = ({results}) => {
  if (results.length !== 1) return null;
  const country = results[0];
  const [lat, lon] = country.capitalInfo.latlng;
  const weather = weatherService.getWeather(lat, lon);
  console.log(weather);
  return (
    <div>
      <h1>{"Weather in " + country.capital}</h1>
      <p>population {country.population}</p>
      <h1>languages</h1>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="flag" />
    </div>
  );
}

function App() {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const handleSearch = (input) => {
    const matches = countriesService.getCountries(input);
    setInput(input);
    setResults(matches);
  };

  return (
    <div>
      <input value={input} onChange={(e) => handleSearch(e.target.value)} />
      <Results results={results}  onClick={handleSearch}/>
      <InfoCard results={results}  />
    </div>
  );
}

export default App;
