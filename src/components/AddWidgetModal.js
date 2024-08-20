import React, { useState } from 'react';
import { Tabs, Tab, List, ListItem, ListItemText, Checkbox, Button, Box, Typography, TextField } from '@mui/material';

const AddWidgetForm = ({ onConfirm, onCancel }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedWidgets, setSelectedWidgets] = useState([]);
  const [inputValues, setInputValues] = useState({});

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSelectedWidgets([]); // Reset selected widgets when switching tabs
    setInputValues({}); // Reset additional input values
  };

  const handleToggle = (widget) => () => {
    const currentIndex = selectedWidgets.indexOf(widget);
    const newChecked = [...selectedWidgets];

    if (currentIndex === -1) {
      newChecked.push(widget);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedWidgets(newChecked);
    setInputValues((prev) => ({
      ...prev,
      [widget]: prev[widget] || {}, // Initialize if not present
    }));
  };

  const handleInputChange = (widget, field) => (event) => {
    setInputValues((prev) => ({
      ...prev,
      [widget]: {
        ...prev[widget],
        [field]: event.target.value,
      },
    }));
  };

  const widgetCategories = [
    { label: 'CSPM', widgets: ['Cloud Accounts', 'Cloud Account Risk Assessment'] },
    { label: 'CWPP', widgets: ['Top 5 Namespace Specific Alerts', 'Workload Alerts'] },
    { label: 'Image', widgets: ['Image Risk Assessment', 'Image Security Issues'] },
  ];

  const handleConfirm = () => {
    const category = widgetCategories[selectedTab].label;

    const widgetsArray = Array.isArray(selectedWidgets) ? selectedWidgets : [];

    const widgetObjects = widgetsArray.map((widget) => {
      let displayText = '';

      if (widget === 'Cloud Accounts') {
        displayText = `Connected: ${inputValues[widget]?.Connected || 0}, Not Connected: ${inputValues[widget]?.NotConnected || 0}`;
      } else if (widget === 'Cloud Account Risk Assessment') {
        displayText = `Failed: ${inputValues[widget]?.Failed || 0}, Passed: ${inputValues[widget]?.Passed || 0}`;
      } else if (widget === 'Top 5 Namespace Specific Alerts') {
        displayText = `Data for ${widget}: ${inputValues[widget]?.Data || 'N/A'}`;
      } else if (widget === 'Workload Alerts') {
        displayText = `Data for ${widget}: ${inputValues[widget]?.Data || 'N/A'}`;
      } else if (widget === 'Image Risk Assessment') {
        displayText = `Critical: ${inputValues[widget]?.Critical || 0}, High: ${inputValues[widget]?.High || 0}, Medium: ${inputValues[widget]?.Medium || 0}, Low: ${inputValues[widget]?.Low || 0}`;
      } else if (widget === 'Image Security Issues') {
        displayText = `Critical: ${inputValues[widget]?.Critical || 0}, High: ${inputValues[widget]?.High || 0}, Medium: ${inputValues[widget]?.Medium || 0}, Low: ${inputValues[widget]?.Low || 0}`;
      }

      return {
        id: Date.now(),
        name: widget,
        text: displayText,
      };
    });

    onConfirm(widgetObjects, category);
  };

  return (
    <Box sx={{ padding: 2, width: '100%' }}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ marginBottom: 2 }}
      >
        {widgetCategories.map((category, index) => (
          <Tab key={category.label} label={category.label} />
        ))}
      </Tabs>

      <List>
        {widgetCategories[selectedTab].widgets.map((widget) => (
          <ListItem key={widget} button onClick={handleToggle(widget)}>
            <Checkbox
              checked={selectedWidgets.indexOf(widget) !== -1}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={widget} />
          </ListItem>
        ))}
      </List>

      {/* Additional inputs for selected widgets */}
      {selectedWidgets.map((widget) => (
        <Box key={widget} sx={{ marginTop: 2 }}>
          <Typography variant="subtitle1">{widget}</Typography>
          {widget === 'Cloud Accounts' && (
            <Box sx={{ marginTop: 1 }}>
              <Typography variant="body2">Connected:</Typography>
              <TextField
                type="number"
                value={inputValues[widget]?.Connected || 0}
                onChange={handleInputChange(widget, 'Connected')}
                InputProps={{ inputProps: { min: 0 } }}
              />
              <Typography variant="body2">Not Connected:</Typography>
              <TextField
                type="number"
                value={inputValues[widget]?.NotConnected || 0}
                onChange={handleInputChange(widget, 'NotConnected')}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Box>
          )}
          {widget === 'Cloud Account Risk Assessment' && (
            <Box sx={{ marginTop: 1 }}>
              <Typography variant="body2">Failed:</Typography>
              <TextField
                type="number"
                value={inputValues[widget]?.Failed || 0}
                onChange={handleInputChange(widget, 'Failed')}
                InputProps={{ inputProps: { min: 0 } }}
              />
              <Typography variant="body2">Passed:</Typography>
              <TextField
                type="number"
                value={inputValues[widget]?.Passed || 0}
                onChange={handleInputChange(widget, 'Passed')}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Box>
          )}
          {widget === 'Top 5 Namespace Specific Alerts' && (
            <Box sx={{ marginTop: 1 }}>
              <Typography variant="body2">Data:</Typography>
              <TextField
                type="text"
                value={inputValues[widget]?.Data || ''}
                onChange={handleInputChange(widget, 'Data')}
              />
            </Box>
          )}
          {widget === 'Workload Alerts' && (
            <Box sx={{ marginTop: 1 }}>
              <Typography variant="body2">Data:</Typography>
              <TextField
                type="text"
                value={inputValues[widget]?.Data || ''}
                onChange={handleInputChange(widget, 'Data')}
              />
            </Box>
          )}
          {widget === 'Image Risk Assessment' && (
            <Box sx={{ marginTop: 1 }}>
              <Typography variant="body2">Critical:</Typography>
              <TextField
                type="number"
                value={inputValues[widget]?.Critical || 0}
                onChange={handleInputChange(widget, 'Critical')}
                InputProps={{ inputProps: { min: 0 } }}
              />
              <Typography variant="body2">High:</Typography>
              <TextField
                type="number"
                value={inputValues[widget]?.High || 0}
                onChange={handleInputChange(widget, 'High')}
                InputProps={{ inputProps: { min: 0 } }}
              />
              <Typography variant="body2">Medium:</Typography>
              <TextField
                type="number"
                value={inputValues[widget]?.Medium || 0}
                onChange={handleInputChange(widget, 'Medium')}
                InputProps={{ inputProps: { min: 0 } }}
              />
              <Typography variant="body2">Low:</Typography>
              <TextField
                type="number"
                value={inputValues[widget]?.Low || 0}
                onChange={handleInputChange(widget, 'Low')}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Box>
          )}
          {widget === 'Image Security Issues' && (
            <Box sx={{ marginTop: 1 }}>
              <Typography variant="body2">Critical:</Typography>
              <TextField
                type="number"
                value={inputValues[widget]?.Critical || 0}
                onChange={handleInputChange(widget, 'Critical')}
                InputProps={{ inputProps: { min: 0 } }}
              />
              <Typography variant="body2">High:</Typography>
              <TextField
                type="number"
                value={inputValues[widget]?.High || 0}
                onChange={handleInputChange(widget, 'High')}
                InputProps={{ inputProps: { min: 0 } }}
              />
              <Typography variant="body2">Medium:</Typography>
              <TextField
                type="number"
                value={inputValues[widget]?.Medium || 0}
                onChange={handleInputChange(widget, 'Medium')}
                InputProps={{ inputProps: { min: 0 } }}
              />
              <Typography variant="body2">Low:</Typography>
              <TextField
                type="number"
                value={inputValues[widget]?.Low || 0}
                onChange={handleInputChange(widget, 'Low')}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Box>
          )}
        </Box>
      ))}

      <Box sx={{ position: 'fixed', bottom: 16, right: 16, display: 'flex', justifyContent: 'flex-end' }}>
  <Button
    variant="outlined"
    onClick={onCancel}
    sx={{ mr: 2 }}
  >
    Cancel
  </Button>
  <Button
    variant="contained"
    onClick={handleConfirm}
  >
    Confirm
  </Button>
</Box>

    </Box>
  );
};

export default AddWidgetForm;
