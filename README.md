# Weather Monitoring System

## Project Overview
The Weather Monitoring System is a real-time data processing application that retrieves weather data from the OpenWeatherMap API. The system processes this data to provide summarized insights using rollups and aggregates and visualizes the data for easier comprehension.

## Features
- Real-time weather data retrieval for major Indian metros.
- Temperature conversion from Kelvin to Celsius.
- Daily weather summaries including average, maximum, and minimum temperatures, and dominant weather conditions.
- User-configurable thresholds for alerts based on temperature.
- Visualizations using Chart.js.


## Dependencies

- **Express:** For building the backend server.
- **Axios:** For making HTTP requests to the OpenWeatherMap API.
- **Chart.js** For creating visualizations.
- **Mocha & Chai:** For testing.

## Installation and Setup
### Prerequisites
- Node.js installed on your system.
- OpenWeatherMap API key.

### Installation Steps
1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/weather-monitoring.git
   cd weather-monitoring

   
2. **Install dependencies:**
   ```sh
   npm install
   
3. **Create a .env file:**
   
   OPENWEATHER_API_KEY=your_api_key_here


## Usage

1. **Start the Server:**
   ```sh
   node src/index.js

2. **Access the application:** Open your web browser and go to `http://localhost:3000`



## Testing

This project has undergone thorough testing to ensure robust functionality. Here’s a breakdown of the testing methods employed:

- **Run unit and system tests:**
  ```sh
  npm test

## Desigm Choices

## Architecture 

- **Backend:** Built with Node.js, using Express for the server and Axios for HTTP requests.
- **Frontend:** Built with HTML, CSS, and JavaScript, using Chart.js for visualizations.
  
## Data Processing

-  **Data Retrieval:** Fetches weather data every 5 minutes.
-  **Aggregates:** Calculates daily averages, maximum, and minimum temperatures.
-  **Alerts:** Configurable thresholds to alert when conditions are met

## Contributing 

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Version Control
- Follow Git best practices. Push your changes to GitHub.
## License
This project is licensed under the MIT License.
## Commit and Push:

1. **Add and Commit**:
   ```sh
   git add README.md
   git commit -m "Add comprehensive project README"
   git push origin main
