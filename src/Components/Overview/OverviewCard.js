import React from 'react';
import { Button, Typography, Paper, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        'min-width': 500,
        'padding': 20,
        'text-align': 'center'
    }
})

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
