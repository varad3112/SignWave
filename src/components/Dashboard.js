import React from 'react';
import { useNavigate } from 'react-router-dom';
import WebcamComponent from './WebcamComponent';
import { Box, Button, Typography } from '@mui/material';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authenticated'); // Remove authentication
    navigate('/'); // Redirect to login
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" p={2} bgcolor="#1976d2" color="white">
        <Typography variant="h5">Dashboard</Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <WebcamComponent /> {/* Camera feed component */}
    </Box>
  );
};

export default Dashboard;
