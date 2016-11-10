import React, { Component } from 'react';


class YT extends Component {

  	constructor() {
  		super()
		this.player = null;
  	}

  	componentDidUpdate(prevProps, prevState) {
  		if(prevProps.isPlaying !== this.props.isPlaying) {
  			if(this.props.isPlaying) {
  				this.player.playVideo()
  			}else{
  				this.player.pauseVideo()
  			}
  		}
  	}

  	componentDidMount() {
  		const tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		window.onYouTubeIframeAPIReady = this.ready.bind(this)
  	}

   ready() {
		this.player = new window.YT.Player('yt', {
	  		width: this.props.size.w,
	  		height: this.props.size.h-4,
	  		videoId: this.props.videoID,
	  		events: {
				'onReady': this.onPlayerReady.bind(this),
				'onStateChange': this.onPlayerStateChange.bind(this)
	  		}
		});
		window.player = this.player
  	}

  	onPlayerReady(event) {
		this.props.onYTLoaded()
	}

  	onPlayerStateChange(event) {
		this.status = event.data
  	}

  	stopVideo() {
		this.player.stopVideo()
  	}

  	render() {
  		return <div id="yt" />
  	}

}









  export default YT


