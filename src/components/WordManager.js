const _ = require('lodash')
import Word from './Word.js'
import Rect from '../utils/Rect.js'


class WordManager {
	constructor(data, canvasHolders) {
		this.data = data
		this.data.setSize()
		console.log(document.body.offsetWidth);
		this.rect = new Rect(0,0,this.data.globalOptions.size.w,this.data.globalOptions.size.h)
		this.maxReadTime = _.get(this.data, 'globalOptions.maxReadTime', 6)
		const app = document.getElementById(canvasHolders);
		const canvasTo = document.createElement('canvas');
		canvasTo.id = 'copy-to';
		app.appendChild(canvasTo)

		const canvasFrom = document.createElement('canvas');
		canvasFrom.id = 'copy-from';
		// app.appendChild(canvasFrom)

		canvasFrom.width = canvasTo.width = this.rect.w
		canvasFrom.height = canvasTo.height = this.rect.h
		const dummyDom = document.getElementById( this.data.globalOptions.cssID );
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


	}

	getWordByTime(ytTime) {
		let wordTemp
		let index
		this.data.words.forEach( (wordItem, i) => {
			if(ytTime >= wordItem.seconds) {
				wordTemp = wordItem
				index = i
			}
		} )

		if(wordTemp) {
			if(wordTemp.seconds !== _.get(this.wordCurr, 'wordData.seconds')) {
				const word = new Word(this.ctxCopyFrom, this.ctxCopyTo, this.data.globalOptions)
				word.index = index
				this.wordPrev = this.wordCurr
				this.wordCurr = word
				word.writeWord(wordTemp, this.style)
				return word
			}else{
				const gap = ytTime - _.get(this.wordCurr, 'wordData.seconds', ytTime)
				if(gap > this.maxReadTime) {

					if(this.wordCurr.trans === 'in' && !this.wordCurr.wordData.naturalDeath) {
						// console.log(this.wordCurr.wordData);
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





