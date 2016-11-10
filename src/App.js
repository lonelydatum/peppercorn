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
    this.youtube = new Youtube(data.videoID, {w:globalOptions.size.w, h:window.innerHeight})
    this.youtube.promise.then( this.onYTLoaded.bind(this) )
  }

  onYTLoaded() {
    this.player = this.youtube.player
    this.wordManager = new window.Peppercorn(data, 'particles')
    this.loop()
  }



  loop() {
    this.wordManager.render()
    this.wordManager.getWordByTime(this.player.getCurrentTime())
    requestAnimationFrame(this.loop.bind(this));
  }


  open() {
    this.player.pauseVideo()
  }

  close() {
    this.player.playVideo()
  }

  render() {
    return (
      <div className="App" id="app">
        <div id="experience">
          <div id="yt" />
          <div id="particles" />
          <div id="dummy-font"></div>
        </div>
        <Landing landingOpen={this.open.bind(this)} landingClose={this.close.bind(this)} />
      </div>
    );
  }
}

export default App;
