import { useState, useRef } from 'react';
import { Box, Button, Typography, CircularProgress, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { motion } from 'framer-motion';

const UploadForm = ({ onUpload, isLoading }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fileInputRef.current.files[0]) {
      onUpload(fileInputRef.current.files[0]);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: '600px', mx: 'auto' }}>
      <Typography variant="h5" gutterBottom align="center" sx={{ mb: 3 }}>
        Upload Your Meal Photo
      </Typography>
      
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '300px',
            border: '2px dashed',
            borderColor: 'primary.main',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
            position: 'relative',
            bgcolor: preview ? 'transparent' : 'action.hover',
          }}
          onClick={() => fileInputRef.current.click()}
        >
          {preview ? (
            <motion.img
              src={preview}
              alt="Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <>
              <CloudUploadIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="body1" color="text.secondary">
                Click to upload or drag and drop
              </Typography>
              <Typography variant="caption" color="text.secondary">
                JPG, PNG (Max 5MB)
              </Typography>
            </>
          )}
        </Box>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={!preview || isLoading}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
          sx={{ width: '100%', py: 1.5 }}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Meal'}
        </Button>
      </Box>
    </Paper>
  );
};

export default UploadForm;