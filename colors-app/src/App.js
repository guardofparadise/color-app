import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom'
import Palette from "./Palette";
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';
import SingleColorPalette from './SingleColorPalette';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Page from './Page';



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
			<Route render={({location}) => (
				<TransitionGroup>
					<CSSTransition classNames='page' timeout={500} key={location.key}>
						<Switch location={location}>
							<Route exact path="/palette/new" render={(renderProps) => 
								<Page>
									<NewPaletteForm 
										savePalette={this.savePalette} 
										{...renderProps} 
										palettes={this.state.palettes} />
								</Page>} />
							<Route exact path="/" render={(routeProps) => 
								<Page>
									<PaletteList 
										deletePalette={this.deletePalette} 
										palettes={this.state.palettes} 
										{...routeProps} />
								</Page>} />
							<Route exact path="/palette/:id" render={routeProps => ( <Page><Palette
								palette={generatePalette(
									this.findPalette(routeProps.match.params.id)
								)} /></Page>)} />
							<Route exact path="/palette/:paletteId/:colorId" 
								render={(routeProps) => ( <Page><SingleColorPalette
									colorId={routeProps.match.params.colorId}
									palette={generatePalette(
										this.findPalette(routeProps.match.params.paletteId)
									)} /></Page> )} />
							<Route render={(routeProps) => 
								<Page>
									<PaletteList 
										deletePalette={this.deletePalette} 
										palettes={this.state.palettes} 
										{...routeProps} />
								</Page>} />
						</Switch>		
					</CSSTransition>
				</TransitionGroup>
			)} />

		 )
  }
}

export default App;
