// test/systemSetup.test.js
import { expect } from 'chai';
import request from 'supertest';
import { app } from '../src/index.js'; // Ensure this path is correct based on your project structure
import { fetchWeatherForMetros } from '../src/weatherService.js'; // Import the function to fetch weather data

describe('System Setup', function() {
  this.timeout(20000); // Increase timeout to accommodate longer API calls and data fetching

  before(async function() {
    // Ensure that weather data has been fetched before running tests
    console.log('Fetching weather data for testing...');
    await fetchWeatherForMetros(); // Fetch weather data before running tests
  });

  it('should start the server successfully', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('should connect to OpenWeatherMap API and return weather summary', async function() {
    const response = await request(app)
      .get('/api/weather-summary')
      .expect(200);
      
    // Check if the response contains 'dates' and 'avgTemps'
    expect(response.body).to.have.property('dates').that.is.an('array');
    expect(response.body).to.have.property('avgTemps').that.is.an('array');
    
    // Ensure the dates and avgTemps arrays are not empty
    expect(response.body.dates).to.have.lengthOf.above(0);
    expect(response.body.avgTemps).to.have.lengthOf.above(0);
  });
});
