import React from 'react'
import './Playlist.css'
import Tracklist from '../TrackList/Tracklist'


export class Playlist extends React.Component {
    render(){
        <div className="Playlist">
            <input defaultValue={'New Playlist'} />
            {/* <TrackList />  */}
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
    }
}
 