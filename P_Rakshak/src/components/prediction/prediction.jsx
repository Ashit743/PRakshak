import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import mockPrediction from '../../mock/prediction.json';
import './prediction.css'; // Import your CSS file
import { Button } from '@mui/material';


export default function Prediction() {
  const [response, setResponse] = useState(null);
  const [doughnutChart, setDoughnutChart] = useState(null); // State to hold chart instance
  const ML_port = 5050;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = mockPrediction;
        const response = await fetch(`http://localhost:${ML_port}/predict`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        const result = await response.json();
        setResponse(result);
      } catch (error) {
        console.error('Error:', error);
        console.log("fetching from mock... ")
        setResponse({prediction:"0.919991"});
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (response) {
      createDoughnutChart();
    }
  }, [response]);

  const createDoughnutChart = () => {
    const ctx = document.getElementById('doughnut-chart');

    // Destroy the previous chart if it exists
    if (doughnutChart) {
      doughnutChart.destroy();
    }

    // Create a new chart
    const newChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['risky','safe'],
        datasets: [
          {
            data: [response.prediction * 100, 100 - (response.prediction * 100)],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)', // Color for the prediction
              'rgba(54, 162, 235, 0.5)', // Color for the remaining percentage
            ],
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
      },
    });
    setDoughnutChart(newChart);
  };

  return (
    <div className="container">
      <h2>Risk of hospitalization...</h2>
      {response && (
        <div className="response-container">
          <canvas id="doughnut-chart" width="400" height="400"></canvas>
          <div className="button-container"><Button variant="contained" sx={{ bgcolor: '#6FB762' }}>Book Appointment</Button></div>
        </div>
      )}
    </div>
  );
}
