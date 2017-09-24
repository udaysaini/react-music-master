import React from 'react';
import './App.css';

class Gallery extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      playingUrl : '',
      audio : null,
      playing : false
    }
  }
  playAudio(previewURL){
    let audio = new Audio(previewURL);
    if(!this.state.playing){
      audio.play();
      this.setState({
        playing: true,
        playingUrl: previewURL,
        audio
      })
    } else {
      if(this.state.playingUrl === previewURL){
        this.state.audio.pause();
        this.setState({
          playing: false
        });
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          playingUrl: previewURL,
          audio
        })
      }
    }
  }

  render(){
    const {tracks} = this.props;
    return(
      <div>
        {tracks.map((track, key) => {
          const trackImg = track.album.images[0].url;
          return(
            <div key={key}
              className="track"
              onClick={() => this.playAudio(track.preview_url)}>

              <img className="track-img" src={trackImg} alt="track"/>
              <div className="track-play">
                <div className="track-play-inner">
                  {
                    this.state.playingUrl === track.preview_url
                    ? <span>||</span>
                    : <span>&#9654;</span>
                  }
                </div>
              </div>
              <p className="track-text">
                {track.name}
              </p>

            </div>
          )
        })}
      </div>
    )
  }
}

export default Gallery;
