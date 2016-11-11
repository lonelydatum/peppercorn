import CleanData from '../songs/CleanData.js'

const globalOptions = {
	maxReadTime: 4,

	cssID: 'dummy-font-landing',
	speed: [4,25],
	origin: { x: 'centerX', y: 'centerY'},
	offset:{x:0, y:0},

}




const data = {



	globalOptions,

	setSize(){
		this.globalOptions.size = { w: document.body.offsetWidth, h: 100 }
	},

	words:[
		{text:`${'Write beautiful headlines'.toUpperCase()}`, 		playAt: '1',
			origin: {x:'left', y:'lock'}
		},


		{text:`${'composed of thousands of particles.'.toUpperCase()}`, 		playAt: '4',
			// origin: {x:'left', y:'lock'},
			preset:'explode',

		},

		// {text:'The animation is elegant', 		playAt: '6',
		// 	origin: {x:'left', y:'lock'}
		// },




		]
	}


data.words = CleanData(data.words)
data.setSize()


export default data