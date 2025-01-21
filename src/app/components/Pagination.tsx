import React from "react";
import { Box, Button, Typography } from "@mui/material";

function Pagination() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingX: 4, marginTop: 2, width: '100%', textAlign: 'center' }}>
      <Box sx={{ display: 'flex', gap: 2, maxWidth: '100%', justifyContent: 'center' }}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/6a8f4fd34666c68feb76206de136e679ed8e56aaf93803fba3aa43772413c40d?apiKey=7fae980a988640eea8add1e49a5d542e&"
          alt=""
          style={{ width: '44px', borderRadius: '8px' }}
        />
        <Button variant="contained" sx={{ backgroundColor: '#977342', color: 'white', padding: '8px 16px', borderRadius: '8px' }}>
          <Typography variant="body1">1</Typography>
        </Button>
        <Button variant="outlined" sx={{ borderColor: '#ccc', color: 'black', padding: '8px 16px', borderRadius: '8px' }}>
          <Typography variant="body1">2</Typography>
        </Button>
        <Button variant="outlined" sx={{ borderColor: '#ccc', color: 'black', padding: '8px 16px', borderRadius: '8px' }}>
          <Typography variant="body1">3</Typography>
        </Button>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/3dd92bf14e5fb18312eebe1c3ef34523c18d5411d443e4b494b3372385baa68a?apiKey=7fae980a988640eea8add1e49a5d542e&"
          alt=""
          style={{ width: '44px', borderRadius: '8px' }}
        />
      </Box>
    </Box>
  );
}

export default Pagination;