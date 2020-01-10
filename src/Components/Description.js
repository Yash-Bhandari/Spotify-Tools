import React from 'react';
import { Paper, Typography, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        'margin-top': theme.spacing(2),
        'padding': theme.spacing(3),
    }
}))

export const Description = ({ text }) => {
    const classes = useStyles();
    return (
        <Grid item>
            <Paper className={classes.root}>
                <Typography>
                    {text}
                </Typography>
            </Paper>
            </Grid>
    )
}