import CleanData from '../songs/CleanData.js'

const globalOptions = {
	maxReadTime: 4,
	cssID: 'headline',
	speed: [10,15],
	origin: { x: 'centerX', y: 'centerY'},
	offset:{x:0, y:0},
	size: { w: document.body.offsetWidth, h: 100 },
}




const data = {
	globalOptions,

	words:[
		{text:'Peppercorn is a tiny library', 		playAt: '0',
			origin: {x:'left', y:'lock'}
		},

		{text:'that lets you write beautiful headlines', 		playAt: '3',
			origin: {x:'centerX', y:'top'}

		},

		{text:'composed of thousands of particles.', 		playAt: '6',
			origin: {x:'left', y:'lock'}
		},

		{text:'There are dozens of ways to express yourself.', 		playAt: '10',
			preset:'explode',
			naturalDeath: true
		},


		]
	}


data.words = CleanData(data.words)

export default data