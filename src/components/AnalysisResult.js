import { 
  Box,  
  Typography, 
  Paper, 
  Chip, 
  Avatar, 
  Stack,
  LinearProgress,
  Tooltip,
  Grid
} from '@mui/material';

import { 
  LocalDining,
  Whatshot,
  FitnessCenter,
  Restaurant,
  PieChart,
  MonitorWeight,
  Science
} from '@mui/icons-material';

import { styled } from '@mui/material/styles';

const NutrientProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: theme.palette.grey[300],
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
    backgroundColor: value > 70 ? theme.palette.error.main : 
                    value > 40 ? theme.palette.warning.main : 
                    theme.palette.success.main
  }
}));

const foodEmojis = {
  'pizza': '🍕', 'burger': '🍔', 'sushi': '🍣', 'salad': '🥗',
  'pasta': '🍝', 'rice': '🍚', 'sandwich': '🥪', 'soup': '🍲',
  'steak': '🥩', 'chicken': '🍗', 'donut': '🍩', 'bread': '🍞',
  'fruit': '🍎', 'vegetable': '🥦', 'fish': '🐟', 'egg': '🥚'
};

const AnalysisResult = ({ result }) => {
  if (!result) return null;

  const totalCalories = result.nutritionData.reduce(
    (sum, food) => sum + (food.nutrients?.nf_calories || food.nutrients?.calories || 0), 0
  );

  const totalMacros = result.nutritionData.reduce((acc, food) => ({
    protein: acc.protein + (food.nutrients?.nf_protein || food.nutrients?.protein || 0),
    carbs: acc.carbs + (food.nutrients?.nf_total_carbohydrate || food.nutrients?.carbs || 0),
    fat: acc.fat + (food.nutrients?.nf_total_fat || food.nutrients?.fat || 0)
  }), { protein: 0, carbs: 0, fat: 0 });

  const macroPercentages = {
    protein: Math.round((totalMacros.protein * 4 / totalCalories) * 100) || 0,
    carbs: Math.round((totalMacros.carbs * 4 / totalCalories) * 100) || 0,
    fat: Math.round((totalMacros.fat * 9 / totalCalories) * 100) || 0
  };

  return (
    <Paper elevation={3} sx={{ 
      p: 4, 
      mt: 4,
      background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
      border: '1px solid rgba(0,0,0,0.1)'
    }}>
      <Typography variant="h4" gutterBottom sx={{ 
        display: 'flex', 
        alignItems: 'center',
        color: 'primary.main',
        fontWeight: 700,
        mb: 3
      }}>
        <LocalDining sx={{ mr: 1.5, fontSize: '2rem' }} /> Meal Analysis Results
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: 4 
      }}>
        
        {/* Image Section */}
        <Box sx={{ 
          flex: 1, 
          minWidth: 300,
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 2,
          position: 'relative',
          '&:hover': { boxShadow: 4 }
        }}>
          <img
            src={result.imageUrl || '/food-placeholder.jpg'}
            alt="Analyzed meal"
            style={{ 
              width: '100%', 
              height: '100%',
              objectFit: 'cover',
              minHeight: 300
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/food-placeholder.jpg';
            }}
          />
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: 'rgba(0,0,0,0.7)',
            color: 'white',
            p: 1.5,
            textAlign: 'center'
          }}>
            <Typography variant="subtitle2">Uploaded Meal Image</Typography>
          </Box>
        </Box>

        {/* Analysis Section */}
        <Box sx={{ flex: 2, minWidth: 300 }}>
          
          {/* Detected Foods */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: 'text.secondary',
              mb: 2
            }}>
              <Restaurant sx={{ mr: 1 }} /> Detected Food Items
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              {result.foodItems.map((item, i) => (
                <Tooltip title={item} key={i}>
                  <Chip
                    label={item}
                    avatar={
                      <Avatar sx={{ 
                        bgcolor: 'primary.light',
                        color: 'primary.dark'
                      }}>
                        {foodEmojis[item.split(' ')[0].toLowerCase()] || '🍽'}
                      </Avatar>
                    }
                    variant="outlined"
                    sx={{ 
                      textTransform: 'capitalize',
                      mb: 1,
                      borderColor: 'primary.light',
                      '& .MuiChip-label': {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 150
                      }
                    }}
                  />
                </Tooltip>
              ))}
            </Stack>
          </Box>

          {/* Nutrition Summary */}
          <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: 'text.secondary',
              mb: 3
            }}>
              <PieChart sx={{ mr: 1 }} /> Nutrition Summary
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Protein</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {Math.round(totalMacros.protein)}g ({macroPercentages.protein}%)
                </Typography>
              </Box>
              <NutrientProgress variant="determinate" value={macroPercentages.protein} />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Carbohydrates</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {Math.round(totalMacros.carbs)}g ({macroPercentages.carbs}%)
                </Typography>
              </Box>
              <NutrientProgress variant="determinate" value={macroPercentages.carbs} />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Fats</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {Math.round(totalMacros.fat)}g ({macroPercentages.fat}%)
                </Typography>
              </Box>
              <NutrientProgress variant="determinate" value={macroPercentages.fat} />
            </Box>
          </Box>

          {/* Detailed Nutrition */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: 'text.secondary',
              mb: 2
            }}>
              <Science sx={{ mr: 1 }} /> Detailed Nutrition
            </Typography>

            {result.nutritionData.map((food, i) => (
              <Box 
                key={i} 
                sx={{ 
                  mb: 3, 
                  p: 2.5, 
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 1,
                  borderLeft: '4px solid',
                  borderColor: i % 2 === 0 ? 'primary.main' : 'secondary.main'
                }}
              >
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 600,
                  color: 'primary.dark',
                  mb: 1.5
                }}>
                  {food.foodItem}
                </Typography>

                <Grid container spacing={2} sx={{ mb: 1 }}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Whatshot color="error" sx={{ fontSize: '2rem' }} />
                      <Typography variant="body1" fontWeight="bold">
                        {Math.round(food.nutrients?.nf_calories || food.nutrients?.calories || 0)}
                      </Typography>
                      <Typography variant="caption">CALORIES</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <FitnessCenter color="info" sx={{ fontSize: '2rem' }} />
                      <Typography variant="body1" fontWeight="bold">
                        {Math.round(food.nutrients?.nf_protein || food.nutrients?.protein || 0)}g
                      </Typography>
                      <Typography variant="caption">PROTEIN</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <MonitorWeight color="success" sx={{ fontSize: '2rem' }} />
                      <Typography variant="body1" fontWeight="bold">
                        {Math.round(food.nutrients?.nf_total_carbohydrate || food.nutrients?.carbs || 0)}g
                      </Typography>
                      <Typography variant="caption">CARBS</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Whatshot color="warning" sx={{ fontSize: '2rem' }} />
                      <Typography variant="body1" fontWeight="bold">
                        {Math.round(food.nutrients?.nf_total_fat || food.nutrients?.fat || 0)}g
                      </Typography>
                      <Typography variant="caption">FATS</Typography>
                    </Box>
                  </Grid>
                </Grid>

                {food.source === 'fallback' && (
                  <Typography variant="caption" color="warning.main" sx={{ 
                    mt: 1, 
                    display: 'block',
                    fontStyle: 'italic'
                  }}>
                    * Estimated values (fallback used)
                  </Typography>
                )}
              </Box>
            ))}
          </Box>

          {/* Total Calories */}
          <Box sx={{ mt: 3, p: 3, bgcolor: 'primary.light', borderRadius: 2, textAlign: 'center', boxShadow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              TOTAL MEAL CALORIES
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.dark', mb: 1 }}>
              {Math.round(totalCalories)} kcal
            </Typography>
            {result.detectedCategories?.length > 0 && (
              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                Meal classification: {result.detectedCategories.join(', ')}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default AnalysisResult;
