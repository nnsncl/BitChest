import React, { useRef, useEffect } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

export default function CurrencyChart() {
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

      const data = [];
      let prev = 100;
      for (let i = 0; i < 1000; i++) {
        prev += 5 - Math.random() * 10;
        data.push({ x: i, y: prev });
      }

      console.log(data);

      const chartInstance = new Chart(chartRef.current, {
        type: "line",
        data: {
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
          interaction: {
            intersect: false,
          },
          plugins: {
            legend: false,
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
