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

export default function CurrencyChart({ data, roi }) {
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
              borderColor: roi ? '#16c784' : '#ea3943',
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
    //eslint-disable-next-line
  }, []);

  return <canvas ref={chartRef} id="myChart"></canvas>;
}
