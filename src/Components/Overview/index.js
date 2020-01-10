import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import OverviewCard from './OverviewCard';

const useStyles = makeStyles(theme => ({
    root: {
        'marginTop': theme.spacing(3),
        'overflow': 'hidden'
    },
    card: {
        'min-width': '40%',
        'max-width': '80%'
    }
}))

const Overview = () => {
    const classes = useStyles()
    return (
        <Grid container spacing={2} className={classes.root} justify='space-around' align='center'>
            <Grid item sm={12} md={6} className={classes.card}>
                <OverviewCard
                    title={'Duplicate Pruner'}
                    description={'Removes any songs that have been added multiple times to your library'}
                    path={'dup-prune'}
                />
            </Grid>
            {/*<Grid item xs={12} sm={6}>
                <OverviewCard
                    title={'Playlist Generator'}
                    description={'Generates randomly shuffled playlists from your library for easy downloading'}
                    path={'play-gen'}
                />
    </Grid>*/}
            <Grid item sm={12} md={6} className={classes.card}>
                <OverviewCard
                    title={'Discover Weekly Extender'}
                    description={'Generates a longer version of your Discover Weekly playlist'}
                    path={'extend'}
                />
            </Grid>
        </Grid>
    )
}

export {
    Overview
}