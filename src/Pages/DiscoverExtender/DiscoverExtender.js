import React, { useState } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { Description, Wizard } from '../../Components';
import { Settings } from './Settings';
import { makePlaylistName } from '../../utils';

const descriptionText = "Really like your Discover Weekly playlist this week but wish it was a bit longer? Look no further. This tool uses Spotify's API to generate a new playlist based off of your Discover Weekly filled with songs that aren't in your library (yet)."

const stepNames = ['Sign Into Spotify', 'Choose Settings', 'Generate Playlist'];

const DiscoverExtender = ({ liason, loginButton, authorized }) => {
    const [step, setStep] = useState(0);
    const [settings, setSettings] = useState({
        playlistName: makePlaylistName(),
        size: 30,
        explicit: true,
        library: false
    });

    if (step === 0 && authorized) {
        setStep(1);
    }

    const getContent = () => {
        switch (step) {
            case 0:
                return (
                    <>
                        <Grid item xs={12} container justify='center'>
                            <Typography>
                                We'll need permission to read your Spotify library and create playlists.
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
                        <Settings settings={settings} setSettings={setSettings} />
                        <Grid item>
                            <Button
                                variant='contained'
                                onClick={() => setStep(2)}
                                color='primary'
                            >
                                Next
                        </Button>
                        </Grid>
                    </>
                )
        }
    }

    return (
        <Grid container justify='center' direction='column' spacing={2}>
            <Description text={descriptionText} />
            <Wizard
                step={step}
                stepNames={stepNames}
                getContent={getContent}
            />
        </Grid>
    )
}

export default DiscoverExtender;