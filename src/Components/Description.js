import React from 'react';
import { Paper, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        'margin-top': theme.spacing(2),
        'min-width': '70%',
        'padding': 20,
    }
}))

export const Description = ({ text }) => {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Typography>
                {text}
            </Typography>
        </Paper>
    )
}