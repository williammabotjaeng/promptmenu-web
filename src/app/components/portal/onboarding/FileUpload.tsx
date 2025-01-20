import * as React from 'react';
import { Box, Typography, Button, Input } from '@mui/material';
import { FileUploadProps } from '@/types/Props/FileUploadProps';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const FileUpload: React.FC<FileUploadProps> = ({ title, supportedFormats, maxSize, onFileSelect }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 2,
                width: '100%',
                borderRadius: '16px',
                backgroundColor: 'transparent',
                paddingX: { xs: 2, md: 5 }
            }}
        >
            <Typography variant="h5" sx={{ pt: 1, pb: 2.5, color: 'white' }}>
                {title}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    px: 5,
                    py: 4,
                    mt: 1,
                    borderColor: '#4B5563',
                    border: '2px dashed #CEAB76',
                    borderRadius: '8px',
                    backgroundColor: 'transparent'
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '36px', width: '45px' }}>
                    <CloudUploadIcon
                        sx={{
                            width: '45px',
                            height: 'auto',
                            objectFit: 'contain',
                            color: '#CEAB76'
                        }}
                        aria-label="Upload icon" 
                    />
                </Box>
                <Typography variant="body1" sx={{ color: 'white', textAlign: 'center' }}>
                    Drag and drop your headshot here or
                </Typography>
                <label htmlFor="fileInput">
                    <Button
                        variant="contained"
                        sx={{
                            mt: 2,
                            backgroundColor: '#CEAB76',
                            color: 'black',
                            '&:hover': { backgroundColor: '#FFA500' }
                        }}
                    >
                        Choose File
                    </Button>
                </label>
                <Input
                    type="file"
                    id="fileInput"
                    sx={{ display: 'none' }}
                    onChange={handleFileChange}
                    inputProps={{ accept: supportedFormats }}
                />
                <Typography variant="caption" sx={{ mt: 2, color: 'gray' }}>
                    {`Supported formats: ${supportedFormats} (Max size: ${maxSize})`}
                </Typography>
            </Box>
        </Box>
    );
};