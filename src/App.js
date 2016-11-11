import React, { Component } from 'react';
import _ from 'lodash'
import screenOrientation from 'screen-orientation'

import './components/WordManager.js'

import Landing from './components/Landing.js'
import globalOptions from './songs/globalOptions.js'
import data from './songs/m83_wait.js'
// import WebFont from 'webfontloader';
import Youtube from './components/Youtube.js'
import Music from './components/Music.js'
import Orientation from './components/Orientation.js'


import './App.css'


class App extends Component {
  constructor() {
    super()

    this.state = {isPlaying:false, orientation:screenOrientation().direction}

    this.isIphone = (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))

    // const me = this
    // WebFont.load({
    //   custom: {
    //     families: ['goth']
    //   },
    //   active(){
    //     setTimeout(me.start.bind(me), 0)
    //   },
    // });

    window.addEventListener('orientationchange', this.doOnOrientationChange.bind(this));


  }

  doOnOrientationChange()
  {

    this.setState({orientation:screenOrientation().direction})
  }




  onYTLoaded() {
    this.player = this.refs.YT.player
    this.createStarDust()
  }

  onAudioLoaded() {
    this.player = this.refs.AUDIO.player
    this.createStarDust()
  }

  createStarDust() {
    this.wordManager = new window.Peppercorn(data, 'particles')
  }

  componentDidMount() {
    // this.doOnOrientationChange()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.isPlaying !== this.state.isPlaying) {
      if(this.state.isPlaying) {
        this.loop()
      }
    }
  }

  loop() {
    this.wordManager.render()

    this.wordManager.getWordByTime(this.player.getCurrentTime())
    if(this.state.isPlaying) {

      requestAnimationFrame(this.loop.bind(this));
    }
  }


  pauseVideo() {
    this.setState({isPlaying:false})
  }

  playVideo() {
    this.setState({isPlaying:true})
  }

  render() {
    const youtube = (<Youtube
            ref={'YT'}
            isPlaying={this.state.isPlaying}
            videoID={data.videoID}
            size={{w:globalOptions.size.w, h:window.innerHeight}}
            onYTLoaded={this.onYTLoaded.bind(this)}
          />)

    const music = (
      <Music
        ref={'AUDIO'}
        isPlaying={this.state.isPlaying}
        onAudioLoaded={this.onAudioLoaded.bind(this)}
      />
      )


    const showOrientation = this.state.orientation === 'portrait'

    const WITH_ORIENTATION = (
      <div className="App" id="app">
        <Orientation/>
      </div>
    )

    const NORMAL = (
      <div className="App" id="app">

        <div id="experience">
          {this.isIphone ? music : youtube}
          <div id="particles" />
          <div id="dummy-font"></div>
        </div>

        <Landing landingOpen={this.pauseVideo.bind(this)} landingClose={this.playVideo.bind(this)} />
      </div>
    )


    return (

       showOrientation ? WITH_ORIENTATION : NORMAL


    );
  }
}

export default App;
