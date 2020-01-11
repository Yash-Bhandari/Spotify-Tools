import React, { useState } from 'react';
import { Grid, Stepper, Step, StepLabel, Button, Typography, Radio, RadioGroup, CircularProgress } from '@material-ui/core';
import { Description, Progress, Wizard } from '../../Components';
import { DuplicateDisplay } from './DuplicateDisplay';

const descriptionText = "If you have a large enough library, you might find that you have quite a few duplicate songs saved. This is because Spotify considers tracks released as singles different from tracks released in an album, even if they are the exact same song. And depending on your listening habits, you also may have accumulated explicit and censored versions of songs. Regardless of why they are there, these duplicates can be pruned out of your Spotify library with this tool.";

const stepNames = ['Sign Into Spotify', 'Fetch Songs', 'Prune Duplicates', 'Review'];

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

    const toRemove = duplicates.reduce((toRemove, dups, i) => {
        toRemove.push(...dups.filter((track, j) => j !== toKeep[i])) // for each set of duplicates, adds all songs that are not being kept
        return toRemove;
    }, [])
    console.log(toRemove);
    liason.removeTracks(toRemove);
    return toRemove.length;
}

const DuplicatePruner = ({ authorized, tracks, setTracks, liason, loginButton, progress, finishedFetching }) => {
    const [duplicates, setDuplicates] = useState([]);
    const [pruned, setPruned] = useState(false);
    const [step, setStep] = useState(0);
    const [numRemoved, setNumRemoved] = useState(0);
    const [settings, setSettings] = useState({
        explicit: explicitPref.IGNORE,
    })

    if (authorized && step === 0){
        setStep(1);
        liason.fetchTracks(setTracks)
            .then(_ => setStep(2));
    }

    if (step === 2 && !pruned) {
        const dups = findDuplicates(tracks)
        setDuplicates(dups);
        setPruned(true);
    }

    const getContent = () => {
        switch (step) {
            case 0:
                return (
                    <>
                        <Grid item xs={12} container justify='center'>
                            <Typography>
                                We'll need permission to read and modify your Spotify library.
                            </Typography>
                        </Grid>
                        <Grid item>
                            {loginButton}
                        </Grid>
                    </>
                )
            case 1:
                return (
                    <>
                        <Grid item xs={12} container justify='center'>
                            {progress}
                        </Grid>
                        <Grid item xs={12} container justify='center'>
                            {finishedFetching
                                ? < Button
                                    variant='contained'
                                    onClick={() => { setStep(2) }}
                                    disabled={!finishedFetching}
                                    color='primary'
                                >
                                    Next
                                </Button>
                                : <CircularProgress />
                            }

                        </Grid>
                    </>

                )
            case 2:
                return (
                    <DuplicateDisplay
                        duplicates={duplicates}
                        proceed={selected => {
                            setNumRemoved(pruneDuplicates(liason, duplicates, selected));
                            setStep(3);
                        }}
                    />
                )
            case 3:
                return (
                    <Typography>
                        All done! {numRemoved} duplicate song(s) successfully removed.
                    </Typography>
                )
        }
    }

    return (
        <Grid container justify='center' direction='column' spacing={2}>
            <Description text={descriptionText} />
            <Wizard step={step} stepNames={stepNames} getContent={getContent} />
        </Grid>
    )
}

export default DuplicatePruner;