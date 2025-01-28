"use client";

import React, { useState } from 'react';
import { Avatar, Box, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-providers';

const ProfileDropdown: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { logout } = useAuth();
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
    }

    const handleMenuItemClick = (route: string) => {
        handleClose();
        router.push(route);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'start' } }}>
            <Avatar
                alt="Profile Picture"
                src="/path/to/profile/picture.jpg"
                onClick={handleClick}
                sx={{ cursor: 'pointer', marginRight: '10px', backgroundColor: 'white', color: '#977342', border: '1px solid #977342' }}
            />
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        backgroundColor: '#977342',
                        color: 'black',
                        maxHeight: 48 * 4.5 + 8,
                    },
                }}
                sx={{
                    width: { xs: '16ch', md: '20ch' },
                    marginRight: {
                        md: 20
                    }
                }}
            >
                <MenuItem
                    onClick={() => handleMenuItemClick('/messages')}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'black',
                            color: '#977342',
                        },
                    }}
                >
                    Messages
                    <Box component={"span"} sx={{
                        background: 'white',
                        borderRadius: { xs: '80%', md: '50%' }, 
                        color: '#977342',
                        width: { xs: '24px', md: '24px' }, 
                        height: { xs: '18px', md: '24px' }, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        marginLeft: '8px', 
                        fontSize: '14px', 
                    }}>
                        {0}
                    </Box>
                </MenuItem>
                <MenuItem
                    onClick={() => handleMenuItemClick('/payments')}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'black',
                            color: '#977342',
                        },
                    }}
                >
                    Payments
                </MenuItem>
            
                <MenuItem
                    onClick={handleLogout}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'black',
                            color: '#977342',
                        },
                    }}
                >
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default ProfileDropdown;