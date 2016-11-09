class Rect {
	constructor(x, y, w, h) {
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.left = this.x
		this.top = this.y
		this.getMiddlePos()
	}

	getMiddlePos() {
		const diffX = this.w
		const diffXMid = diffX * .5

		const diffY = this.h
		const diffYMid = diffY * .5

		this.centerX = Math.floor(this.x + diffXMid)
		this.centerY = Math.floor(this.y + diffYMid)
		this.bottom = this.y + this.h
		this.right = this.x + this.w
	}

	inBoundsX(x) {
		return (x>this.x && x<this.right)
	}

	setXY(x, y) {
		this.x = x
		this.y = y
		this.getMiddlePos()
	}

}


export default Rect

