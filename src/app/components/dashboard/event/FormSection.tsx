import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

interface Question {
  id: string;
  label: string;
  placeholder: string;
  inputType: 'text' | 'shortAnswer';
}

const questions: Question[] = [
  { id: "question1", label: "Question 1", placeholder: "Enter your question", inputType: "text" }
];

const FormSection: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 4,
      marginTop: 6,
      marginLeft: 2,
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
      width: '768px',
      maxWidth: '100%',
    }}
  >
    <Typography variant="h4" sx={{ pb: 2, color: '#977342', fontWeight: 'bold' }}>
      Application Questions
    </Typography>
    <form style={{ width: '100%' }}>
      {questions.map((question) => (
        <Box key={question.id} sx={{ pb: 3, width: '100%' }}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold', color: 'black' }}>
            {question.label}
          </Typography>
          <TextField
            id={question.id}
            placeholder={question.placeholder}
            variant="outlined"
            fullWidth
            sx={{ mb: 2, color: 'black', fontWeight: 'bold' }}
            inputProps={{ 'aria-label': question.label }}
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 1,
              backgroundColor: 'white',
              border: '1px solid #D1D5DB',
              borderRadius: '8px',
            }}
          >
            <Typography variant="body2" sx={{ color: 'black', fontWeight: 'bold' }}>Short Answer</Typography>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/3a544052ff3a223b44b5b722cc0cceac6f027791bf450cb52f3df85844734282?apiKey=7fae980a988640eea8add1e49a5d542e&"
              alt=""
              style={{ width: '32px', height: '32px', objectFit: 'contain' }}
            />
          </Box>
        </Box>
      ))}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
        <Button
          variant="outlined"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: '#977342',
            border: 'none',
            '&:hover': {
              borderColor: '#CEAB76',
              color: 'white'
            },
          }}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/2751ab996c46e3c001883a2ff055fc0388d0f450460c871300ab54eec333e718?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt=""
            style={{ width: '14px', height: '14px', objectFit: 'contain' }}
          />
          Add Another Question
        </Button>
      </Box>
    </form>
  </Box>
);

export default FormSection;