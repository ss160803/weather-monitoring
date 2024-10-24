import express from 'express';
import path from 'path';
import { fetchWeatherForMetros, getDailySummary } from './weatherService.js';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Endpoint to provide weather summary data
app.get('/api/weather-summary', async (req, res) => {
  try {
    await fetchWeatherForMetros();
    const dailySummary = getDailySummary();
    console.log("Daily Summary: ", dailySummary);
    if (!dailySummary['Delhi']) {
      throw new Error('No data for Delhi');
    }
    res.json({
      dates: Object.keys(dailySummary['Delhi']),
      avgTemps: Object.values(dailySummary['Delhi']).map(summary => summary.avgTemp)
    });
  } catch (error) {
    console.error('Error in /api/weather-summary:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Start fetching weather data
fetchWeatherForMetros().then(() => {
  console.log('Weather data fetching initiated');
}).catch(err => {
  console.error('Error initializing weather data fetching:', err);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app };
