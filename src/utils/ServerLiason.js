/**
 * Given a list of tracks, return a comma-seperated string of their track ids.
 * @param tracks A list of tracks
 * @returns A comma seperated string of track ids
 */
const commaSepIDs = (tracks) => tracks.map(track => track.id).join();

function ServerLiason(authKey) {
    this.authKey = authKey;
    this.url = 'https://api.spotify.com/v1';
    this.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authKey
    }

    /**
     * Fetches user's entire library from the Spotify API
     * @param setTracks A function called to immutably update a list of tracks.
     * @returns true once all tracks have been fetched.
     */
    this.fetchTracks = async (setTracks) => {
        console.log('called');
        const url = this.url + '/me/tracks?limit=50'
        const req = {
            method: 'GET',
            headers: this.headers
        }

        let tracks = [];

        let numTracks = 0;
        while (true && tracks.length < 600) {
            const items = await fetch(url + '&offset=' + numTracks, req)
                .then(resp => resp.json())
                .then(json => json.items);

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
        const url = this.url + '/me/tracks';
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

    /**
     * Gets a list of the user's playlists
     */
    this.getPlaylists = async () => {
        const url = this.url + '/me/playlists?limit=50';
        const output = [];

        let offset = 0;
        while (true) {
            const playlists = await fetch(url + '&offset=' + offset, {
                method: 'GET',
                headers: this.headers
            })
                .then(resp => resp.json())
                .then(json => json.items);

            if (playlists.length === 0)
                break;
            output.push(...playlists);
            offset += 50;
        }

        return output;
    }

    /**
     * Given a playlist's ID, gets a list of its tracks.
     * @param playlistID The playlist's ID
     */
    this.getPlaylistTracks = async (playlistID) => {
        const url = this.url + '/playlists/' + playlistID;

        return fetch(url, {
            method: 'GET',
            headers: this.headers
        })
            .then(resp => resp.json())
            .then(json => json.tracks.items)
            .then(items => items.map(
                item => item.track
            ));
    }

    /**
     * Given a list of tracks, checks which ones are in the user's library.
     * @param tracks A list of tracks to check
     * @returns An array of booleans whose i-th value will be true only if 
     */
    this.checkIfInLibrary = async (tracks) => {
        const url = this.url + '/me/tracks/contains?ids=';
        const output = [];

        for (let i = 0; i < tracks.length; i += 50) {
            const ids = commaSepIDs(tracks.slice(i, i + 50));
            await fetch(url + ids, {
                method: 'GET',
                headers: this.headers,
            })
                .then(resp => resp.json())
                .then(bools => output.push(...bools))

        }
        return output;
    }

    /**
     * Returns a list of recommended tracks based off of a list of seed tracks
     * @param seeds A list of tracks
     * @param limit The number of song recommendations
     * @returns A list of recommended tracks
     */
    this.getRecommendedTracks = async (seeds, limit) => {
        const ids = commaSepIDs(seeds);
        const url = this.url + '/recommendations/?limit=' + limit + '&seed_tracks=' + ids;

        return fetch(url, {
            method: 'GET',
            headers: this.headers
        })
        .then(resp => resp.json())
        .then(json => json.tracks);
    }
}

export default ServerLiason;