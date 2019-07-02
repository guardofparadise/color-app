import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom';
import uuid from 'uuid';

class SingleColorPalette extends Component {

	state = {
		format: "hex"
	}

	gatherShades = (palette, colorFilter) => {
		let shades = [];
		let allColors = palette.colors;

		for(let key in allColors) {
			shades = shades.concat(
				allColors[key].filter(color => color.id === colorFilter)
			)
		}
		return shades.slice(1);
	}

	changeFormat = (val) => {
		this.setState({ format: val })
	}

	render() {
		const { format } = this.state;
		const { paletteName, emoji, id } = this.props.palette;
		const _shades = this.gatherShades(this.props.palette, this.props.colorId)
		const colorBoxes = _shades.map(color => (
			<ColorBox key={uuid.v4()} name={color.name} background={color[format]} showLink={false} />
		));
		return (
			<div className='SingleColorPalette Palette'>
			<Navbar 
				handleChange={this.changeFormat} 
				isSingleColor={false}
				showingAllColors={false}
			/>
				
				<div className='Palette-colors'>
				{colorBoxes}
				<div className="go-back ColorBox">
					<Link className="back-button" to={`/palette/${id}`}>Go Back</Link>
				</div>
				</div>
				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
			
		)
	}
};

export default SingleColorPalette;