function ServerLiason(authKey) {
    this.authKey = authKey;
    this.url = 'https://api.spotify.com/v1/me';
    this.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authKey
    }

    this.fetchTracks = async (setTracks) => {
        console.log('called');
        const url = this.url + '/tracks?limit=50'
        const req = {
            method: 'GET',
            headers: this.headers
        }

        let tracks = [];

        let numTracks = 0;
        while (true && tracks.length < 600) {
            const items = await (fetch(url + '&offset=' + numTracks, req)
                .then(resp => resp.json())
                .then(json => json.items));

            // Each api call requests 50 songs
            // If fewer are returned, then we have exhausted the user's library
            if (items.length !== 50)
                break;

            tracks = tracks.concat(items.map(
                item => item.track
            ));

            numTracks += items.length;
            setTracks(tracks);
        }
        console.log(tracks)
        return true;
    }

    /**
     * Queries the spotify api to remove the specified tracks from the user library.
     * @param tracks An array of tracks to remove.
     */
    this.removeTracks = async (tracks) => {
        const url = this.url + '/tracks';
        const ids = tracks.map(track => track.id);

        // maximum of 50 songs can be removed at a time
        for (let i = 0; i < ids.length; i += 50) {
            await fetch(url, {
                method: 'DELETE',
                headers: this.headers,
                body: JSON.stringify(ids.slice(i, i + 50))
            })
        }

        return true;
    }
}

export default ServerLiason;