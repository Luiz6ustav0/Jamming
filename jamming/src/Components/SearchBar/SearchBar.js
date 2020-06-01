import React from 'react'
import './SearchBar.css'


export class SearchBar extends React.Component {
    render(){
        return (
        <div className="SearchBar">
            <input placeholder="Enter A song, Album, or Artist" />
            <button class="SearchButton">SEARCH</button>
        </div>
        );
    }
}