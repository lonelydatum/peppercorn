import {getRectFromContext, determineFontHeight, getNonTransparentPixels, range} from '../utils/Helper.js'
import Rect from '../utils/Rect.js'
import Vector from './Vector.js'
import Particle from './Particle.js'
import _ from 'lodash'

class Word {
	constructor(ctxCopyFrom, ctxCopyTo, globalOptions) {
		this.globalOptions = globalOptions
		this.ctxCopyFrom 	= ctxCopyFrom
		this.ctxCopyFromRect = getRectFromContext(this.ctxCopyFrom)
		this.ctxCopyTo 		= ctxCopyTo
		this.particles = []

		this.trans = "in"

	}

	transOut() {
		this.trans = 'out'
		this.particles.forEach((item) => {
			item.velocity._x *= -1
			item.velocity._y *= -1
		})
	}



	writeWord(wordData, style, pos) {
		this.style 			= style
		this.wordData 				= wordData






		const r = this.ctxCopyFromRect
		this.ctxCopyFrom.clearRect(r.x, r.y, r.w, r.h)
		this.ctxCopyFrom.font 	= `${this.style.size} ${this.style.font}`

		const w = this.ctxCopyFrom.measureText(wordData.text).width
		const heightStyle = `font-family: = ${this.style.font}; font-size: ${this.style.size}px`
		const h = determineFontHeight(heightStyle) * .5


		const x = _.get(pos, 'x', ( r.w - w )  * .5)
		const y = _.get(pos, 'y', ( r.h - (h) )  * .5)





		this.ctxCopyFrom.fillStyle = style.color

		this.ctxCopyFrom.fillText(this.wordData.text, x, h+y);

		this.originX = _.get(this.wordData, 'origin.x', this.globalOptions.origin.x )
		this.originY = _.get(this.wordData, 'origin.y', this.globalOptions.origin.y )


		this.speedMin = _.get(this.wordData, 'speed[0]', this.globalOptions.speed[0] )
		this.speedMax = _.get(this.wordData, 'speed[1]', this.globalOptions.speed[1] )

		this.offsetX = _.get(this.wordData, 'offset.x', this.globalOptions.offset.x)
		this.offsetY = _.get(this.wordData, 'offset.y', this.globalOptions.offset.y)

		const nonTransparentPixels = getNonTransparentPixels(this.ctxCopyFrom)
		this.particles = this.createParticle(nonTransparentPixels)




	}

	createParticle(nonTransparentPixels) {
		const particles = []
		const bounds = {minX: 9999, maxX:0, minY:9999, maxY:0}
		nonTransparentPixels.forEach( (staticItem, index) => {
			bounds.minX = Math.min( bounds.minX, staticItem.x )
			bounds.maxX = Math.max( bounds.maxX, staticItem.x )
			bounds.minY = Math.min( bounds.minY, staticItem.y )
			bounds.maxY = Math.max( bounds.maxY, staticItem.y )
		} )

		this.rect = new Rect(bounds.minX, bounds.minY, bounds.maxX - bounds.minX, bounds.maxY - bounds.minY)



		nonTransparentPixels.forEach( (staticItem, index)=>{
			let dynamicX = this.originX==='lock' ? staticItem.x : this.rect[this.originX]
			let dynamicY = this.originY==='lock' ? staticItem.y : this.rect[this.originY]
			if(this.wordData.preset === 'explode') {
				dynamicX = _.random(0, this.globalOptions.size.w)
				dynamicY = _.random(0, this.globalOptions.size.h)
				this.offsetX = this.offsetY = 0
			}




			const vectorDynamic = new Vector(dynamicX + this.offsetX, dynamicY + this.offsetY)
			const vectorStatic = new Vector(staticItem.x, staticItem.y)
			var angleRadians = Math.atan2(staticItem.y - vectorDynamic._y, staticItem.x - vectorDynamic._x);
			const particle = new Particle(
				vectorDynamic,
				vectorStatic,
				range(this.speedMin, this.speedMax),
				angleRadians, staticItem.rgba,
				index
			)
			particles.push(particle);
		} )
		this.bounds = bounds
		return particles
	}

	// clear() {
	// 	this.ctxCopyTo.clearRect(this.rect.x-10, this.rect.y-10, this.rect.w+20, this.rect.h+20);
	// }


	render() {
		// this.clear()
		this.particles.forEach( (p) =>{
			if(this.trans==='in') {
				p.update()
			}else{
				p.out()
			}

			this.ctxCopyTo.fillStyle = p.rgbaString
			this.ctxCopyTo.fillRect(p.positionDynamic._x, p.positionDynamic._y, 1, 1)
		} )
	}


	//*---------------------*
	// position
	//*---------------------*
	setXY(x, y) {
		this.offsetRectX(x)
		this.offsetRectY(y)
		this.offsetVector(x, y)
	}

	offsetRectX(x) {
		this.rect.x += x
		this.rect.w += x
	}

	offsetRectY(y) {
		this.rect.y += y
		this.rect.h += y
	}

	offsetVector(x, y) {
		// this.particles.map( (p) => {
		// 	const v = new Vector(x, y)
		// 	p.offset(v)
		// } )
	}

	setX(x) {
		this.offsetVector(x, 0)
	}

	setY(y) {
		this.offsetVector(0, y)
	}
	//*---------------------*
	// position
	//*---------------------*


}

export default Word