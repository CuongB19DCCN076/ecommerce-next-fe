import * as React from 'react';

// ** next
import { NextPage } from 'next';


// ** mui
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';

// ** items
import IconifyIcon from 'src/components/Icon';
import ListVerticalLayout from './ListVerticalLayout';

const drawerWidth: number = 240;


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(15),
                },
            }),
        },
    }),
);

type TProps = {
    open: boolean,
    toggleDrawer: () => void
}


const VerticalLayout: NextPage<TProps> = ({ open, toggleDrawer }) => {

    return (
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconifyIcon onClick={toggleDrawer} icon={"mdi:arrow-left-bold"} >
                </IconifyIcon>
            </Toolbar>
            <Divider />
            <ListVerticalLayout open={open} />
        </Drawer>
    )
}

export default VerticalLayout