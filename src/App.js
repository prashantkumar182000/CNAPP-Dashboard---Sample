import React, { useState } from 'react';
import { Container, Typography, Drawer, Box } from '@mui/material';
import Dashboard from './components/Dashboard';
import AddWidgetForm from './components/AddWidgetModal';
import { useStore } from './store/store';
import './App.css';

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const addWidget = useStore((state) => state.addWidget);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => setIsDrawerOpen(false);

  const handleConfirm = (selectedWidgets, category) => {
    const categoryMap = {
      CSPM: 1,
      CWPP: 2,
      Image: 3,
      Ticket: 4,
    };

    const categoryId = categoryMap[category];
    
    if (categoryId) {
      selectedWidgets.forEach((widget) => {
        addWidget(categoryId, widget);
      });
    }
    closeDrawer(); // Close the drawer after confirming
  };

  const handleCancel = () => {
    closeDrawer(); // Close the drawer on cancel
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        padding: '0px 24px',
        '@media (min-width: 1200px)': {
          padding: '0px 48px',
        },
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        CNAPP Dashboard
      </Typography>
      <Dashboard openModal={openDrawer} />
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={closeDrawer}
        sx={{ 
          '& .MuiDrawer-paper': { 
            width: 600,  // Adjust the width of the drawer
            padding: '20px',  // Add padding to match the design
          } 
        }}
      >
        <Box>
          <Typography variant="h6" gutterBottom>
            Personalize your dashboard by adding the following widget
          </Typography>
          <AddWidgetForm onConfirm={handleConfirm} onCancel={handleCancel} />
        </Box>
      </Drawer>
    </Container>
  );
};

export default App;
