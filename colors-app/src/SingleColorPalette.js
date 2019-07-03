import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles';
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
		const { classes } = this.props;
		const { paletteName, emoji, id } = this.props.palette;
		const _shades = this.gatherShades(this.props.palette, this.props.colorId)
		const colorBoxes = _shades.map(color => (
			<ColorBox key={uuid.v4()} name={color.name} background={color[format]} showFullPalette={false} />
		));
		return (
			<div className={classes.Palette}>
			<Navbar 
				handleChange={this.changeFormat} 
				isSingleColor={false}
				showingAllColors={false}
			/>
				
				<div className={classes.colors}>
				{colorBoxes}
				<div className={classes.goBack}>
					<Link to={`/palette/${id}`}>Go Back</Link>
				</div>
				</div>
				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
			
		)
	}
};

export default withStyles(styles)(SingleColorPalette);