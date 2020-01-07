import React, { useState } from 'react';
import { Typography, List, RadioGroup, FormControlLabel, Radio, Grid, Button } from '@material-ui/core';

const Choice = ({ dups, selectedTrack, setSelectedTrack }) =>
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
                    label={track.name}
                />
            )
        }
    </RadioGroup>

export const DuplicateDisplay = ({ duplicates, proceed }) => {
    const [selected, setSelected] = useState(duplicates.map(tracks => 0));
    return (
        <>
            <Grid item xs={12} container justify='center'>
                <Typography>
                    We found {duplicates.length} duplicate(s). Select the tracks you want to keep.
                </Typography>
            </Grid>
            <List>
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
            </List>
            <Grid item xs={12} container justify='center'>
                <Button variant='contained' onClick={() => proceed(selected)}>
                    Remove Selected.
            </Button>
            </Grid>
        </>
    )
}