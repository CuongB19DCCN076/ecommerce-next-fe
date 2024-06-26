import * as React from 'react';

// ** next
import { NextPage } from 'next';

// ** mui
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

// ** layout
import HorizontalLayout from './HorizontalLayout';
import VerticalLayout from './VerticalLayout';





type TProps = {
    children: React.ReactNode
}




// TODO remove, this demo shouldn't need to reset the theme.

const UserLayout: NextPage<TProps> = ({ children }) => {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <HorizontalLayout open={open} toggleDrawer={toggleDrawer} />
            <VerticalLayout open={open} toggleDrawer={toggleDrawer} />
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    {children}
                </Container>
            </Box>
        </Box>
    );
}

export default UserLayout;