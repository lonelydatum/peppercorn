// Set your dreams where nobody hides
// Give your tears to the tide
// No time
// No time
// There's no end, there is no goodbye
// Disappear with night
// No time
// No time
// No time
// No time
// No time


import globalOptions from './globalOptions.js'
import CleanData from './CleanData.js'

const data = {
	globalOptions,
	videoID: 'lAwYodrBr2Q',
	words:[
		// {text:'STARDUST', 		playAt: '7',
		// 	preset:'explode',
		// 	speed: [1,10],
		// },
		{text:'Music by M83 - WAIT', 		playAt: '4',
			preset:'explode',
			speed: [4,10],
		},
		{text:'Particle Animation by Gar Liu', 		playAt: '16',
			origin: { x: 'centerX', y: 'top'},
			// offset:{x:100, y:-90},
		},
		{text:'Set', 		playAt: '29',
			preset:'explode',
		},
		{text:'your', 		playAt: '32',
			origin: { x: 'left', y: 'lock'},
			offset:{x:-100},
		},
		{text:'dreams', 	playAt: '35',
			origin: { x: 'left', y: 'lock'},
			offset:{x:-100},
		},
		{text:'where nobody hides', 	playAt: '36',
			origin: { x: 'left', y: 'lock'},
			offset:{x:-200},
		},
		{text:'give', 		playAt: '55',
			origin: { x: 'lock', y: 'top'},
			speed: [1,6],
			offset:{y:-100},
		},
		{text:'your', 		playAt: '57',
			origin: { x: 'lock', y: 'top'},
			speed: [1,6],
			offset:{y:-100},
		},
		{text:'tears to the tide', 	playAt: '1:02',
			origin: { x: 'lock', y: 'top'},
			speed: [1,6],
			offset:{y:-100},
		},
		{text:'No time', 	playAt: '1:23' },
		{text:'No time', 	playAt: '1:35' },
		{text:'There\'s', 	playAt: '2:13',
			preset:'explode',
		},
		{text:'no end', 	playAt: '2:16' },
		{text:'there is no goodbye', 	playAt: '2:21',
			origin: { x: 'lock', y: 'top'},
			offset:{y:-100},
			speed: [1, 5]
		},
		{text:'Disappear', 	playAt: '2:39',
			preset:'explode',
		},
		{text:'with night', 	playAt: '2:47' },
		{text:'No time', 	playAt: '3:06' },
		{text:'No time', 	playAt: '3:19',
			origin: { x: 'left', y: 'top'},
			offset:{x:-350, y:-50}

		},
		{text:'No time', 	playAt: '3:32',
			origin: { x: 'left', y: 'lock'},
			offset:{x:-300},
		},
		{text:'No time', 	playAt: '3:45' },
		{text:'No time', 	playAt: '3:58' },

		{text:'yeah it is long video', 	playAt: '4:30' },
		{text:'Thanks for watching :)', 	playAt: '4:50' },

	]

}

data.words = CleanData(data.words)



export default data

