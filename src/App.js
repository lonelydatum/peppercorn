import React, { Component } from 'react';
import _ from 'lodash'
import './components/WordManager.js'

import Landing from './components/Landing.js'
import globalOptions from './songs/globalOptions.js'
import data from './songs/m83_wait.js'
import WebFont from 'webfontloader';
import Youtube from './components/Youtube.js'




import './App.css'


class App extends Component {
  constructor() {
    super()

    this.state = {isPlaying:false}

    const me = this
    WebFont.load({
      custom: {
        families: ['goth']
      },
      active(){
        setTimeout(me.start.bind(me), 0)
      },
    });
  }

  start() {
    // this.youtube = new Youtube(data.videoID, {w:globalOptions.size.w, h:window.innerHeight})
    // this.youtube.promise.then( this.onYTLoaded.bind(this) )
  }

  onYTLoaded() {

    this.player = this.refs.YT.player
    console.log(this.refs);
    // window.player = this.player
    this.wordManager = new window.Peppercorn(data, 'particles')

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
    // this.player.pauseVideo()
    this.setState({isPlaying:false})
  }

  playVideo() {
    // this.player.playVideo()
    this.setState({isPlaying:true})

  }

  render() {
    return (
      <div className="App" id="app">
        <div id="experience">
          <Youtube
            ref={'YT'}
            isPlaying={this.state.isPlaying}
            videoID={data.videoID}
            size={{w:globalOptions.size.w, h:window.innerHeight}}
            onYTLoaded={this.onYTLoaded.bind(this)}
          />
          <div id="particles" />
          <div id="dummy-font"></div>
        </div>
        <Landing landingOpen={this.pauseVideo.bind(this)} landingClose={this.playVideo.bind(this)} />
      </div>
    );
  }
}

export default App;
