import WordManager from './WordManager.js'
import Youtube from './yt/Youtube.js'
import {range} from './Helper.js'
import _ from 'lodash'
// import data from './songs/jack-garret_worry.js'
import data from './songs/m83_wait.js'
import globalOptions from './songs/globalOptions.js'

const WebFont = require('webfontloader');
let wordManager
let youtube




function convert(str) {
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



function convertList(list) {
	list = list.map((item) => {
		if(item.constructor === Array) {
			return convertList(item)
		}else if(_.get(item, 'playAt')){
			return convertItem(item)
		}
	})
	return list
}



function convertItem(item) {
	return { ...item, seconds:convert(item.playAt)}
}




data.words = convertList(data.words)


WebFont.load({
	custom: {
		families: ['goth']
	},
	active(){
		setTimeout(start, 0)
	},
});









function start() {
	youtube = new Youtube(data.videoID, {w:globalOptions.size.w, h:window.innerHeight})
	youtube.promise.then( onYTLoaded )
}

function onYTLoaded() {
	player = youtube.player
	wordManager = new window.Peppercorn(data, 'app')
	render()
}





function render() {
	// console.log(this);
	wordManager.render()
	wordManager.getWordByTime(player.getCurrentTime())
	requestAnimationFrame(render);
}

const overlay = document.getElementById('overlay');

function showOverlay() {
	const cta = document.getElementById('cta')
	cta.addEventListener('click', hideOverlay)
}

function hideOverlay() {
	TweenMax.to(overlay, 1, {autoAlpha:0})
	player.playVideo()
	// player.seekTo(197)
}


showOverlay()