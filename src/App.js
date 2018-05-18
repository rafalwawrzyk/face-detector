import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';

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

class App extends Component {
  constructor(){
    super();
    this.state = {
      input:''
    }
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value})
  }

  onSubmit = () => {
    console.log(this.state.input)
  }

	render() {
		return (
			<div className="App">
				<Particles params={particleOptions} className="particles" />
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
				{/* {
        
        <FaceRecognition />} */}
			</div>
		);
	}
}

export default App;
