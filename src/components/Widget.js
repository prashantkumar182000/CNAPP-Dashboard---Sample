// src/components/Widget.js
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useStore } from '../store/store';
import { Bar, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title 
} from 'chart.js';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title
);

const Widget = ({ categoryId, widget }) => {
  const removeWidget = useStore((state) => state.removeWidget);

  const renderChart = () => {
    if (widget.name === 'Cloud Accounts') {
      const data = {
        labels: ['Connected', 'Not Connected'],
        datasets: [
          {
            data: widget.text.split(', ').map(item => parseInt(item.split(': ')[1])),
            backgroundColor: ['#bbbdbf', '#0344ab'],
          },
        ],
      };
      return (
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Box sx={{ height: '250px', width: '250px', mx: 'auto' }}>
              <Doughnut
                data={data}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ pl: 2 }}>
              <Typography variant="caption">
                <span style={{ color: '#bbbdbf', marginRight: '8px', fontSize: '16px', verticalAlign: 'middle' }}>●</span> 
                Connected ({data.datasets[0].data[0]})
              </Typography>
              <br />
              <Typography variant="caption">
                <span style={{ color: '#0344ab', marginRight: '8px', fontSize: '16px', verticalAlign: 'middle' }}>●</span> 
                Not Connected ({data.datasets[0].data[1]})
              </Typography>
            </Box>
          </Grid>
        </Grid>
      );
    } else if (widget.name === 'Cloud Account Risk Assessment') {
      const data = {
        labels: ['Failed', 'Warning', 'Not Available', 'Passed'],
        datasets: [
          {
            data: widget.text.split(', ').map(item => parseInt(item.split(': ')[1])),
            backgroundColor: ['#a60024', '#ffcc4a', '#bbbdbf', '#3aa600'],
          },
        ],
      };
      return (
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Box sx={{ height: '250px', width: '250px', mx: 'auto' }}>
              <Doughnut
                data={data}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ pl: 2 }}>
              <Typography variant="caption">
                <span style={{ color: '#a60024', marginRight: '8px', fontSize: '16px', verticalAlign: 'middle' }}>●</span> 
                Failed ({data.datasets[0].data[0]})
              </Typography>
              <br />
              <Typography variant="caption">
                <span style={{ color: '#ffcc4a', marginRight: '8px', fontSize: '16px', verticalAlign: 'middle' }}>●</span> 
                Warning ({data.datasets[0].data[1]})
              </Typography>
              <br />
              <Typography variant="caption">
                <span style={{ color: '#bbbdbf', marginRight: '8px', fontSize: '16px', verticalAlign: 'middle' }}>●</span> 
                Not Available ({data.datasets[0].data[2]})
              </Typography>
              <br />
              <Typography variant="caption">
                <span style={{ color: '#3aa600', marginRight: '8px', fontSize: '16px', verticalAlign: 'middle' }}>●</span> 
                Passed ({data.datasets[0].data[3]})
              </Typography>
            </Box>
          </Grid>
        </Grid>
      );
    } else if (
      widget.name === 'Image Risk Assessment' || 
      widget.name === 'Image Security Issues'
    ) {
      // Parse severity data from widget text
      const severityData = widget.text.split(', ').map(item => {
        const [severity, value] = item.split(': ');
        return {
          severity,
          value: parseInt(value),
          color: getSeverityColor(severity)
        };
      });

      const total = severityData.reduce((sum, item) => sum + item.value, 0);

      // Calculate percentages
      const critical = severityData.find(item => item.severity === 'Critical')?.value || 0;
      const high = severityData.find(item => item.severity === 'High')?.value || 0;
      const medium = severityData.find(item => item.severity === 'Medium')?.value || 0;
      const low = severityData.find(item => item.severity === 'Low')?.value || 0;

      const criticalPercent = Math.round((critical / total) * 100);
      const highPercent = Math.round((high / total) * 100);
      const mediumPercent = Math.round((medium / total) * 100);
      const lowPercent = Math.round((low / total) * 100);

      // Grafana-style stacked horizontal bar chart
      return (
        <Box sx={{ mt: 6, height: '200px' }}>
          {/* Total count display */}
          <Typography variant="h6" align="center" gutterBottom>
            {total} Total Findings
          </Typography>

          {/* Stacked bar container */}
          <Box sx={{ 
            height: '20px', 
            width: '100%', 
            backgroundColor: '#f0f2f5',
            borderRadius: '15px',
            overflow: 'hidden',
            position: 'relative',
            marginTop: '40px',
          }}>
            {severityData.map((item, index) => (
              <Box 
                key={index}
                sx={{
                  position: 'absolute',
                  left: `${severityData.slice(0, index).reduce((sum, i) => sum + (i.value/total)*100, 0)}%`,
                  width: `${(item.value/total)*100}%`,
                  height: '100%',
                  backgroundColor: item.color,
                  display: 'inline-block'
                }}
              />
            ))}
          </Box>

          {/* Severity legend - Now in 2 rows */}
          <Box sx={{ mt: 6 }}>
            {/* First row - Critical and High */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box sx={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: getSeverityColor('Critical'),
                    borderRadius: '50%',
                    mr: 1
                  }} />
                  <Typography variant="body2">
                    Critical: {critical} ({criticalPercent}%)
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box sx={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: getSeverityColor('High'),
                    borderRadius: '50%',
                    mr: 1
                  }} />
                  <Typography variant="body2">
                    High: {high} ({highPercent}%)
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            {/* Second row - Medium and Low */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box sx={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: getSeverityColor('Medium'),
                    borderRadius: '50%',
                    mr: 1,
                    
                  }} />
                  <Typography variant="body2">
                    Medium: {medium} ({mediumPercent}%)
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box sx={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: getSeverityColor('Low'),
                    borderRadius: '50%',
                    mr: 1
                  }} />
                  <Typography variant="body2">
                    Low: {low} ({lowPercent}%)
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      );
    } else if (widget.name === 'Top 5 Namespace Specific Alerts') {
      // Parse alert data from widget text
      const alerts = widget.text.split('; ').map(alert => {
        const [namespace, count] = alert.split(': ');
        return { namespace, count: parseInt(count) };
      });

      return (
        <Box sx={{ mt: 12 }}>
         
          <List dense sx={{ maxHeight: 250, overflow: 'auto' }}>
            {alerts.map((alert, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ py: 1 }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {alert.namespace}
                        </Typography>
                        <Chip 
                          label={alert.count} 
                          size="small" 
                          sx={{ 
                            backgroundColor: getAlertCountColor(alert.count),
                            color: 'white',
                            fontWeight: 'bold',
                            minWidth: '40px'
                          }} 
                        />
                      </Box>
                    }
                  />
                </ListItem>
                {index < alerts.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      );
    } else if (widget.name === 'Workload Alerts') {
      // Parse workload alert data from widget text
      const workloads = widget.text.split('; ').map(workload => {
        const [name, count] = workload.split(': ');
        return { name, count: parseInt(count) };
      });

      return (
        <Box sx={{ mt: 12 }}>
    
          <List dense sx={{ maxHeight: 250, overflow: 'auto' }}>
            {workloads.map((workload, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ py: 1 }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {workload.name}
                        </Typography>
                        <Chip 
                          label={workload.count} 
                          size="small" 
                          sx={{ 
                            backgroundColor: getAlertCountColor(workload.count),
                            color: 'white',
                            fontWeight: 'bold',
                            minWidth: '40px'
                          }} 
                        />
                      </Box>
                    }
                  />
                </ListItem>
                {index < workloads.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      );
    }

    return <Typography variant="body2">{widget.text}</Typography>;
  };

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: '550px',
        maxWidth: '700px',
        height: '350px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CardContent>
        <Typography variant="h6">{widget.name}</Typography>
        {renderChart()}
      </CardContent>
      <IconButton
        sx={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          color: '#5a607f',
        }}
        onClick={() => removeWidget(categoryId, widget.id)}
      >
        <CloseIcon />
      </IconButton>
    </Card>
  );
};

// Helper function to get color based on severity
function getSeverityColor(severity) {
  switch (severity.toLowerCase()) {
    case 'critical': return '#400001';
    case 'high': return '#bf191c';
    case 'medium': return '#cc5800';
    case 'low': return '#bdad02';
    default: return '#9e9e9e';
  }
}

// Helper function to get color based on alert count
function getAlertCountColor(count) {
  if (count >= 50) return '#a60024';
  if (count >= 20) return '#cc5800';
  if (count >= 10) return '#ffcc4a';
  return '#3aa600';
}

export default Widget;