import React, { useRef, useEffect } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

export default function CurrencyChart({ data }) {
  const chartRef = useRef();

  useEffect(() => {
    if (chartRef && chartRef.current) {
      Chart.register(
        LineController,
        LineElement,
        PointElement,
        CategoryScale,
        LinearScale
      );

      new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              borderColor: "cornflowerblue",
              borderWidth: 1,
              radius: 0,
              data: data,
            },
          ],
        },
        options: {
          responsive: true,
          interaction: {
            intersect: false,
          },
          plugins: {
            legend: true,
          },
          scales: {
            x: {
              type: "linear",
            },
          },
        },
      });
    }
  }, []);

  return <canvas ref={chartRef} id="myChart"></canvas>;
}
