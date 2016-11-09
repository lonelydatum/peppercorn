import React, { Component } from 'react';
import './Landing.css'

class Landing extends Component {

	constructor() {
		super()
		this.state = {show: true}
	}

	seeDemo() {
		this.setState({show: false})
	}

	openLanding() {
		this.setState({show: true})
	}

  	render() {
  		const showContent = this.state.show ? 'flex' : 'none'
  		const showButton = this.state.show ? 'none' : 'block'
  		console.log(showButton);
	  	return(
	  		<div id="landing">
	          <div className="landing-content" style={{display:showContent}}>

	              	<section>
		              	<h1>
		                	MUSIC + TYPOGRAPHY <span>... and of course</span> MOTION
		              	</h1>
		                <p>
		                  The need to express is very important to me so whenever I find little nooks and cranny that give me these opportunities I leave no rock unturned. I created this project to explore the possiblities of combining music videos with typography. The proces involoved a lot of what ifs
		                  What if the typography was composed of thousands of particles that move from A to B or B to A
		                  From there it was just exploring all the comibinations of these positions in order to compliment the artists music video.
		              	</p>

		              	<p>
		          			The idea is simple, to superimpose the lyrics of songs on top of music videos using particles to create the lyrics. As I got deeper into the particles I realized how expressive it was. Moving a dot from A - B can consist of so many possibilities such as coming in from the TOP, RIGHT, BOTTOM, with so many combinations I was definitely curious to play with as many combinations. One dot moving is not too impressive but thousands moving together is really beautiful.
		          		</p>
		          		<p>
		          			To see what I mean take a look at this video of M83 - Wait.
		          		</p>
		              	<a href="#" id="cta" onClick={this.seeDemo.bind(this)}>SEE M83 DEMO</a>


		              	<div id="social">
					        <a className="twitter-share-button"
					          href="http://twitter.com/share?text=Waste your playing Arcade Dental&url=http://game.lonelydatum.com/dental&hashtags=phaserjs&via=lonelydatum"
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
	          	className="landing-button"
	          	onClick={this.openLanding.bind(this)}
	          	style={{display:showButton}}
	          >
	          	OPEN
	          </div>
	        </div>


	  		)
  	}

}

export default Landing