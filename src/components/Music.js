import React, { Component } from 'react';
import './Music.css'

class Music extends Component {

	constructor() {
  		super()

      this.frames = [
        {playAt: '4.jpg'},
        {playAt: '1_02.jpg'},
        {playAt: '1_35.jpg'},
        {playAt: '2_13.jpg'},
        {playAt: '2_47.jpg'},
        {playAt: '3_32.jpg'},
        {playAt: '4_30.jpg'},
        {playAt: '4_50.jpg'}
      ]

      this.state = {playAt:this.frames[0].playAt}

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

    if(prevProps.word !== this.props.word){
      let playAt = this.props.word.wordData.playAt.replace(':', '_')
      playAt = `${playAt}.jpg`


      const result = this.frames.find((item)=>{
        return item.playAt === playAt
      })

      if(result) {
        // console.log(result);
        this.setState({playAt:result.playAt})
      }


    }
  }

  componentDidMount() {
    const audio = this.refs.audio

    this.player.audio = audio
    audio.addEventListener('loadeddata', this.props.onAudioLoaded)


  }

  render() {
    const url = `url(animated/${this.state.playAt})`
    const style = {backgroundImage:url, backgroundColor:'black'}
    // console.log(style);
		return (
			<div id="music" style={style}>
        <audio controls ref="audio" >

          <source src="m83-wait.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
		)
	}




}

export default Music