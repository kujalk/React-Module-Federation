// catalog-app/src/Catalog.js
import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const catalogItems = [
  {
    id: 1,
    title: 'Book One',
    description: 'An intriguing tale of adventure and discovery.',
  },
  {
    id: 2,
    title: 'Book Two',
    description: 'A fascinating exploration of history and mystery.',
  },
  {
    id: 3,
    title: 'Book Three',
    description: 'Insights into science and innovation for modern readers.',
  },
  {
    id: 4,
    title: 'Book Four',
    description: 'Nature',
  },
  {
    id: 5,
    title: 'Book Five',
    description: 'Forests and Oceans',
  },
  {
    id: 6,
    title: 'Book Six',
    description: 'Data Structures and Algorithms',
  },
];

const Catalog = () => {
  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {catalogItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Catalog;
