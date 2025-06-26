import { Box, Typography, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/food-banner.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        p: 3,
        mb: 4,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Discover Your Meal's Nutrition
        </Typography>
        <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4 }}>
          Upload a photo of your meal and get instant nutrition analysis
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/analyze"
            sx={{
              px: 4,
              py: 2,
              fontSize: '1.1rem',
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Analyze Meal
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            component={Link}
            to="/bmi"
            sx={{
              px: 4,
              py: 2,
              fontSize: '1.1rem',
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
              },
            }}
          >
            Calculate BMI
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Hero;