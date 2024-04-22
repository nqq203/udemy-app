import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useQuery } from 'react-query';

const options = {
  scales: {
    y: {
      beginAtZero: true,
    }
  }
};

const RevenueChart = ({ revenueData }) => {
  
  
  const data = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
    datasets: [
      {
        label: 'Total Revenue',
        data: revenueData, // Điền giá trị doanh thu thực tế vào đây
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1
      },
    ],
  };

  return <Line data={data} options={options}/>;
}

export default RevenueChart;
