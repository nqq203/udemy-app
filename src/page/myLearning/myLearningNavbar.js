import * as React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';

const pages = [
    {
        name: 'All Courses',
        path: '/my-courses/learning',
    }, 
    {
        name: 'Wishlist',
        path: '/my-courses/wishlist',
    }, 
    {
        name: 'Archived',
        path: '/my-courses/archived',
    }, 
    {
        name: 'Learning tools',
        path: '/my-courses/learning-tools',
    }, 
];

const StyledButton = styled(Button)({
    display: 'flex',
    justifyContent: 'left',
    margin: 0, 
    color: 'var(--color-white)', 
    '&:hover': {
        backgroundColor: 'none',
        borderBottom: '2px solid var(--color-white)', 
        borderRadius: 0,
    },
    '&.active': { 
        backgroundColor: 'none',
        borderBottom: '2px solid var(--color-white)', 
        borderRadius: 0,
    },
});

export default function MyLearningNavBar() {
    const active = window.location.pathname;

    return (
        <AppBar position="static" sx={{ padding: 0, backgroundColor: 'var(--color-gray-500)', boxShadow: 'none' }}>
            <Box>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        {pages?.map((page, index) => (
                            <Link to={page?.path} style={{textDecoration: 'none'}} key={index}>
                                <StyledButton
                                    key={page?.name}
                                    disableElevation
                                    className={active === page?.path ? 'active' : ''}
                                >
                                    <h4 style={{margin: 0}}>{page?.name}</h4>
                                </StyledButton>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </Box>
        </AppBar>
  );
}