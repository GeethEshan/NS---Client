import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import FastfoodIcon from '@mui/icons-material/Fastfood';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.main', mb: 4 }}>
      <Toolbar>
        <FastfoodIcon sx={{ mr: 2, fontSize: 30 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          NutriScan
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/analyze">
            Meal Analysis
          </Button>
          <Button color="inherit" component={Link} to="/bmi">
            BMI Calculator
          </Button>
          <Button color="inherit" component={Link} to="/about">
           About
          </Button>
          <Button color="inherit" component={Link} to="/blog">
           Blog
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;