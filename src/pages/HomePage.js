import { Box, Typography, Paper } from '@mui/material';
import { Restaurant, Science, FitnessCenter } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const AboutSection = () => {
  return (
    <Box
      component={motion.section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
      }}
      sx={{ py: 6, px: { xs: 2, md: 6 }, maxWidth: '1200px', mx: 'auto', width: '100%' }}
    >
      <Typography
        variant="h2"
        component="h2"
        gutterBottom
        sx={{ textAlign: 'center', mb: 4 }}
      >
        About NutriScan
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          At NutriScan, we believe that understanding your nutrition should be as simple as taking a
          photo. Our mission is to empower individuals to make informed dietary choices through
          cutting-edge technology and accurate nutritional analysis.
        </Typography>
        <Typography variant="body1" paragraph>
          Founded in 2023, NutriScan combines artificial intelligence with comprehensive nutritional
          databases to provide instant insights about your meals.
        </Typography>
      </Paper>

      {/* Full-width Animated Feature Boxes */}
      <Box
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
        sx={{
          width: '100vw',
          maxWidth: '100%',
          px: { xs: 2, md: 6 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          mb: 6,
          mx: 'calc(-1 * (var(--mui-spacing) * 2))', // counter container padding
        }}
      >
        {[
          {
            icon: <Restaurant color="primary" sx={{ fontSize: 60 }} />,
            title: 'Food Recognition',
            description:
              "Our advanced AI identifies over 1,000 food items with 95% accuracy, powered by Google's Vision API.",
          },
          {
            icon: <Science color="primary" sx={{ fontSize: 60 }} />,
            title: 'Nutrition Analysis',
            description:
              'Detailed breakdowns of calories, macronutrients, and micronutrients using Nutritionix and USDA databases.',
          },
          {
            icon: <FitnessCenter color="primary" sx={{ fontSize: 60 }} />,
            title: 'Health Insights',
            description:
              'Personalized recommendations based on your dietary preferences and health goals.',
          },
        ].map(({ icon, title, description }, i) => (
          <Paper
            key={i}
            component={motion.div}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            elevation={3}
            sx={{
              flex: 1,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'background.paper',
              borderRadius: 3,
              boxShadow: 4,
              color: 'text.primary',
              textAlign: 'center',
              minWidth: 0,
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {icon}
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
              {description}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Hero />
      <AboutSection />
      <Box sx={{ flexGrow: 1 }} />
      <Footer />
    </Box>
  );
};

export default HomePage;
