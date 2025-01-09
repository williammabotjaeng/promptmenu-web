"use client";

import React, { useState } from 'react';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';

const ProfileDropdown: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (route: string) => {
        handleClose();
        router.push(route);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
                alt="Profile Picture"
                src="/path/to/profile/picture.jpg"
                onClick={handleClick}
                style={{ cursor: 'pointer', marginRight: '10px', backgroundColor: 'black', color: '#977342' }}
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
                        width: '20ch',
                    },
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
                    <span style={{
                        background: 'black',
                        borderRadius: '50%', 
                        color: '#977342',
                        width: '24px', 
                        height: '24px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        marginLeft: '8px', 
                        fontSize: '14px', 
                    }}>
                        {0}
                    </span>
                </MenuItem>
                <MenuItem
                    onClick={() => handleMenuItemClick('/jobs')}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'black',
                            color: '#977342',
                        },
                    }}
                >
                    My Jobs
                    <span style={{
                        background: 'black',
                        borderRadius: '50%', 
                        color: '#977342',
                        width: '24px', 
                        height: '24px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        marginLeft: '8px', 
                        fontSize: '14px', 
                    }}>
                        {0}
                    </span>
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
                    onClick={() => handleMenuItemClick('/settings')}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'black',
                            color: '#977342',
                        },
                    }}
                >
                    Settings
                </MenuItem>
                <MenuItem
                    onClick={() => handleMenuItemClick('/support')}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'black',
                            color: '#977342',
                        },
                    }}
                >
                    Support
                </MenuItem>
            </Menu>
        </div>
    );
};

export default ProfileDropdown;