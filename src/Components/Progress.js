import React from 'react';
import { Typography } from '@material-ui/core';

export const Progress = ({ numTracks }) => {
    return (
        <Typography variant='subtitle1'>
            {numTracks} tracks fetched.<br></br>
    </Typography>
    )
}