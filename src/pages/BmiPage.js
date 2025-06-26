import { useState } from 'react'; 
import { Box } from '@mui/material'; 
import Header from '../components/Header';
import BmiCalculator from '../components/BmiCalculator';
import BmiResult from '../components/BmiResult';
import Footer from '../components/Footer';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const BmiPage = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = async (data) => {
    setIsLoading(true);
    setResult(null);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/bmi/calculate`, data);
      setResult(response.data);
    } catch (error) {
      console.error('Error calculating BMI:', error);
      alert('Failed to calculate BMI. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ flexGrow: 1, py: 4, px: 2 }}>
        <BmiCalculator onCalculate={handleCalculate} isLoading={isLoading} />
        <BmiResult result={result} isLoading={isLoading} />
      </Box>
      <Footer />
    </Box>
  );
};

export default BmiPage;
