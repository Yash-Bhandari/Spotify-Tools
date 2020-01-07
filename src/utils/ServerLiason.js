export function ServerLiason(authKey) {
    this.authKey = authKey;
    this.url = 'https://api.spotify.com/v1/me';
    this.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authKey
    }

    this.sayName = () => {
        return this.url;
    }

    this.fetchTracks = async (setTracks) => {
        const url = this.url + '/tracks?limit=50'
        const req = {
            method: 'GET',
            headers: this.headers
        }

        let tracks = [];
        let items = await fetch(url, req)
            .then(resp => resp.json())
            .then(json => json.items)


        while (items.length > 0 && tracks.length < 1500) {
            tracks = tracks.concat(items.map(
                item => item.track
            ));
            setTracks(tracks);
            console.log(tracks);
            items = await fetch(url+'&offset='+tracks.length, req)
                .then(resp => resp.json())
                .then(json => json.items)
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
        for (let i = 0; i < ids.length; i+=50) {
            await fetch(url, {
                method: 'DELETE',
                headers: this.headers,
                body: JSON.stringify(ids.slice(i, i+50))
            })
        }

        return true;
    }
}