import React, { Component } from 'react';
import _ from 'lodash'
import './components/WordManager.js'
import data from './components/songs/m83_wait.js'
import Landing from './components/Landing.js'
import globalOptions from './components/songs/globalOptions.js'
import WebFont from 'webfontloader';
import Youtube from './components/Youtube.js'

import './App.css'


class App extends Component {
  constructor() {
    super()
    data.words = this.convertList(data.words)
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
    // console.log(this.player.getCurrentTime());
    this.wordManager.render()
    this.wordManager.getWordByTime(this.player.getCurrentTime())
    requestAnimationFrame(this.loop.bind(this));
  }

  convert(str) {
    const timeSplit = str.split(':')
    let minutes = 0
    let seconds = 0
    if(timeSplit.length > 1) {
      minutes = parseInt(timeSplit[0], 10)
      seconds = parseInt(timeSplit[1], 10)
    }else{
      seconds = parseInt(timeSplit[0], 10)
    }
    return minutes*60 + seconds
  }

  convertItem(item) {
    return { ...item, seconds: this.convert(item.playAt)}
  }

  convertList(list) {
    list = list.map((item) => {
      return this.convertItem(item)
    })
    return list
  }

  render() {
    return (
      <div className="App" id="app">

        <div id="experience">
          <div id="yt" />
          <div id="particles" />
          <div id="dummy-font"></div>
        </div>
        <Landing/>
      </div>
    );
  }
}

export default App;
