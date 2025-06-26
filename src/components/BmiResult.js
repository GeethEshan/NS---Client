import { Box, Typography, Paper, Chip, Divider, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const BmiResult = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!result) return null;

  const getBmiColor = () => {
    if (result.bmi < 18.5) return 'info';
    if (result.bmi >= 18.5 && result.bmi < 25) return 'success';
    if (result.bmi >= 25 && result.bmi < 30) return 'warning';
    return 'error';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={3} sx={{ p: 4, mt: 4, maxWidth: '800px', mx: 'auto' }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          <MonitorWeightIcon sx={{ mr: 1 }} /> BMI Results
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Your BMI:
            </Typography>
            <Chip
              label={result.bmi}
              color={getBmiColor()}
              sx={{
                fontSize: '2rem',
                height: '60px',
                width: '120px',
                mb: 2,
              }}
            />
            
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Category:
            </Typography>
            <Chip
              label={result.category}
              color={getBmiColor()}
              sx={{
                fontSize: '1.2rem',
                height: '40px',
                mb: 3,
              }}
            />
            
            <Typography variant="body1" paragraph>
              Body Mass Index (BMI) is a measure of body fat based on height and weight.
            </Typography>
            
            <Typography variant="body1">
              Your BMI of {result.bmi} falls into the <strong>{result.category}</strong> category.
            </Typography>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <RestaurantIcon sx={{ mr: 1 }} /> Recommended Meal Plan
            </Typography>
            
            <Typography variant="subtitle1" sx={{ fontStyle: 'italic', mb: 2 }}>
              {result.mealPlan.description}
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                Breakfast:
              </Typography>
              <Typography variant="body1">{result.mealPlan.breakfast}</Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                Lunch:
              </Typography>
              <Typography variant="body1">{result.mealPlan.lunch}</Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                Dinner:
              </Typography>
              <Typography variant="body1">{result.mealPlan.dinner}</Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                Snacks:
              </Typography>
              <Typography variant="body1">{result.mealPlan.snacks}</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default BmiResult;