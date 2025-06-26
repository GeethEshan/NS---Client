import { useState } from 'react';
import {  
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormLabel, 
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  Stack
} from '@mui/material';
import { FitnessCenter, MonitorWeight, Restaurant } from '@mui/icons-material';
import { motion } from 'framer-motion';


const Transition = (props) => {
  return <Slide direction="up" {...props} />;
};

const BmiCalculator = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    unit: 'metric',
  });
  const [bmiResult, setBmiResult] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateBmi = () => {
    const { height, weight, unit } = formData;
    let bmi = 0;

    if (unit === 'metric' && height && weight) {
      const h = parseFloat(height) / 100;
      bmi = parseFloat(weight) / (h * h);
    } else if (unit === 'imperial' && height && weight) {
      bmi = (parseFloat(weight) / (parseFloat(height) * parseFloat(height))) * 703;
    }

    setBmiResult(bmi.toFixed(1));
    setOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateBmi();
  };

  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return { text: 'Underweight', color: 'warning.main' };
    if (bmi < 25) return { text: 'Normal weight', color: 'success.main' };
    if (bmi < 30) return { text: 'orange', color: 'orange' };
    return { text: 'Obesity', color: 'error.main' };
  };

  const getMealPlan = (bmi) => {
    if (bmi < 18.5) {
      return [
        "🥩 High-protein meals (Chicken, Eggs, Tofu)",
        "🍚 Complex carbs (Rice, Pasta, Potatoes)",
        "🥜 Healthy fats (Nuts, Avocados, Olive oil)",
        "🍳 Frequent small meals & snacks"
      ];
    } else if (bmi < 25) {
      return [
        "🥗 Balanced diet with veggies, lean protein",
        "🍞 Moderate carbs (Whole grains)",
        "🥑 Healthy fats in moderation",
        "🚰 Stay hydrated & maintain portion control"
      ];
    } else if (bmi < 30) {
      return [
        "🥗 Focus on veggies & fiber-rich foods",
        "🍗 Lean protein (Chicken, Fish, Legumes)",
        "❌ Limit refined carbs & sugars",
        "🚶‍♂️ Regular physical activity recommended"
      ];
    } else {
      return [
        "🥦 High-fiber vegetables are essential",
        "🍳 Lean proteins (Eggs, Fish, Beans)",
        "🥑 Controlled healthy fats (Avocado, Nuts)",
        "❌ Avoid processed foods & sugar completely",
        "🚴 Regular exercise & consult nutritionist"
      ];
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper 
        elevation={4} 
        sx={{ 
          p: 4, 
          maxWidth: '500px', 
          mx: 'auto', 
          mt: 4,
          background: 'linear-gradient(135deg, #f0f4f8 0%, #ffffff 100%)',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: 3
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ 
          fontWeight: 700, 
          color: 'primary.main', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          mb: 4
        }}>
          <FitnessCenter sx={{ mr: 1 }} /> BMI Calculator
        </Typography>
        
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ mb: 1, color: 'text.primary' }}>
              Choose Unit System
            </FormLabel>
            <RadioGroup
              row
              name="unit"
              value={formData.unit}
              onChange={handleChange}
            >
              <FormControlLabel 
                value="metric" 
                control={<Radio color="primary" />} 
                label="Metric (cm, kg)" 
              />
              <FormControlLabel 
                value="imperial" 
                control={<Radio color="primary" />} 
                label="Imperial (inches, lbs)" 
              />
            </RadioGroup>
          </FormControl>
          
          <TextField
            fullWidth
            label={formData.unit === 'metric' ? 'Height (cm)' : 'Height (inches)'}
            name="height"
            type="number"
            value={formData.height}
            onChange={handleChange}
            required
            inputProps={{ min: 0 }}
          />
          
          <TextField
            fullWidth
            label={formData.unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            required
            inputProps={{ min: 0 }}
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ py: 1.5, fontWeight: 600 }}
          >
            Calculate BMI
          </Button>
        </Box>
      </Paper>

      {/* Result Dialog with Meal Plan */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 700 }}>
          <MonitorWeight sx={{ fontSize: '2rem', mr: 1 }} />
          Your BMI Result
        </DialogTitle>

        <DialogContent sx={{ textAlign: 'center', p: 4 }}>
          <Typography variant="h2" sx={{ fontWeight: 800, color: 'primary.dark', mb: 2 }}>
            {bmiResult}
          </Typography>

          {bmiResult && (
            <>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: getBmiCategory(bmiResult).color, 
                  fontWeight: 600, 
                  mb: 3 
                }}
              >
                {getBmiCategory(bmiResult).text}
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Restaurant sx={{ mr: 1 }} /> Recommended Meal Plan
              </Typography>

              <Stack spacing={1} sx={{ textAlign: 'left', mx: 'auto', maxWidth: 300 }}>
                {getMealPlan(bmiResult).map((item, idx) => (
                  <Typography key={idx} variant="body2">• {item}</Typography>
                ))}
              </Stack>
            </>
          )}
          
          <Button 
            onClick={() => setOpen(false)} 
            variant="contained" 
            sx={{ mt: 4, px: 4 }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default BmiCalculator;
