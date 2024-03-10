import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import "./prediction.css"; // Import your CSS file
import { Button } from "@mui/material";
import { getPatientData } from "../../service/patientprediction";

export default function Prediction() {
  const [response, setResponse] = useState(null);
  const [doughnutChart, setDoughnutChart] = useState(null); // State to hold chart instance

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPatientData();
        setResponse(result.data);
      } catch (error) {
        console.error("Error:", error);
        setResponse({ prediction: "0.919991" })
        console.log("fetching from mock... ");
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
    const ctx = document.getElementById("doughnut-chart");

    // Destroy the previous chart if it exists
    if (doughnutChart) {
      doughnutChart.destroy();
    }

    // Create a new chart
    const newChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["risky", "safe"],
        datasets: [
          {
            data: [response.prediction * 100, 100 - response.prediction * 100],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)", // Color for the prediction
              "rgba(54, 162, 235, 0.5)", // Color for the remaining percentage
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
          <div className="button-container">
            <Button variant="contained" sx={{ bgcolor: "#6FB762" }}>
              Book Appointment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
