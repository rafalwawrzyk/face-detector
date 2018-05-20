import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

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
			imgUrl:''
		};
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	calcFaceLocation = (data) => {
		const boxSize = data.outputs[0].data.regions[0].region_info.bounding_box
		console.log(boxSize)
		const image = document.getElementById('inputImage')
		const width = Number(image.width)
		const height = Number(image.height)
		return {
			leftCol: boxSize.left_col * width,
			topRow: boxSize.top_row * height,
			rightCol:width - (boxSize.right_col * width),
			bottomRow: height - (boxSize.bottom_row * height)
		}
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

	render() {
		return (
			<div className="App">
				<Particles params={particleOptions} className="particles" />
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
				<FaceRecognition imageUrl={this.state.imgUrl} faces={this.state.faces} calcFaceLocation={this.calcFaceLocation} box={this.state.box} />
			</div>
		);
	}
}

export default App;
