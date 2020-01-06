import React, { useState } from 'react';
import { Grid, Stepper, Step, StepLabel, Button, Checkbox, FormControlLabel, Typography, Radio, RadioGroup } from '@material-ui/core';
import { Description } from '../Description';
import { Progress } from '../Progress';

const descriptionText = "If you have a large enough library, you might find that you have quite a few duplicate songs saved. This is because Spotify considers tracks released as singles different from tracks released in an album, even if they are the exact same song. And depending on your listening habits, you also may have accumulated explicit and censored versions of songs. Regardless of why they are there, these duplicates can be pruned out of your Spotify library with this tool.";

const stepNames = ['Sign Into Spotify', 'Choose Settings', 'Fetch Songs', 'Review'];

const explicitPref = Object.freeze({
    EXPLICIT: 1,
    CLEAN: 2,
    IGNORE: 3
})

const DuplicatePruner = ({ authorized, liason, loginButton, progress, finished }) => {
    const [step, setStep] = useState(0);
    const [settings, setSettings] = useState({
        explicit: explicitPref.IGNORE,

    })

    if (authorized && step === 0)
        setStep(step + 1);


    const getContent = () => {
        switch (step) {
            case 0:
                return loginButton
            case 1:
                return (
                    <>
                        <Grid item xs={6} align='center'>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={settings.explicit === explicitPref.IGNORE}
                                        onChange={() => setSettings(prev => ({
                                            ...prev, explicit: prev.explicit === explicitPref.IGNORE ? explicitPref.EXPLICIT : explicitPref.IGNORE
                                        })
                                        )}
                                        value="ignoreExplicit" />
                                }
                                label="Ignore Explicit Versions"
                            />
                        </Grid>
                        <Grid item xs={6} align='center'>
                            <RadioGroup
                                row
                                value={settings.explicit} 
                                onChange={e => setSettings(prev => ({
                                    ...prev, explicit: parseInt(e.target.value)
                                }))
                                }
                            >
                                <FormControlLabel
                                    value={explicitPref.EXPLICIT}
                                    control={<Radio color="primary" />}
                                    label="Keep Explicit"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    value={explicitPref.CLEAN}
                                    control={<Radio color="primary" />}
                                    label="Keep Clean"
                                    labelPlacement="start"
                                />
                            </RadioGroup>

                        </Grid>
                        <Grid item xs={12} align='center'>
                            <Typography>
                                Choose your settings, or keep the defaults.
                                You'll have a chance to review everything before any tracks are removed.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} align='center'>
                            <Button
                                variant='outlined'
                                onClick={() => { setStep(2) }}
                            >
                                Next
                            </Button>
                        </Grid>
                    </>
                )
            case 2:
                return (
                    <>
                        <Grid item xs={12} align='center'>
                            {progress}
                        </Grid>
                        <Grid item xs={12} align='center'>
                            <Button
                                variant='outlined'
                                onClick={() => { setStep(3) }}
                                disabled={!finished}
                            >
                                Next
                        </Button>
                        </Grid>
                    </>

                )
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