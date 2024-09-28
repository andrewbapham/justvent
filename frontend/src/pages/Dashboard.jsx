// Dashboard.jsx
import React from 'react';
import { Container, Grid } from '@mantine/core';
import Barchart from './Barchart';
import Radarchart from './Radarchat.jsx';


const Dashboard = () => {
  return (
    <Container size="md" style={{ marginTop: '140px' }}>
        <h1> Your <i>current</i> state of mind</h1>
      <Grid>
      
        <Grid.Col span={6}>
          <Barchart />
        </Grid.Col>

       
        <Grid.Col span={6}>
          <Radarchart />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Dashboard;
