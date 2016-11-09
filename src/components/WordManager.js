const _ = require('lodash')
import Word from './Word.js'

import Rect from '../utils/Rect.js'
// import {determineFontHeight, determineFontWidth} from '../utils/Helper.js'



class WordManager {
	constructor(data, appID) {
		this.data = data
		this.rect = new Rect(0,0,this.data.globalOptions.size.w,this.data.globalOptions.size.h)
		const app = document.getElementById(appID);
		console.log(app);


		const canvasTo = document.createElement('canvas');
		canvasTo.id = 'copy-to';
		app.appendChild(canvasTo)

		const canvasFrom = document.createElement('canvas');
		canvasFrom.id = 'copy-from';
		// app.appendChild(canvasFrom)





		canvasFrom.width = canvasTo.width = this.rect.w
		canvasFrom.height = canvasTo.height = this.rect.h

		const dummyDom = document.getElementById('dummy-font');
		const dummyStyle = window.getComputedStyle(dummyDom)


		this.ctxCopyFrom 	= canvasFrom.getContext('2d')
		this.ctxCopyTo 		= canvasTo.getContext('2d')


		this.x = 0
		this.y = 0

		this.counter = 0
		this.padding = 25
		this.style = {
			color: dummyStyle.getPropertyValue('color'),
			size:dummyStyle.getPropertyValue('font-size'),
			font:dummyStyle.getPropertyValue('font-family')
		}
		this.styleCSS = `font-family: = ${this.style.font}; font-size: ${this.style.size}`


		this.wordDataCurr = null
		this.wordDataNext = null
		this.index = 0

		this.wordPrev = null
		this.wordCurr = null

		// this.defaultWord()

		// console.log(this.data);

	}

	defaultWord() {
		const word = new Word(this.ctxCopyFrom, this.ctxCopyTo, this.data.globalOptions)

		this.wordPrev = this.wordCurr
		this.wordCurr = word
		const werd = {
			text:'An experiment for expressive \n typography using particles', 		playAt: '32' }


		word.writeWord(werd, this.style, {y:100})
		console.log(this.wordCurr);
	}

	getWordByTime(ytTime) {
		let wordTemp
		this.data.words.forEach( (wordItem) => {
			if(ytTime >= wordItem.seconds) {
				wordTemp = wordItem
			}
		} )

		if(wordTemp) {
			if(wordTemp.seconds !== _.get(this.wordCurr, 'wordData.seconds')) {
				const word = new Word(this.ctxCopyFrom, this.ctxCopyTo, this.data.globalOptions)

				this.wordPrev = this.wordCurr
				this.wordCurr = word
				word.writeWord(wordTemp, this.style)
			}else{
				const gap = ytTime - _.get(this.wordCurr, 'wordData.seconds', ytTime)
				if(gap>6) {
					if(this.wordCurr.trans === 'in') {
						this.wordCurr.transOut()
					}
				}
			}
		}else{

			if(this.wordCurr) {
				if(this.wordCurr.trans === 'in') {
					this.wordCurr.transOut()
				}


			}
		}
	}






	render() {
		this.ctxCopyTo.clearRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
		if(this.wordCurr){
			this.wordCurr.render()
			// console.log(this.wordCurr);
		}

	}

}

window.Peppercorn = WordManager

export default WordManager





