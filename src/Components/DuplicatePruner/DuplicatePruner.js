import React, { useState } from 'react';
import { Grid, Stepper, Step, StepLabel } from '@material-ui/core';
import { Description } from '../Description';

const descriptionText = "If you have a large enough library, you might find that you have quite a few duplicate songs saved. This is because Spotify considers tracks released as singles different from tracks released in an album, even if they are the exact same song. And depending on your listening habits, you also may have accumulated explicit and censored versions of songs. Regardless of why they are there, these duplicates can be pruned out of your Spotify library with this tool.";

const stepNames = ['Sign Into Spotify', 'Choose Settings', 'Fetch Songs', 'Review'];

const DuplicatePruner = ({ authorized, liason, loginButton }) => {
    const [step, setStep] = useState(0);

    if (authorized && step === 0)
        setStep(step + 1);


    const getContent = () => {
        switch (step) {
            case 0:
                return loginButton
        }
    }

    return (
        <>
            <Description text={descriptionText} />
            <Stepper activeStep={step}>
                {stepNames.map(stepName =>
                    <Step key={stepName}>
                        <StepLabel>{stepName}</StepLabel>
                    </Step>
                )}
            </Stepper>
            <Grid container justify='center'>
                {getContent()}
            </Grid>
        </>
    )
}

export default DuplicatePruner;