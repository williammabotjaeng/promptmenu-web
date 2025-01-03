import React from 'react';
import Link from 'next/link';
import { Box, Button, TextField } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const ContactCard = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <form style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        
        {/* First Column: Name, Email, Message, and Send Button */}
        <div style={{ gridColumn: 'span 1' }}>
          <label htmlFor="name">Name</label>
          <TextField
            id="name"
            name="name"
            placeholder="Enter your name"
            required
            fullWidth
            style={{
              marginTop: '5px',
              height: '40px', 
              border: '2px solid #977342', 
            }}
            InputProps={{
              style: {
                height: '40px', 
              },
            }}
          />
          
          <label htmlFor="email" style={{ marginTop: '10px' }}>Email</label>
          <TextField
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            fullWidth
            style={{
              marginTop: '5px',
              height: '40px', 
              border: '2px solid #977342',
            }}
            InputProps={{
              style: {
                height: '40px', 
              },
            }}
          />
          
          <label htmlFor="message" style={{ marginTop: '10px' }}>Message</label>
          <TextField
            id="message"
            name="message"
            placeholder="Enter your message"
            required
            fullWidth
            multiline
            rows={3} 
            style={{
              marginTop: '5px',
              border: '2px solid #977342', 
            }}
            InputProps={{
              style: {
                height: '80px', 
              },
            }}
          />

          {/* Submit Button */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#977342',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Send Message
            </Button>
          </div>
        </div>

        {/* Second Column: Contact Details */}
        <div style={{ gridColumn: 'span 1' }}>
          <p><strong>Address:</strong><br /> 123 Main St, City, Country</p>
          <p><strong>Phone:</strong><br /> +123 456 7890</p>
          <p><strong>Email:</strong><br /> contact@example.com</p>
        </div>

        {/* Third Column: Social Links with Icons */}
        <div style={{ gridColumn: 'span 1' }}>
          <h3>Follow Us</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="#"><FacebookIcon style={{ color: "#977342" }} /></Link>
            <Link href="#"><TwitterIcon style={{ color: "#977342" }} /></Link>
            <Link href="#"><InstagramIcon style={{ color: "#977342" }} /></Link>
            <Link href="#"><LinkedInIcon style={{ color: "#977342" }} /></Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactCard;