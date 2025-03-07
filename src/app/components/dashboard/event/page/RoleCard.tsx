import * as React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { RoleCardProps } from "@/types/Props/RoleCardProps";
import { useRouter } from "next/navigation";

export const RoleCard: React.FC<RoleCardProps> = ({
  id,
  title,
  status,
  requirements,
  location,
  postedTime,
  salary
}) => {

  const router = useRouter();

  const handleRoleClick = () => {
    router?.push(`/role/${id}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        width: '100%',
        borderRadius: '8px',
        border: '1px solid #E0E0E0',
        backgroundColor: 'white',
        boxShadow: 1,
        mb: { xs: 2, sm: 2, md: 0},
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
          cursor: 'pointer'
        },
      }}
      onClick={handleRoleClick}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000', fontSize: { xs: '1rem', md: '1.25rem' } }}>
          {title}
        </Typography>
        <Chip label={status} color="success" variant="outlined" />
      </Box>
      <Typography variant="body2" sx={{ color: '#6B7280', mt: 1, fontSize: { xs: '0.875rem', md: '1rem' } }}>
        {requirements}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/38b24a3e4c11bc5b66c2fc13b052811252cac7afd8288c15747140749f9a5d29?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt="Location Icon"
            style={{ width: '20px', height: '20px', marginRight: '4px' }}
          />
          <Typography variant="body2" sx={{ color: '#6B7280', fontSize: { xs: '0.875rem', md: '1rem' } }}>
            {location}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/7fae980a988640eea8add1e49a5d542e/52c7138fa156a201f7f69327e4661b81b3af6f53735724ce306f998324791222?apiKey=7fae980a988640eea8add1e49a5d542e&"
            alt="Posted Time Icon"
            style={{ width: '20px', height: '20px', marginRight: '4px' }}
          />
          <Typography variant="body2" sx={{ color: '#6B7280', fontSize: { xs: '0.875rem', md: '1rem' } }}>
            {postedTime}
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4B5563', fontSize: { xs: '1rem', md: '1.25rem' } }}>
          {salary}
        </Typography>
      </Box>
    </Box>
  );
};

export default RoleCard;