document.addEventListener('DOMContentLoaded', function() {
  fetch('/api/weather-summary')
    .then(response => response.json())
    .then(data => {
      const ctx = document.getElementById('weatherChart').getContext('2d');
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.dates,
          datasets: [{
            label: 'Average Temperature',
            data: data.avgTemps.map(temp => parseFloat(temp.toFixed(2))),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            pointRadius: 5, // Larger points
            pointHoverRadius: 8 // Larger points on hover
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Temperature (°C)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Date'
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Avg Temp: ${context.raw}°C`;
                }
              }
            }
          }
        }
      });
    });
});
