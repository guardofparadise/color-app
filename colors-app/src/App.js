import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom'
import Palette from "./Palette";
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';
import SingleColorPalette from './SingleColorPalette';


class App extends Component {

	constructor(props) {
		super(props);
		const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
		this.state = {
			palettes: savedPalettes || seedColors,
		}
	}

	findPalette = id => this.state.palettes.find((palette) => palette.id === id);
	
	savePalette = (newPalette) => {
		this.setState({ palettes: [ ...this.state.palettes, newPalette ]}, this.syncLocalStorage);
	}

	syncLocalStorage = () => {
		window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
	}

	deletePalette = (id) => {
		this.setState(st => ({ palettes: st.palettes.filter(palette => palette.id !== id) }),
		this.syncLocalStorage
		);
		
	}

  render() {
		
    return (
			<Switch>
				<Route exact path="/palette/new" render={(renderProps) => <NewPaletteForm savePalette={this.savePalette} {...renderProps} palettes={this.state.palettes} />} />
				<Route exact path="/" render={(routeProps) => <PaletteList deletePalette={this.deletePalette} palettes={this.state.palettes} {...routeProps} />} />
				<Route exact path="/palette/:id" render={routeProps => ( <Palette
					palette={generatePalette(
						this.findPalette(routeProps.match.params.id)
					)} />)} />
				<Route exact path="/palette/:paletteId/:colorId" 
					render={(routeProps) => ( <SingleColorPalette
						colorId={routeProps.match.params.colorId}
						palette={generatePalette(
							this.findPalette(routeProps.match.params.paletteId)
						)} /> )} />
			</Switch>
		 )
  }
}

export default App;
