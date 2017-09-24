import React from 'react';
import './App.css';
import { FormGroup, FormControl, Glyphicon, InputGroup } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      artist : null,
      tracks : []
    }
  }

  search(){
    console.log('this.state', this.state);
    const BASE_URL = "https://api.spotify.com/v1/search?";
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    var accessToken = 'BQBLik9sBkiXmGeseRCjQhKsWcxotd01YyZAP6nupu2eimKZI7b_QfvLVToedFHdR1fjGQO23sb6_O1D-zW5pKidOT8yfgtENGinV8UuQa6klBNg8R7Zuw_7iIkj9OP5lZGvQSo0HcQ8EHaC6AZAI_117bTYoQ';
	

    //'BQBewQ-zuaj24Ui7Ckm46nTaOycG0qBYcekya-tBZT6ExbopxLITgh78SV23f8o5ZS_z3RRP24o9HIPwkSoWVwQTy838clmupcteVzue56Cp-wBZuYrEhCRktQk5yvOjKgSx-if4sOdHCrsEFVb3nj2EcO4XXHIWzBSsJF96USyVYgO-_GUNUV4fHPnEZ3jHheIl8ZWKEK8HAJV791iSSPFoB8yfa7Q8A9eW75RFrmjs5FojGOxvFeYIsBIET9qSdviVnJ9u-Ul765mr6CCqkjexsONcX5fNYeCVvQ96mYPtL5kbzOoAdzxOz3ho_0rl'

    var myHeaders = new Headers();
    var myOptions = {
      method: 'GET',
      headers:  {
        'Authorization': 'Bearer ' + accessToken
     },
      mode: 'cors',
      cache: 'default'
    };

    console.log('FETCH_URL', FETCH_URL);

    fetch(FETCH_URL, myOptions)
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      console.log('artist', artist);
      this.setState({artist});

      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
      fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        console.log('top tracks', json)
        const tracks = json.tracks; // also as const {tracks} = json ES6 representation
        this.setState({tracks});
      });
    });
  }

  render(){
    return(
      <div className='App'>
        <div className='App-title'>Music Maestro</div>
        <FormGroup>
          <InputGroup>
            <FormControl placeholder="Search an artist...." value={this.state.query}
              onChange={event => {this.setState({query : event.target.value})}}
              onKeyPress={event => {if(event.key === 'Enter') { this.search() }}}/>
            <InputGroup.Addon onClick={() => {this.search()}}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null ?
          <div>
            <Profile artist = {this.state.artist}/>
            <Gallery tracks = {this.state.tracks} />
          </div>
          :
          <div></div>
        }

      </div>
    )
  }

}

export default App;
