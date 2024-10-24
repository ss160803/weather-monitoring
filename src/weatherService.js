import axios from 'axios';
import dotenv from 'dotenv';
import { THRESHOLDS } from '../src/config.js';
dotenv.config();

const API_KEY = process.env.OPENWEATHER_API_KEY;
console.log('Loaded API key:', API_KEY);

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const METROS = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const dailySummary = {};

const getWeatherData = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric' 
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
    return null;
  }
};

cons

const updateDailySummary = (city, data) => {
  const date = new Date(data.dt * 1000).toISOString().split('T')[0]; // Extract the date
  if (!dailySummary[city]) dailySummary[city] = {};
  if (!dailySummary[city][date]) dailySummary[city][date] = { temps: [], weather: {} };

  const summary = dailySummary[city][date];

  if (!data.main || typeof data.main.temp === 'undefined') {
    console.error(`Invalid temperature data for ${city}`);
    return;
  }
  if (!data.weather || !data.weather[0]) {
    console.error(`Invalid weather data for ${city}`);
    return;
  }

  summary.temps.push(data.main.temp);
  summary.weather[data.weather[0].main] = (summary.weather[data.weather[0].main] || 0) + 1;

  summary.avgTemp = summary.temps.reduce((sum, temp) => sum + temp, 0) / summary.temps.length;
  summary.maxTemp = Math.max(...summary.temps);
  summary.minTemp = Math.min(...summary.temps);
  summary.dominantWeather = Object.keys(summary.weather).reduce((a, b) => summary.weather[a] > summary.weather[b] ? a : b);
};

const alertState = {};

const checkTemperatureThreshold = (city, temp) => {
  if (!alertState[city]) {
    alertState[city] = { highTempCount: 0 };
  }

  if (temp > THRESHOLDS.temperature.high) {
    alertState[city].highTempCount++;
    if (alertState[city].highTempCount >= THRESHOLDS.temperature.consecutiveUpdates) {
      triggerAlert(city, `Temperature exceeded ${THRESHOLDS.temperature.high} degrees Celsius`);
    }
  } else {
    alertState[city].highTempCount = 0;
  }
};

const triggerAlert = (city, message) => {
  console.log(`ALERT for ${city}: ${message}`);
  // Here you can implement sending an email or other alert mechanism
};

let isFetching = false;

const fetchWeatherForMetros = async () => {
  if (isFetching) return; // Avoid overlapping invocations
  isFetching = true;

  try {
    for (const city of METROS) {
      const data = await getWeatherData(city);
      if (data) {
        console.log(`Weather data for ${city}:`, data);

        updateDailySummary(city, data);
        checkTemperatureThreshold(city, data.main.temp);
      }
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  } finally {
    isFetching = false; // Release the lock
  }

  // Log the daily summaries (for testing; replace with actual storage)
  console.log('Daily Summaries:', dailySummary);
};

setInterval(fetchWeatherForMetros, 5 * 60 * 1000); // Fetch data every 5 minutes

const getDailySummary = () => dailySummary;

export { getWeatherData, fetchWeatherForMetros, getDailySummary };