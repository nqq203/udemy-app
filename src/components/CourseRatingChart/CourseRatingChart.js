import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Đảm bảo các module được đăng ký tự động

const CourseRatingChart = () => {
  const data = {
    labels: ['Khóa Học 1', 'Khóa Học 2', 'Khóa Học 3', 'Khóa Học 4'], // Tên của các khóa học
    datasets: [
      {
        label: 'Rating',
        data: [4.5, 4.0, 3.5, 4.2], // Rating của mỗi khóa học
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 5, // Giả sử rating tối đa là 5
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default CourseRatingChart;
