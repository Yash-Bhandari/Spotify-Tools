import React from 'react';
import { Grid, Checkbox, TextField, FormControlLabel, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    text: {
        'padding-left': theme.spacing(4),
        'padding-right': theme.spacing(4)
    }
}))

export const Settings = ({ settings, setSettings }) => {

    const handleChange = name => val => {
        if (name === 'size')

            setSettings(prev => {
                const next = { ...prev };
                next[name] = val;
                return next;
            })
    }

    const classes = useStyles();

    return (
        <Grid item container justify='space-around' spacing={2}>
            <Grid item lg={12}>
                <Typography align='center' className={classes.text}>
                    Choose the number and type of songs to include in your playlist.
                    You can also choose the playlist's name (we won't overwrite any existing playlists with the same name).
                </Typography>
            </Grid>
            <Grid item>
                <TextField
                    InputLabelProps={{ shrink: true }}
                    type='number'
                    defaultValue={0}
                    label='Playlist Size'
                    value={settings.size}
                    onChange={e => handleChange('size')(e.target.value)}
                />
            </Grid>
            <Grid item>
                <TextField
                    InputLabelProps={{ shrink: true }}
                    label={'Playlist Name'}
                    value={settings.playlistName}
                    onChange={e => handleChange('playlistName')(e.target.value)}
                />
            </Grid>
            <Grid item>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={settings.explicit}
                            onChange={e => handleChange('explicit')(e.target.checked)}
                        />
                    }
                    label='Allow Explicit Songs'
                />
            </Grid>
            <Grid item>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={settings.library}
                            onChange={e => handleChange('library')(e.target.checked)}
                        />
                    }
                    label='Allow Songs Already In Library'
                />
            </Grid>
        </Grid>
    )
}