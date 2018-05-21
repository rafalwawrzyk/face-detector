import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'


const particleOptions = {
	particles: {
		number: {
			value: 104,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
};

const app = new Clarifai.App({
	apiKey: 'f837c7ad845a4510ae631f2090cf4a89'
});

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			faces: null,
			imgUrl:'',
			route:'home',
			isSignedIn:false
		};
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	calcFaceLocation = (data) => {
		const image = document.getElementById('inputImage')
		const width = Number(image.width)
		const height = Number(image.height) 
		const newArr = data.outputs[0].data.regions.map(region => {
			return{
				leftCol:region.region_info.bounding_box.left_col * width,
				topRow: region.region_info.bounding_box.top_row * height,
				rightCol:width - (region.region_info.bounding_box.right_col * width),
				bottomRow: height - (region.region_info.bounding_box.bottom_row * height)
			} 
		})
		return newArr
	}

	displayFaceBox = (box) => {
		this.setState({box:box})
	} 

	onButtonSubmit = () => {
		this.setState({imgUrl:this.state.input})
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
		.then((response) => this.displayFaceBox(this.calcFaceLocation(response)))
		.catch(err => console.log('error',err));
	};

	onRouteChange = (route)=> {
		if(route === 'signout'){
			this.setState({isSignedIn: false})
		}else if(route === 'home'){
			this.setState({isSignedIn:true})
		}
			this.setState({route:route})
	}

	render() {
		const {isSignedIn,imgUrl,faces,box,route} = this.state;
		return (
			<div className="App">
				<Particles params={particleOptions} className="particles" />
				<Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>

				{ route === 'home'
				? <div>
					<Rank />
					<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
					<FaceRecognition imageUrl={imgUrl} faces={faces} calcFaceLocation={this.calcFaceLocation} box={box} />
			  	  </div> 
				: (route === 'signin') 
					? <SignIn onRouteChange={this.onRouteChange}/>
					: <Register onRouteChange={this.onRouteChange}/>
				 
				
				}
			</div>
		);
	}
}

export default App;
