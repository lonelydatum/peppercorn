import React, { Component } from 'react';
import './Landing.css'
import WordManager from './WordManager.js'
import LandingData from './LandingData.js'

var classNames = require('classnames');



class Landing extends Component {

	constructor() {
		super()
		this.state = {show: true, pepercornIndex:-1}

		this.counter = {
			finalSecond: LandingData.words[LandingData.words.length-1].seconds,
			seconds: 0,
			interval: null,
			checkTicking() {
				const result = this.seconds < this.finalSecond + 10
				if(!result) {
					this.stop()
				}

				return result
			},
			tick() {
				this.interval = setInterval( () => {
					// console.log(this.seconds);
					this.seconds++
					// this.seconds = (this.seconds > 30) ? 0 : this.seconds++
				}, 1000 )
			},

			stop() {
				clearInterval(this.interval)
			}
		}
	}

	componentDidMount() {
		// console.log(document.getElementById('headline'));
		this.wordManager = new WordManager(LandingData, 'headline')

		this.counter.tick()
		this.loop()

		console.log(this);
	}

	loop() {

		const word = this.wordManager.getWordByTime(this.counter.seconds)
		if(word) {
			console.log(word.index);
			this.setState({pepercornIndex:word.index})
		}

		this.wordManager.render()

		if(this.counter.checkTicking()) {
			requestAnimationFrame(this.loop.bind(this))
		}

	}

	closeLanding() {
		this.props.landingClose()
		this.setState({show: false})
	}

	openLanding() {
		this.props.landingOpen()
		this.setState({show: true})
	}

  	render() {
  		const showContent = this.state.show ? 'flex' : 'none'

  		const showButton = {
  			display:this.state.show ? 'none' : 'block'
  		}

  		console.log(this.state.pepercornIndex);

  		const twitter = {text: 'A music video M83-Wait with lyrics', url:'http://peppercorn.lonelydatum.com'}
  		twitter.all = `http://twitter.com/share?text=${twitter.text}&url=${twitter.url}&hashtags=M83&via=lonelydatum`
  		const index = this.state.pepercornIndex
	  	return(
	  		<div id="landing">
	          <div className="landing-content" style={{display:showContent}}>

	              	<section>
	              		<div id="headline"></div>

		              	<p>
		              		<span className={classNames({'show':index>=0})}>Peppercorn is a tiny library</span>&nbsp;
		              		<span className={classNames({'show':index>=1})}>that lets you write beautiful headlines</span>&nbsp;
		              		<span className={classNames({'show':index>=2})}>composed of thousands of particles.</span>&nbsp;
		              		<span className={classNames({'show':index>=3})}>There are dozens of ways to express your ideas.</span>
		              	</p>
		              	<p>
		              		Peppercorn is not just for steaks, it can be used for banners, microsites and even music videos. To demonstrate, I chose the a music video from M83 - "Wait", in order to animate the lyrics.
		              	</p>
		              	<p>

		              	</p>

		              	<a href="#" id="cta" onClick={this.closeLanding.bind(this)}>SEE M83 DEMO</a>


		              	<div id="social">
					        <a className="twitter-share-button"
					          href={twitter.all}
					          target="_blank"
					        >
					          <i className="fa fa-twitter" aria-hidden="true"></i>
					        </a>


					       <div id="shareBtn">
					          <i className="fa fa-facebook" aria-hidden="true"></i>
					        </div>
					    </div>


	              	</section>

	          </div>
	          <div
	          	className={classNames('landing-button', 'butt-on')}
	          	onClick={this.openLanding.bind(this)}
	          	style={showButton}
	          >
	          	OPEN
	          </div>
	        </div>


	  		)
  	}

}

export default Landing


// <p>
// 		                  The need to express is very important to me so whenever I find little nooks and cranny that give me these opportunities I leave no rock unturned. I created this project to explore the possiblities of combining music videos with typography. The proces involoved a lot of what ifs
// 		                  What if the typography was composed of thousands of particles that move from A to B or B to A
// 		                  From there it was just exploring all the comibinations of these positions in order to compliment the artists music video.
// 		              	</p>

// 		              	<p>
// 		          			The idea is simple, to superimpose the lyrics of songs on top of music videos using particles to create the lyrics. As I got deeper into the particles I realized how expressive it was. Moving a dot from A - B can consist of so many possibilities such as coming in from the TOP, RIGHT, BOTTOM, with so many combinations I was definitely curious to play with as many combinations. One dot moving is not too impressive but thousands moving together is really beautiful.
// 		          		</p>
// 		          		<p>
// 		          			To see what I mean take a look at this video of M83 - Wait.
// 		          		</p>