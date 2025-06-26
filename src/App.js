import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';
import BmiPage from './pages/BmiPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analyze" element={<AnalysisPage />} />
          <Route path="/bmi" element={<BmiPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;