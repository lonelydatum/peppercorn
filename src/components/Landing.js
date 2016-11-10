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
			reset(){
				this.seconds = 0
				this.stop()
				this.tick()
			},
			tick() {
				this.interval = setInterval( () => {
					// console.log(this.seconds);
					this.seconds++
					this.seconds = (this.seconds > this.finalSecond+7) ? 0 : this.seconds++
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

		// console.log(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevState.show !== this.state.show){
			// console.log(this.state.show);
			if(this.state.show){
				this.counter.reset()
				this.loop()
			}else{
				this.counter.stop()
			}
		}

	}

	loop() {

		const word = this.wordManager.getWordByTime(this.counter.seconds)
		if(word) {
			// console.log(word.index);
			this.setState({pepercornIndex:word.index})
		}

		this.wordManager.render()

		if(this.counter.checkTicking() && this.state.show) {
			// console.log(Math.random());
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

  		// console.log(this.state.pepercornIndex);

  		const twitter = {text: 'Stardust lets you write beautiful headlines composed of thousands of particles. ', url:'http://stardust.lonelydatum.com'}
  		twitter.all = `http://twitter.com/share?text=${twitter.text}&url=${twitter.url}&hashtags=M83&via=lonelydatum`
  		const index = this.state.pepercornIndex
	  	return(
	  		<div id="landing">
	          <div className="landing-content" style={{display:showContent}}>

	              	<section>
	              		<div id="headline"></div>

		              	<p>
		              		<span className={classNames({'show':index>=0})}>Stardust lets you write beautiful headlines</span>&nbsp;
		              		<span className={classNames({'show':index>=1})}>composed of thousands of particles.</span>&nbsp;


		              	</p>
		              	<p>
		              		Here is a demo using a music video from M83 - "Wait".
		              	</p>
		              	<p>

		              	</p>

		              	<a href="" id="cta" onClick={this.closeLanding.bind(this)}>SEE M83 DEMO</a>


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
