import React, { Component } from 'react';
import './Music.css'

class Music extends Component {

	constructor() {
  		super()
		  this.player = {
        play() {
          this.audio.play()
        },

        pause() {
          this.audio.pause()
        },

        getCurrentTime(){

          return this.audio.currentTime
        }
		  }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.isPlaying !== this.props.isPlaying){
      if(this.props.isPlaying) {
        this.player.play()
      }else{
        this.player.pause()
      }
    }
  }

  componentDidMount() {
    const audio = this.refs.audio

    this.player.audio = audio
    audio.addEventListener('loadeddata', this.props.onAudioLoaded)


  }

  render() {
		return (
			<div id="music">
        <audio controls ref="audio" >

          <source src="m83-wait.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
		)
	}




}

export default Music