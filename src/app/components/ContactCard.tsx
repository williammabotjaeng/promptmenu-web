"use client";

import React from 'react';
import Link from 'next/link';
import { Button, TextField } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const ContactCard = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <form style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
        
        {/* First Column: Name, Email, Message, and Send Button */}
        <div style={{ gridColumn: 'span 1', marginRight: '20px' }}>
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
                color: "#977342"
              },
              onFocus: (e) => {
                e.target.style.borderColor = '#CEAB76'; 
              },
              onBlur: (e) => {
                e.target.style.borderColor = '#977342';
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
              color: "#977342"
            }}
            InputProps={{
              style: {
                height: '40px',
                color: "#977342"
              },
              onFocus: (e) => {
                e.target.style.borderColor = '#CEAB76'; 
              },
              onBlur: (e) => {
                e.target.style.borderColor = '#977342'; 
              },
            }}
          />

          <label htmlFor="phonenumber" style={{ marginTop: '10px' }}>Phone Number</label>
          <TextField
            type="text"
            id="phonenumber"
            name="phonenumber"
            placeholder="Enter your Phone Number"
            required
            fullWidth
            style={{
              marginTop: '5px',
              height: '40px',
              border: '2px solid #977342',
              color: "#977342"
            }}
            InputProps={{
              style: {
                height: '40px',
                color: "#977342"
              },
              onFocus: (e) => {
                e.target.style.borderColor = '#CEAB76'; 
              },
              onBlur: (e) => {
                e.target.style.borderColor = '#977342'; 
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
                background: 'white'
              },
              onFocus: (e) => {
                e.target.style.borderColor = '#CEAB76'; 
              },
              onBlur: (e) => {
                e.target.style.borderColor = '#977342'; 
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
        <div style={{ gridColumn: 'span 1', marginLeft: '20px' }}>
          <h3>Contact Details</h3>
          <br />
          <p><strong>Address:</strong><br /> 123 Main St, City, Country</p>
          <br />
          <p><strong>Phone:</strong><br /> +123 456 7890</p>
          <br />
          <p><strong>Email:</strong><br /> contact@example.com</p>
        </div>

        {/* Third Column: Social Links with Icons in 2x2 Grid */}
        <div style={{ gridColumn: 'span 1', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          <Link href="https://web.facebook.com/people/Staffing-Solutions-Hub/61568735786489" target='_blank'><FacebookIcon style={{ fontSize: '80px', color: '#977342' }} /></Link>
          <Link href="https://x.com/staffinghub_ae" target="_blank"><TwitterIcon style={{ fontSize: '80px', color: '#977342' }} /></Link>
          <Link href="https://www.instagram.com/staffingsolutionshub" target="_blank"><InstagramIcon style={{ fontSize: '80px', color: '#977342' }} /></Link>
          <Link href="https://www.linkedin.com/company/staffing-solutions-hub/" target='_blank'><LinkedInIcon style={{ fontSize: '80px', color: '#977342' }} /></Link>
        </div>
      </form>
    </div>
  );
};

export default ContactCard;