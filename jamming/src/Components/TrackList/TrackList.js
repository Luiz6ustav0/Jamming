import React from 'react'
import './TrackList.css'

export class TrackList extends React.Component{
    render(){
        return(
            <div className="TrackList">
                {this.props.tracks.map( track => {
                 return (
                    <div class="Track-information" key={track.id}>
                            <h3>{track.name}</h3>
                            <p>{track.artist} | {track.album}</p>
                    </div>
                 )   
                }
                )}
            </div>
        )
    }
}