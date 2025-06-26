import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Chip,
  Pagination,
  TextField,
  InputAdornment
} from '@mui/material';
import { Search, CalendarToday, Person, Category } from '@mui/icons-material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const postsPerPage = 6;

  const blogPosts = [
    {
      id: 1,
      title: "The Science Behind Food Recognition AI",
      excerpt: "How machine learning is revolutionizing dietary tracking through image analysis.",
      image: "/blog/ai-food.jpg",
      date: "June 15, 2023",
      author: "Mark Chen",
      category: "Technology",
      tags: ["AI", "Machine Learning"]
    },
    {
      id: 2,
      title: "10 Tips for Healthier Eating Habits",
      excerpt: "Simple changes you can make today to improve your nutrition and overall health.",
      image: "/blog/healthy-eating.jpg",
      date: "May 28, 2023",
      author: "Dr. Sarah Johnson",
      category: "Nutrition",
      tags: ["Health", "Diet"]
    },
    {
      id: 3,
      title: "Understanding Macronutrients",
      excerpt: "A beginner's guide to proteins, carbohydrates, and fats in your diet.",
      image: "/blog/macros.jpg",
      date: "May 10, 2023",
      author: "Dr. Sarah Johnson",
      category: "Nutrition",
      tags: ["Macronutrients", "Basics"]
    },
    {
      id: 4,
      title: "Building a Food Database: Challenges and Solutions",
      excerpt: "Behind the scenes of creating a comprehensive nutritional database.",
      image: "/blog/database.jpg",
      date: "April 22, 2023",
      author: "Emily Rodriguez",
      category: "Technology",
      tags: ["Database", "Nutrition"]
    },
    {
      id: 5,
      title: "Seasonal Eating: Benefits and Recipes",
      excerpt: "Why eating with the seasons is good for you and the planet.",
      image: "/blog/seasonal.jpg",
      date: "April 5, 2023",
      author: "Dr. Sarah Johnson",
      category: "Nutrition",
      tags: ["Seasonal", "Recipes"]
    },
    {
      id: 6,
      title: "The Future of Dietary Tracking Apps",
      excerpt: "What to expect from nutrition technology in the coming years.",
      image: "/blog/future.jpg",
      date: "March 18, 2023",
      author: "Mark Chen",
      category: "Technology",
      tags: ["Future", "Trends"]
    }
  ];

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pageCount = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <Container maxWidth="lg" sx={{ flex: '1 0 auto', py: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          NutriScan Blog
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          sx={{ mb: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <Grid container spacing={4} sx={{ mb: 4 }}>
          {currentPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={post.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Category color="action" fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="caption" color="text.secondary">
                      {post.category}
                    </Typography>
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {post.excerpt}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {post.tags.map((tag, index) => (
                      <Chip key={index} label={tag} size="small" />
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Person color="action" fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="caption">
                        {post.author}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarToday color="action" fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="caption">
                        {post.date}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default BlogPage;
