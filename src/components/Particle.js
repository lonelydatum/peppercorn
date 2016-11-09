import Vector from './Vector.js'


class Particle {
	constructor(vectorDynamic, vectorStatic, speed, direction, rgba={r:0,g:0,b:0,a:1}, index=0) {

		this.rgba = rgba
		// this.rgbaString = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
		this.rgbaString = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
		this.index = index
		this.positionDynamic = vectorDynamic
		this.positionStatic = vectorStatic
		this.velocity = new Vector(0, 0)
		this.velocity.setLength(speed)
		this.velocity.setAngle(direction)
		this.dirX = {prev:null, curr:null}
		this.dirY = {prev:null, curr:null}
		this.playX = true
		this.playY = true




	}



	checkToMove() {
		this.checkToMoveX()
	}

	checkToMoveX() {
		this.dirX.prev = this.dirX.curr
		const gapX = this.positionDynamic._x - this.positionStatic._x
		if(gapX===0){
			this.dirX.curr = 0
		}else if(gapX>0) {
			this.dirX.curr = 1
		}else if(gapX<0) {
			this.dirX.curr = -1
		}

		const firstTimeX = this.dirX.prev === null
		const hasReachedX = (this.dirX.curr !== this.dirX.prev)

		if((!firstTimeX && hasReachedX) || (gapX === 0)){
			this.playX = false
		}

		this.dirY.prev = this.dirY.curr
		const gapY = this.positionDynamic._y - this.positionStatic._y
		if(gapY===0){
			this.dirY.curr = 0
		}else if(gapY>0) {
			this.dirY.curr = 1
		}else if(gapY<0) {
			this.dirY.curr = -1
		}

		const firstTimeY = this.dirY.prev === null
		const hasReachedY = (this.dirY.curr !== this.dirY.prev)

		if((!firstTimeY && hasReachedY) || (gapY === 0)){
			this.playY = false
		}
	}

	getRandomColor() {
	    var letters = '0123456789ABCDEF';
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}

	update() {

		this.checkToMove()
		this.positionDynamic.addTo(this.velocity);


		if(this.playX || this.playY) {
			// console.log(this.playX, this.playY);
		}else{
			this.positionDynamic._y = this.positionStatic._y
			this.positionDynamic._x = this.positionStatic._x
		}
	}

	out() {
		// this.checkToMove()
		this.positionDynamic.subtractFrom(this.velocity);


		// if(this.playX || this.playY) {
		// 	// console.log(this.playX, this.playY);
		// }else{
		// 	this.positionDynamic._y = this.positionStatic._y
		// 	this.positionDynamic._x = this.positionStatic._x
		// }
	}

	// offset(vectorOffset) {
	// 	this.positionDynamic.addTo(vectorOffset);
	// 	this.positionStatic.addTo(vectorOffset);
	// }

	// absXY(v) {
	// 	this.positionDynamic.addTo(vectorOffset);
	// 	this.positionStatic.addTo(vectorOffset);
	// }




}


export default Particle