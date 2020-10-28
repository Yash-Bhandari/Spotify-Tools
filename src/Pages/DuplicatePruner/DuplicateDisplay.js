import React, { useState } from 'react';
import { Typography, Paper, RadioGroup, FormControlLabel, Radio, Grid, Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, makeStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Choice = ({ dups, selectedTrack, setSelectedTrack }) =>
    <ExpansionPanel TransitionProps={{mountOnEnter: true, unmountOnExit: true}}>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
        >
            <Typography>
                {`${dups[0].name} by ${dups[0].artists[0].name} was found ${dups.length} times.`}
            </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <Typography>
                        Select which album's version you want to keep.
                </Typography>
                </Grid>

                <Grid item>
                    <RadioGroup
                        row
                        value={selectedTrack}
                        onChange={e => { setSelectedTrack(parseInt(e.target.value)) }}
                    >
                        <FormControlLabel
                            value={-1}
                            control={<Radio />}
                            label='Keep All'
                        />
                        {
                            dups.map((track, i) =>
                                <FormControlLabel
                                    value={i}
                                    control={<Radio />}
                                    label={track.album.name}
                                />
                            )
                        }
                    </RadioGroup>
                </Grid>
            </Grid>
        </ExpansionPanelDetails>
    </ExpansionPanel>

const useStyles = makeStyles({
    root: {
        maxHeight: 500,
        overflow: 'auto'
    }
})

export const DuplicateDisplay = ({ duplicates, proceed }) => {
    const [selected, setSelected] = useState(duplicates.map(tracks => 0));
    const classes = useStyles();
    return (
        <>
            <Grid item xs={12} container justify='center'>
                {duplicates.length === 0
                    ? <Typography>We didn't find any duplicates. You're all set.</Typography>
                    : <Typography>
                        We found {duplicates.length} duplicate(s). If there are duplicates that you don't want to remove, just click on them and select 'Keep All'.
                    </Typography>
                }

            </Grid>
            <Paper className={classes.root}>
                {duplicates.map((dups, i) =>
                    <Choice
                        dups={dups}
                        selectedTrack={selected[i]}
                        key={i}
                        setSelectedTrack={val =>
                            // replaces the i-th entry of selected with the new val
                            setSelected(prev => {
                                let next = [...prev];
                                next[i] = val;
                                return next;
                            })}
                    />
                )}
            </Paper>
            <Grid item xs={12} container justify='center'>
                <Button variant='contained' color='primary' onClick={() => proceed(selected)}>
                    Remove Duplicates
            </Button>
            </Grid>
        </>
    )
}