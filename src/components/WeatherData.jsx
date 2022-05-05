import React from 'react';
import { IMG_URL } from '../utils/keys';

export const WeatherData = ({ weatherData }) => {
  return (
    <div className='weather-container'>
      <div className='main'>
        <img
          alt='weather icon'
          src={`${IMG_URL}${weatherData.consolidated_weather[0].weather_state_abbr}.svg`}
        />
        <p>
          It is &nbsp;
          <span>
            {weatherData.consolidated_weather[0].the_temp
              .toString()
              .slice(0, 5)}
            &#8451; ,
          </span>
          &nbsp;
          <span>{weatherData.consolidated_weather[0].weather_state_name}</span>
        </p>
      </div>
      <div className='header'>
        <span>
          <strong>Place:</strong> {weatherData.title},{' '}
          {weatherData.parent.title}
        </span>
        <span>
          <strong>Timezone:</strong>&nbsp;
          {weatherData.timezone}
        </span>
      </div>
      <div className='weather-info'>
        <p>
          <strong>Low:</strong>{' '}
          {weatherData.consolidated_weather[0].min_temp.toString().slice(0, 5)}
          &#8451;
        </p>
        <p>
          <strong>High:</strong>{' '}
          {weatherData.consolidated_weather[0].max_temp.toString().slice(0, 5)}
          &#8451;
        </p>
        <p>
          <strong>Humidity:</strong>{' '}
          {weatherData.consolidated_weather[0].humidity}
          &#8451;
        </p>
        <p>
          <strong>Wind:</strong>{' '}
          {weatherData.consolidated_weather[0].wind_speed
            .toString()
            .slice(0, 4)}
          &nbsp; &#8451;
        </p>
      </div>
    </div>
  );
};
