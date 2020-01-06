import React from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import MenuDrawer from './MenuDrawer';
import LoginButton from '../LoginButton';

const useStyles = makeStyles({
    title: {
        flexGrow: 1
    }
});

export default (props) => {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <MenuDrawer />
                <Typography className={classes.title} variant='h4'>
                    Spotify Tools
                </Typography>
                {props.children}
            </Toolbar>
        </AppBar>
    )
}


