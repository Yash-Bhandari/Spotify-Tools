import React, { useState } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { Description, Wizard } from '../../Components';
import { Settings } from './Settings';
import { makePlaylistName } from '../../utils';

const descriptionText = "Really like your Discover Weekly playlist this week but wish it was a bit longer? Look no further. This tool uses Spotify's API to generate a new playlist based off of your Discover Weekly filled with songs that aren't in your library (yet)."

const stepNames = ['Sign Into Spotify', 'Choose Settings', 'Generate Playlist'];

// TODO: make sure the number of requested songs are always returned
const makePlaylist = async (liason, settings) => {
    // gets a list of tracks in the user's discover weekly playlist
    const discoverTracks = await liason.getPlaylists()
        .then(playlists => playlists.find(
            playlist => playlist.name === "Discover Weekly")
        )
        .then(playlist => liason.getPlaylistTracks(playlist.id));

    //const playlist = new Set([]);

    // Groups of seed tracks made for spotify's recommender
    // Seeds can have at most 5 tracks
    const numSeedGroups = discoverTracks.length / 5; 
    const seedGroups = [...Array(numSeedGroups).keys()].map(
        groupNum => discoverTracks.slice(groupNum*5, groupNum*5 + 5)
    );

    // At most 100 recommended tracks can be requested per seed group
    const tracksPerGroup = Math.min(Math.ceil(settings.size / numSeedGroups), 100);
    let tracks = [];

    for await (const seedGroup of seedGroups) {
        tracks.push(...(await liason.getRecommendedTracks(seedGroup, tracksPerGroup)));
    }
    console.log(tracks);

    const inLibrary = await liason.checkIfInLibrary(tracks);

    // Filters out tracks that don't abide by explicit rule or are already in the user's library
    tracks = tracks.filter((track, i) => (settings.explicit || !track.explicit) && !inLibrary[i]);
    console.log(tracks);
    return tracks;
}

const DiscoverExtender = ({ liason, loginButton, authorized }) => {
    const [step, setStep] = useState(0);
    // 0 for not started, 1 for started, 2 for finished
    const [progress, setProgress] = useState(0);
    const [settings, setSettings] = useState({
        playlistName: makePlaylistName(),
        size: 30,
        explicit: true,
        library: false
    });

    if (step === 0 && authorized) {
        setStep(1);
    }

    if (step == 2 && progress == 0) {
        setProgress(1);
        makePlaylist(liason, settings).then(_ => setProgress(2));
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