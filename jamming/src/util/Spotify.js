import {clientID, redirectURI} from './secrets'


let accessToken = '';
export const Spotify = { 
    getAccessToken(){
        if(accessToken){
            return accessToken
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch !== null && expiresInMatch !== null){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            console.log('clientID: ' + clientID);
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
        }
    },

    search(term){
        const access_token = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
            {
            headers: {Authorization: `Bearer ${accessToken}`}
            }
        ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return []
            }
            return jsonResponse.tracks.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
            }));
        })
    },

    savePlaylist(playlistName, trackUris){
        if(!playlistName && !trackUris) return;
        const access_token = accessToken;
        const headers = {
            Authorization: `Bearer ${access_token}`
        };
        let userId = '';
        fetch("https://api.spotify.com/v1/me", {headers: headers})
            .then(response => {
                return response.json();
            })
            .then(jsonResponse => {
                userId = jsonResponse.id;
            });
        fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
                {
                    headers: {
                        method: 'POST',
                        Authorization: access_token,
                        "Content-Type": "application/json"
                    },
                    body: {
                        name: playlistName,
                        public: true,
                    }
                });       
    }
}