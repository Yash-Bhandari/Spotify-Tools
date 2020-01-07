import React, { useState } from 'react';
import { Grid, Stepper, Step, StepLabel, Button, Checkbox, FormControlLabel, Typography, Radio, RadioGroup } from '@material-ui/core';
import { Description } from '../Description';
import { Progress } from '../Progress';
import { DuplicateDisplay } from './DuplicateDisplay';
import { ServerLiason } from '../../utils/ServerLiason';

const descriptionText = "If you have a large enough library, you might find that you have quite a few duplicate songs saved. This is because Spotify considers tracks released as singles different from tracks released in an album, even if they are the exact same song. And depending on your listening habits, you also may have accumulated explicit and censored versions of songs. Regardless of why they are there, these duplicates can be pruned out of your Spotify library with this tool.";

const stepNames = ['Sign Into Spotify', 'Fetch Songs', 'Confirm', 'Review'];

const explicitPref = Object.freeze({
    EXPLICIT: 1,
    CLEAN: 2,
    IGNORE: 3
})

/**
 * Returns true if the two tracks are determined to be duplicates.
 * @param  {track} track1 First track
 * @param  {track} track2 Second track
 * @return {Boolean}      True if the tracks are duplicates
 */
const sameSong = (track1, track2) => {
    if (track1.name == track2.name && track1.artists[0].name === track2.artists[0].name)
        return true;
    return false;
}

/**
 * Finds the duplicates in a list of tracks.
 * @param {Array} tracks 
 * @param {Object} settings
 * @return An array of arrays containing duplicate tracks 
 */
const findDuplicates = (tracks, settings) => {
    const sorted = tracks.concat();
    sorted.sort((a, b) => a.name.localeCompare(b.name));
    const duplicates = [];

    let last = 0;
    for (let current = 1; current < sorted.length; current++) {
        if (!sameSong(sorted[last], sorted[current])) {
            if (current - last > 1) {
                duplicates.push(sorted.slice(last, current))
            }
            last = current;
        }
    }
    console.log(duplicates);
    return duplicates;
}

const pruneDuplicates = (liason, duplicates, toKeep) => {
    // Filter out all duplicates that the user chose to keep
    duplicates.filter((dups, i) => toKeep[i] !== -1);
    toKeep.filter(val => val !== -1);

    const toRemove = duplicates.reduce((toRemove, dups, i) =>
        toRemove.concat(dups.filter((track, j) => j !== toKeep[i])) // for each set of duplicates, adds all songs that are not being kept
        , [])
    liason.removeTracks(toRemove);
}

const DuplicatePruner = ({ authorized, tracks, liason, loginButton, progress, finished }) => {
    const [duplicates, setDuplicates] = useState([]);
    const [pruned, setPruned] = useState(false);
    const [step, setStep] = useState(0);
    const [settings, setSettings] = useState({
        explicit: explicitPref.IGNORE,
    })

    if (authorized && step === 0)
        setStep(step + 1);

    if (step === 2 && !pruned) {
        const dups = findDuplicates(tracks)
        setDuplicates(dups);
        setPruned(true);
    }

    const getContent = () => {
        switch (step) {
            case 0:
                return loginButton
            case 1:
                return (
                    <>
                        <Grid item xs={12} align='center'>
                            {progress}
                        </Grid>
                        <Grid item xs={12} align='center'>
                            <Button
                                variant='contained'
                                onClick={() => { setStep(2) }}
                                disabled={!finished}
                            >
                                Next
                        </Button>
                        </Grid>
                    </>

                )
            case 2:
                return (
                    <DuplicateDisplay
                        duplicates={duplicates}
                        proceed={selected => pruneDuplicates(liason, duplicates, selected)}
                    />
                )
            case 3:
                return (
                    <Typography>
                        Duplicate songs successfully removed.
                    </Typography>
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