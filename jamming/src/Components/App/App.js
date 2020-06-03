import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar'
import {SearchResults} from '../SearchResults/SearchResults'
import {Playlist} from '../Playlist/Playlist'

class App extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.state = {
      searchResults: [{
      name: 'Bros',
      artist: 'Vintage Culture',
      album: 'V&Friends',
      id: '228'
    },  
    {
      name: 'Bling Bling',
      artist: 'Malaa',
      album: 'Remake',
      id: '666'
    }],
    playlistName: 'Test Playlist',
    playlistTracks: [],
  }
  }

  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      this.setState({playlistTracks: this.state.playlistTracks.push(track)});
    }
  }

  removeTrack(track){
    for(let i in this.state.playlistTracks) {
      if(i.id === track.id){
        this.setState({playlistTracks: this.state.playlistTracks.remove(i)});
      }
    }
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.onRemove} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;