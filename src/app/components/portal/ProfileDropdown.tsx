"use client";

import React, { useState } from 'react';
import { Avatar, Box, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-providers';

interface ProfileDropdownProps {
    profilePicture: string;
    placeholderLetter: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
    profilePicture,
    placeholderLetter
}) => {
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

    console.log("Placeholder Letter:", placeholderLetter);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'start' } }}>
            <Avatar
                alt={placeholderLetter}
                src={profilePicture || undefined}
                onClick={handleClick}
                sx={{ cursor: 'pointer', marginRight: '10px', backgroundColor: 'white', color: '#977342', border: '1px solid #977342' }}
            >{!profilePicture && placeholderLetter}</Avatar>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        backgroundColor: '#fff',
                        color: '#977342',
                        border: '1px solid #CEAB76',
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
                            backgroundColor: '#CEAB76',
                            color: '#fff',
                        },
                    }}
                >
                    Messages
                    <Box component={"span"} sx={{
                        background: '#977342',
                        borderRadius: { xs: '80%', md: '50%' }, 
                        border: '1px solid #977342',
                        color: '#fff',
                        width: { xs: '24px', md: '24px' }, 
                        height: { xs: '18px', md: '24px' }, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        marginLeft: '8px', 
                        padding: { xs: '10px' },
                        fontSize: { xs: '16px', md: '14px' }, 
                    }}>
                        {0}
                    </Box>
                </MenuItem>
                <MenuItem
                    onClick={() => handleMenuItemClick('/payments')}
                    sx={{
                        '&:hover': {
                            backgroundColor: '#CEAB76',
                            color: '#fff',
                        },
                    }}
                >
                    Payments
                </MenuItem>
            
                <MenuItem
                    onClick={handleLogout}
                    sx={{
                        '&:hover': {
                            backgroundColor: '#CEAB76',
                            color: '#fff',
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