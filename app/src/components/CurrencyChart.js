import React, { useRef, useEffect } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip
} from "chart.js";
import "chartjs-adapter-moment";

export default function CurrencyChart({ data }) {
  const chartRef = useRef();

  useEffect(() => {
    if (chartRef && chartRef.current) {
      Chart.register(
        LineController,
        LineElement,
        PointElement,
        CategoryScale,
        LinearScale,
        TimeScale,
        Tooltip
      );

      new Chart(chartRef.current, {
        type: "line",
        data: {
          datasets: [
            {
              label: "Price",
              borderColor: 'cornflowerblue',
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
            mode: 'nearest',
          },
          plugins: {
            tooltip: {
              enabled: true,
              position: "nearest",
            },
          },
          scales: {
            x: {
              type: "time",
            },
          },
        },
      });
    }
  }, []);

  return <canvas ref={chartRef} id="myChart"></canvas>;
}
