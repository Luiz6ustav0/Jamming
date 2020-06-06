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
        let access_token = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
            {
              headers: {'Authorization': 'Bearer ' + access_token}
            }
        ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(jsonResponse.tracks === undefined || jsonResponse === null || jsonResponse === []){
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
            }));
        })
    },

    savePlaylist(playlistName, trackUris){
        let userId = '';

        if(!playlistName || !trackUris) return;

        const access_token = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${access_token}`
        };
        return fetch("https://api.spotify.com/v1/me", {headers: headers})
                .then(response => response.json()
                ).then(jsonResponse => {
                    userId = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
                            {
                                headers: headers,
                                method: 'POST',
                                body: JSON.stringify({name: playlistName, public: true})
                            }
                            ).then(response => {
                                if(response.ok){
                                    return response.json();
                                }
                            }
                            ).then(jsonResponse => {
                                const playlistId = jsonResponse.id;
                                    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                                        {headers: headers,
                                        method: 'POST',
                                        body: JSON.stringify({uris: trackUris})
                                    })
                            });
                });       
    }
}