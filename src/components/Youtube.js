var Promise = require('promise');


class YT {
  	constructor(videoID, size) {
		this.player = null;
		this.size = size

		this.done = false;
		this.videoID = videoID
		this.resolve = null
		this.promise = new Promise(this.promiseCallBack.bind(this));





		const tag = document.createElement('script');

		tag.src = "https://www.youtube.com/iframe_api";
		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		window.onYouTubeIframeAPIReady = this.ready.bind(this)
  	}

  	promiseCallBack (resolve, reject) {
  		this.resolve = resolve
	}

   ready() {
		this.player = new window.YT.Player('yt', {
	  		width: this.size.w,
	  		height: this.size.h,
	  		videoId: this.videoID,
	  		events: {
				'onReady': this.onPlayerReady.bind(this),
				'onStateChange': this.onPlayerStateChange.bind(this)
	  		}
		});
		window.player = this.player
  	}



  	onPlayerReady(event) {
		// player.playVideo()
		// console.log(this.resolve);
		this.resolve()
	}

  	onPlayerStateChange(event) {
		// console.log(event.data)
  	}


  	stopVideo() {
		this.player.stopVideo()
  	}




}









  export default YT


