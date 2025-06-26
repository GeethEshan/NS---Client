import { Box, Typography, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 4, mt: 'auto' }}>
      <Divider sx={{ mb: 3 }} />
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} NutriScan - Meal Analysis and BMI Calculator
      </Typography>
    </Box>
  );
};

export default Footer;