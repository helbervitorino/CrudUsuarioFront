import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function GraficoLine() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:44337/api/Usuario/graficos/registrosPorDia')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const chartData = {
    labels: data.map(item => item.data),
    datasets: [
      {
        label: 'Quantidade de cadastros',
        data: data.map(item => item.quantidade),
        fill: false,
        borderColor: 'rgb(102, 17, 209)',
        tension: 1
      }
    ]
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
            stepSize: 1
          }
        }
      ]
    }
  };

  return (
    <Line data={chartData} options={chartOptions} />
  );
}

export default GraficoLine;
