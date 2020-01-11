import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, CircularProgress, Link } from '@material-ui/core';
import { Description, Wizard } from '../../Components';
import { Settings } from './Settings';
import { makePlaylistName } from '../../utils';
import { PlaylistDisplay } from './PlaylistDisplay';
import shuffle from 'shuffle-array';

const descriptionText = "Really like your Discover Weekly playlist this week but wish it was a bit longer? Look no further. This tool uses Spotify's API to generate a new playlist based off of your Discover Weekly filled with songs that aren't in your library (yet)."

const stepNames = ['Sign Into Spotify', 'Choose Settings', 'Generate Playlist'];

const getRecommendedTracks = async (liason, settings) => {
    // gets a list of tracks in the user's discover weekly playlist
    const discoverTracks = await liason.getPlaylists()
        .then(playlists => playlists.find(
            playlist => playlist.name === "Discover Weekly"),
        )
        .then(playlist => liason.getPlaylistTracks(playlist.id))
        .catch(err => {
            alert('Your Discover Weekly playlist is not saved to your library. Save it and try again.');
            window.location.href = '/';
        });

    const finalPlaylist = new Set([]);

    // Groups of seed tracks made for spotify's recommender
    // Seeds can have at most 5 tracks
    const numSeedGroups = discoverTracks.length / 5;
    // At most 100 recommended tracks can be requested per seed group
    const tracksPerGroup = Math.min(Math.ceil(settings.size / numSeedGroups), 100);

    // In case lots of recommended songs are invalid, we iterate up to 5 times
    for (let i = 0; i < 5; i++) {
        console.log(finalPlaylist.size)
        if (finalPlaylist.size >= settings.size)
            break;

        shuffle(discoverTracks);
        const seedGroups = [...Array(numSeedGroups).keys()].map(
            groupNum => discoverTracks.slice(groupNum * 5, groupNum * 5 + 5)
        );

        let tracks = [];

        for await (const seedGroup of seedGroups) {
            tracks.push(...(await liason.getRecommendedTracks(seedGroup, tracksPerGroup)));
        }
        const inLibrary = await liason.checkIfInLibrary(tracks);

        // Filters out tracks that don't abide by explicit rule or are already in the user's library
        tracks.filter((track, i) => (settings.explicit || !track.explicit) && !inLibrary[i])
            .forEach(track => finalPlaylist.add(track));

    }
    return [...finalPlaylist.values()].slice(0, settings.size);
}

// Creates a playlist and returns an object with information about it
const makePlaylist = async (liason, settings) => {
    const tracksToAdd = await getRecommendedTracks(liason, settings);
    const playlist = await liason.createPlaylist(settings.playlistName, false,
        'Extended discover weekly playlist made with Spotify Tools', tracksToAdd);
    const toReturn = {
        url: playlist.external_urls.spotify,
        name: playlist.name,
        size: tracksToAdd.length,
        tracks: tracksToAdd
    }
    return toReturn;
}

const DiscoverExtender = ({ liason, loginButton, authorized }) => {
    const [step, setStep] = useState(0);
    // 0 for not started, 1 for started, 2 for finished
    const [progress, setProgress] = useState(0);
    const [playlist, setPlaylist] = useState(null);
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
        makePlaylist(liason, settings)
            .then(playlist => setPlaylist(playlist))
            .then(_ => setProgress(2))
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
            case 2:
                return <>
                    {
                        progress === 1
                            ? <CircularProgress />
                            : <PlaylistDisplay playlist={playlist} />
                    }
                </>
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