import {clientID, redirectURI} from './secrets'


let accessToken = '';
export const Spotify = {
    search(term){
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
                }
            }
        ).then(response => {
            if(response.ok){
                response.json()
                .then(response.map(track => {
                    return {
                        ID: track.id,
                        Name: track.name,
                        Artist: track.artists[0].name,
                        Album: track.album.name,
                        URI: track.uri
                    }
                }))
            }
            else return [];
        })
    },

    getAccessToken(){
        if(accessToken){
            return accessToken
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        
        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?
            client_id=${clientID}&response_type=token
            &scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
        }
        
    }
}