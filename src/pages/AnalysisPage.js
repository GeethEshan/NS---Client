import { useState } from 'react';
import { Box, CircularProgress, Snackbar, Alert, Modal, IconButton } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CloseIcon from '@mui/icons-material/Close';
import UploadForm from '../components/UploadForm';
import AnalysisResult from '../components/AnalysisResult';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AnalysisPage = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleUpload = async (file) => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(
        `${API_BASE_URL}/api/analysis/analyze`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 30000,
        }
      );

      if (response.data.success) {
        setResult(response.data);
        setShowModal(true);
      } else {
        throw new Error(response.data.error || 'Analysis failed');
      }
    } catch (error) {
      let errorMessage = 'Failed to analyze image. Please try again.';
      if (error.response) {
        errorMessage = error.response.data.error || errorMessage;
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseError = () => setError(null);
  const handleCloseModal = () => {
    setShowModal(false);
    setResult(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header />

      <Box
        sx={{
          flexGrow: 1,
          py: 4,
          px: { xs: 2, sm: 4 },
          maxWidth: '1200px',
          mx: 'auto',
          width: '100%',
        }}
      >
        <UploadForm onUpload={handleUpload} isLoading={isLoading} />

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        )}
      </Box>

      <Footer />

      <Modal
        open={showModal}
        onClose={handleCloseModal}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}
      >
        <Box
          sx={{
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
            width: '90%',
            maxWidth: 800,
            position: 'relative',
          }}
        >
          <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>

          <AnalysisResult result={result} />
        </Box>
      </Modal>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AnalysisPage;
