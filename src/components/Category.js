// src/components/Category.js
import React from 'react';
import { Typography, Box } from '@mui/material';
import Widget from './Widget';
import './Category.css';

const Category = ({ category, openModal }) => {
  return (
    <Box sx={{ marginBottom: '10px', marginTop: '-4px' }}>
      <Typography variant="h6" gutterBottom>
        {category.name}
      </Typography>
      <Box className="widget-container" sx={{ display: 'flex', overflowX: 'auto', gap: 2 }}>
        {category.widgets.map((widget) => (
          <Widget key={widget.id} categoryId={category.id} widget={widget} />
        ))}
        <Box className="add-widget" onClick={() => openModal(category.id)}>
          + Add Widget
        </Box>
      </Box>
    </Box>
  );
};

export default Category;
