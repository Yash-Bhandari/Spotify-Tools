import React, { useEffect } from 'react';
import {Button} from '@material-ui/core';

const scope = 'user-library-read user-library-modify';
const authLink =
    "https://accounts.spotify.com/authorize?response_type=token&client_id=dfaef265d1624a78810ee848076a1eb6&scope="+encodeURIComponent(scope);

export const LoginButton = ({ authorized, setAccessToken }) => {
    useEffect(() => handleRedirect(authorized, setAccessToken), []);

    return (
        <Button
            color='inherit'
            variant='outlined'
            disabled={authorized}
            href={authLink + '&redirect_uri=' + window.location.href}>
            {!authorized
                ? 'Sign In To Spotify'
                : 'Authorized'}
        </Button>
    )
}

const re = /access_token=([^&]+)/;
const handleRedirect = (authorized, setAccessToken) => {
    if (authorized)
        return;

    let access_token = re.exec(window.location.toString());
    if (access_token) {
        setAccessToken(access_token[1]);
    }
}