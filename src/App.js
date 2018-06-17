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

const initialState = {
	input: '',
	faces: null,
	imgUrl:'',
	route:'home',
	isSignedIn:false,
	user: {
		id:'',
		name:'',
		   email:'',
		entries:0,
		joined: new Date()

	}
};
class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}


	// componentDidMount(){
	// 	fetch('http://localhost:4000')
	// 	.then(response => response.json())
	// 	.then(data => console.log(data))
	// }


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

	onPictureSubmit = () => {
		this.setState({imgUrl:this.state.input})
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
		.then((response) => {
			if(response){
				fetch('http://localhost:4000/image',{
					method:'put',
					headers:{'Content-Type':'application/json'},
					body:JSON.stringify({
						id:this.state.user.id
					})
				}).then(response => response.json())
				  .then(entries => {
						this.setState({
							user:{
								...this.state.user,
								entries:entries
								
							}
						})
				  } )
				  .catch(console.log)
			}
			this.displayFaceBox(this.calcFaceLocation(response))
		})
		.catch(err => console.log('error',err));
	};

	onRouteChange = (route)=> {
		if(route === 'signout'){
			this.setState({
				initialState
			})
		}else if(route === 'home'){
			this.setState({isSignedIn:true})
		}
			this.setState({route:route})
	}

	loadUser = (data) => {
		this.setState({
			user:{
				id:data.id,
        		name:data.name,
       			email:data.email,
        		entries:data.entries,
        		joined: data.joined
			}
		})
	}

	render() {
		const {isSignedIn,imgUrl,faces,box,route,user} = this.state;
		return (
			<div className="App">
				<Particles params={particleOptions} className="particles" />
				<Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
				{ route === 'home'
				? <div>
					<Rank name={this.state.user.name} entries={this.state.user.entries}/>
					<ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
					<FaceRecognition imageUrl={imgUrl} faces={faces} calcFaceLocation={this.calcFaceLocation} box={box} />
			  	  </div> 
				: (route === 'signin') 
					? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
					: <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
				 
				
				}
			</div>
		);
	}
}

export default App;
