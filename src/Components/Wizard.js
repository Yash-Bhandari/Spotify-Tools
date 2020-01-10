import React from 'react';
import { Stepper, Step, StepLabel, Grid, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        'padding-bottom': theme.spacing(2)
    }
}))

export const Wizard = ({ step, stepNames, getContent }) => {
    const classes = useStyles();
    return (
        <Grid item>
            <Paper className={classes.root}>
                <Stepper activeStep={step}>
                    {stepNames.map(stepName =>
                        <Step key={stepName}>
                            <StepLabel>{stepName}</StepLabel>
                        </Step>
                    )}
                </Stepper>
                <Grid container justify='center' spacing={2}>
                    {getContent()}
                </Grid>
            </Paper>
        </Grid>
    )
}
