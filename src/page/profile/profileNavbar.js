import * as React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';

const pages = [
    {
        name: 'Profile',
        path: '/profile/info',
    }, 
    {
        name: 'Profile picture',
        path: '/profile/photo',
    }, 
    {
        name: 'Privacy settings',
        path: '/profile/privacy',
    }, 
];

const StyledButton = styled(Button)({
    display: 'flex',
    justifyContent: 'left',
    margin: 0, 
    color: 'rgb(0, 0, 0, 0.6)', 
    '&:hover': {
        color: 'black',
        backgroundColor: 'none',
        borderBottom: '2px solid black', 
        borderRadius: 0,
    },
    '&.active': { 
        color: 'black',
        backgroundColor: 'none',
        borderBottom: '2px solid black', 
        borderRadius: 0,
    },
});

export default function ProfileNavBar() {
    const active = window.location.pathname;

    return (
        <AppBar position="static" sx={{ padding: 0, backgroundColor: 'white', boxShadow: 'none' }}>
            <Box>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        {pages.map((page, index) => (
                            <Link to={page.path} style={{textDecoration: 'none'}} key={index}>
                                <StyledButton
                                    key={page.name}
                                    disableElevation
                                    className={active === page.path ? 'active' : ''}
                                >
                                    <h4 style={{margin: 0}}>{page.name}</h4>
                                </StyledButton>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </Box>
        </AppBar>
  );
}