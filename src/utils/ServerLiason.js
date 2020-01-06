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


        while (items.length > 0) {
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
}