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
              data: data.avgTemps,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      });
  });
  