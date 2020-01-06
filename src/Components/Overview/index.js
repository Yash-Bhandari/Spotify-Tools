import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import OverviewCard from './OverviewCard';

const useStyles = makeStyles(theme => ({
    root: {
        'marginTop': theme.spacing(3)
    }
}))

const Overview = () => {
    const classes = useStyles()
    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12} sm>
                <OverviewCard
                    title={'Duplicate Pruner'}
                    description={'Removes any songs that have been added multiple times to your library'}
                    path={'dup-prune'}
                />
            </Grid>
            <Grid item xs={12} sm>
                <OverviewCard
                    title={'Playlist Generator'}
                    description={'Generates randomly shuffled playlists from your library for easy downloading'}
                    path={'play-gen'}
                />
            </Grid>
        </Grid>
    )
}

export {
    Overview
}