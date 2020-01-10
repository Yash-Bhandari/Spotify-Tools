import React from 'react';
import { Button, Typography, Paper, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        'height': '100%',
        'padding': theme.spacing(2),
        'text-align': 'center',
        'display': 'flex',
        'flex-direction': 'column',
        'alignItems': 'center',
        'justify-content': 'space-around',
        'overflow': 'hidden'
    },
    title: {
        //'margin-bottom': 'auto'
    },
    button: {
        //'margin-top': 'auto'
    }
}));

const OverviewCard = ({ title, description, path }) => {
    const classes = useStyles();
    return (
        <Paper variant='elevation' className={classes.root}>
            <Typography variant='h5' className={classes.title}>
                {title}
            </Typography>
            <Typography variant='subtitle1'>
                {description}
            </Typography>
            <Button 
                variant='contained' 
                color='primary' 
                className={classes.button}
                component={Link}
                to={path}    
            >
                Go
            </Button>
        </Paper>
    )
}

export default OverviewCard
