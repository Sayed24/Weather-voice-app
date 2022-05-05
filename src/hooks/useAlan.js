import { useEffect, useRef } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { ALAN_AI_KEY } from '../utils/keys';

import React from 'react';

const useAlan = ({ fetchWeather }) => {
  const alanBtnInstance = useRef(null);

  const getWeather = async (location) => {
    const weather = await fetchWeather(location);
    alanBtnInstance.current.playText(
      `It's ${weather.consolidated_weather[0].the_temp
        .toString()
        .slice(0, 4)} degrees celsius in ${location} and expected to be ${
        weather.consolidated_weather[0].weather_state_name
      }`
    );
  };

  useEffect(() => {
    if (!alanBtnInstance.current) {
      alanBtnInstance.current = alanBtn({
        key: ALAN_AI_KEY,
        onCommand: async (data) => {
          if (data.location) getWeather(data.location);
        },
      });
    }
  }, []);
  return null;
};

export default useAlan;
