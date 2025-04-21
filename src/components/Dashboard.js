import React from 'react';
import { Grid, Container } from '@mui/material';
import { useStore } from '../store/store';
import Category from './Category';

const Dashboard = ({ openModal }) => {
  const { categories } = useStore();

  return (
    <Container
      sx={{
        width: '100%',
        maxWidth: '100%',
        padding: 0,
        '@media (min-width: 1200px)': {
          maxWidth: '1900px',
        },
      }}
    >
      <Grid container spacing={4} style={{ width: '100%', margin: 0 }}>
        {categories.map((category) => (
          <Grid item xs={12} key={category.id}>
            <Category category={category} openModal={openModal} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
