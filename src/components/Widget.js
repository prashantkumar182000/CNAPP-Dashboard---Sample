// src/components/Widget.js
import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useStore } from '../store/store';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Widget = ({ categoryId, widget }) => {
  const removeWidget = useStore((state) => state.removeWidget);

  const renderChart = () => {
    if (widget.name === 'Cloud Accounts') {
      const data = {
        labels: ['Connected', 'Not Connected'],
        datasets: [
          {
            label: 'Cloud Accounts',
            data: widget.text.split(', ').map(item => parseInt(item.split(': ')[1])),
            backgroundColor: ['#36A2EB', '#FF6384'],
          },
        ],
      };
      return <Bar data={data} />;
    } 
    else if (widget.name === 'Cloud Account Risk Assessment') {
      const data = {
      labels: ['Failed', 'Passed'],
      datasets: [
      {
      label: 'Cloud Account Risk Assessment',
      data: widget.text.split(', ').map(item => parseInt(item.split(': ')[1])),
      backgroundColor: ['#36A2EB', '#FF6384'],
      },
      ],
      };
      return <Bar data={data} />;
      }
      
    else if (widget.name === 'Image Risk Assessment' || widget.name === 'Image Security Issues') {
      const data = {
        labels: ['Critical', 'High', 'Medium', 'Low'],
        datasets: [
          {
            label: 'Image Risk Assessment',
            data: widget.text.split(', ').map(item => parseInt(item.split(': ')[1])),
            backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB', '#FF9F40'],
          },
        ],
      };
      return <Pie data={data} />;
    }

    return <Typography variant="body2">{widget.text}</Typography>;
  };

  return (
    <Card variant="outlined" sx={{ minWidth: '550px', maxWidth: '700px', height: '300px', width: '550px', position: 'relative' }}>
      <CardContent>
        <Typography variant="h6">{widget.name}</Typography>
        {renderChart()}
      </CardContent>
      <IconButton
        sx={{ position: 'absolute', top: '5px', right: '5px' }}
        onClick={() => removeWidget(categoryId, widget.id)}
      >
        <CloseIcon />
      </IconButton>
    </Card>
  );
};

export default Widget;
