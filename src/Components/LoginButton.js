import React, { useEffect } from 'react';
import {Button} from '@material-ui/core';

const scope = 'user-library-read user-library-modify playlist-modify-private';
const authLink =
    "https://accounts.spotify.com/authorize?response_type=token&client_id=dfaef265d1624a78810ee848076a1eb6&scope="+encodeURIComponent(scope);

export const LoginButton = ({authorized, forNav}) => {

    return (
        <Button
            color={forNav ? 'inherit' : 'primary'}
            variant={forNav ? 'outlined' : 'contained'}
            disabled={authorized}
            href={authLink + '&redirect_uri=' + window.location.href}>
            {!authorized
                ? 'Sign Into Spotify'
                : 'Authorized'}
        </Button>
    )
}

