import { Box, Typography, styled } from '@mui/material';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import BusinessIcon from '@mui/icons-material/Business';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Styled components for motion elements
const MotionBox = styled(motion.div)(() => ({}));

// Background particle
const BackgroundParticle = ({ index }: { index: number }) => (
  <MotionBox
    style={{
      position: 'absolute',
      width: Math.random() * 20 + 5,
      height: Math.random() * 20 + 5,
      borderRadius: '50%',
      backgroundColor: 'rgba(151, 115, 66, 0.2)',
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [0, -100, 0],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: Math.random() * 5 + 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: Math.random() * 5,
    }}
  />
);

const CreatingCompany: React.FC = () => {
  const [step, setStep] = React.useState(0);
  const steps = ["Initializing", "Creating Profile", "Setting Up", "Almost Done"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100%',
      background: 'linear-gradient(135deg, #000000 0%, #121212 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '20px',
      fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif',
    }}>
      {/* Background Elements */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}>
        {[...Array(20)].map((_, i) => (
          <BackgroundParticle key={i} index={i} />
        ))}
      </Box>
      
      {/* Gold Line */}
      <MotionBox
        initial={{ width: '0%' }}
        animate={{ width: '70%' }}
        transition={{ duration: 8, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          height: '2px',
          backgroundColor: '#977342',
          bottom: '30%',
          opacity: 0.7,
          boxShadow: '0 0 10px #977342',
        }}
      />
      
      {/* Logo Container */}
      <MotionBox
        animate={{ 
          scale: [1, 1.05, 1],
          rotateZ: [0, 5, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'relative',
          width: '150px',
          height: '150px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '30px',
          zIndex: 1,
        }}
      >
        <Box sx={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          backgroundColor: 'rgba(151, 115, 66, 0.1)',
          boxShadow: '0 0 30px rgba(151, 115, 66, 0.3)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}>
          <BusinessIcon sx={{
            color: "rgba(151, 115, 66, 0.2)",
            fontSize: "120px",
          }} />
        </Box>
        
        <MotionBox
          animate={{ 
            rotate: 360,
            rotateX: [0, 180, 360],
          }}
          transition={{ 
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            position: 'absolute',
            zIndex: 2,
          }}
        >
          <HourglassBottomIcon sx={{
            color: "#977342",
            fontSize: "80px",
            filter: 'drop-shadow(0 0 10px rgba(151, 115, 66, 0.6))',
          }} />
        </MotionBox>
      </MotionBox>
      
      {/* Loading Text */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 1,
        textAlign: 'center',
        marginTop: '20px',
      }}>
        <Typography variant="h4" sx={{
          color: '#977342',
          fontWeight: 700,
          marginBottom: '20px',
          fontSize: { xs: '28px', sm: '32px' },
          textShadow: '0 0 15px rgba(151, 115, 66, 0.4)',
          letterSpacing: '1px',
        }}>
          Creating Company Profile
        </Typography>
        
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: '30px',
        }}>
          {steps.map((text, index) => (
            <MotionBox 
              key={index}
              animate={{ 
                opacity: step >= index ? 1 : 0.3,
                x: step >= index ? 0 : -20
              }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <CheckCircleIcon sx={{
                color: step >= index ? '#977342' : 'rgba(151, 115, 66, 0.3)',
                marginRight: '8px',
                fontSize: '20px',
                transition: 'color 0.5s ease'
              }} />
              <Typography 
                variant="body1" 
                sx={{
                  color: step >= index ? '#fff' : 'rgba(255, 255, 255, 0.3)',
                  transition: 'color 0.5s ease'
                }}
              >
                {text}
              </Typography>
            </MotionBox>
          ))}
        </Box>
        
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '30px',
          marginBottom: '15px',
        }}>
          <AnimatePresence>
            {[0, 1, 2].map((i) => (
              <MotionBox
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#977342',
                  margin: '0 5px',
                }}
              />
            ))}
          </AnimatePresence>
        </Box>
        
        <Typography variant="body2" sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '16px',
        }}>
          Please wait while we set up your account
        </Typography>
      </Box>
    </Box>
  );
};

export default CreatingCompany;