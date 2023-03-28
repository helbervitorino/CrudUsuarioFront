import React, { useState, useEffect } from "react";
import Chart from 'chart.js/auto';

const GraficoPizza = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:44337/api/Usuario/graficos/sistemasOperacionais");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const ctx = document.getElementById("pieChart");
    const labels = data.map((d) => d.nome);
    const values = data.map((d) => d.quantidade);
    const backgroundColors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#00E64D",
      "#FFA500",
      "#C71585",
      "#F08080",
      "#6495ED",
    ];
    const chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: backgroundColors,
          },
        ],
      },
    });
    return () => {
      chart.destroy();
    };
  }, [data]);

  return (
    <div class="d-flex justify-content-center" style={{ background: 'rgb(191, 200, 218)', width: '300px', height: '300px' }}>
      <canvas id="pieChart" />
    </div>
  );
};

export default GraficoPizza;
