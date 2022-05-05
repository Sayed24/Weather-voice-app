import { useState } from 'react';
import './App.css';
import { MW_BASE_URL, GET_PLACE_ENDPOINT } from './utils/keys';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSun } from '@fortawesome/free-solid-svg-icons';
import { WeatherData } from './components/WeatherData';
import useAlan from './hooks/useAlan';

function App() {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  //create the function for fetching weather data

  const fetchWeather = async (query) => {
    let PLACE_URL = `${MW_BASE_URL}${GET_PLACE_ENDPOINT}${query}`;
    const placeRes = await fetch(PLACE_URL);
    const placeData = await placeRes.json();

    if (placeData.length) {
      let WEATHER_URL = `${MW_BASE_URL}${placeData[0].woeid}/`;
      const weatherRes = await fetch(WEATHER_URL);
      const _weatherData = await weatherRes.json();
      //set our state
      setWeatherData(_weatherData);
      return _weatherData;
    }
  };

  //build our action handler for fetchWeather
  const getWeather = async () => {
    fetchWeather(query);
  };

  useAlan({ fetchWeather });

  //build our action handler for managing state of input
  const handleChange = ({ target: { value } }) => {
    setQuery(value);
  };

  // useEffect(() => {
  //   alanBtn({
  //     key: ALAN_AI_KEY,
  //     onCommand: (commandData) => {
  //       if (commandData.command === 'testCommand') {
  //         alert('This is an Alan AI demo');
  //       }
  //     },
  //   });
  // }, []);

  return (
    <div className='App'>
      <h3>Type in a city name to get weather updates!</h3>
      <div className='container'>
        <div>
          <FontAwesomeIcon icon={faSearch} />
          <input type='text' onChange={handleChange} />
        </div>
        <button onClick={getWeather}>
          <FontAwesomeIcon icon={faSun} /> &nbsp;
          <span>Get the weather!</span>
        </button>
      </div>
      {weatherData !== null && <WeatherData weatherData={weatherData} />}
    </div>
  );
}

export default App;
