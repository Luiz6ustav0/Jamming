import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar'
import {SearchResults} from '../SearchResults/SearchResults'
import {Playlist} from '../Playlist/Playlist'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {searchResults: [{
      name: 'Bros',
      artist: 'Vintage Culture',
      album: 'V&Friends',
      id: '228'
    }, 
    {
      name: 'Liquid Slow',
      artist: 'Charlotte de Witte',
      album: 'Sould&Body',
      id: '113'
    }, 
    {
      name: 'Bling Bling',
      artist: 'Malaa',
      album: 'Remake',
      id: '666'
    }]}
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div class="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;