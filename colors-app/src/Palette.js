import React, { Component } from "react";
import ColorBox from "./ColorBox";
import uuid from 'uuid';
import Navbar from './Navbar';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteStyles';
import PaletteFooter from './PaletteFooter';

class Palette extends Component {

	state = {
		level: 500,
		format: 'hex'
	}

	changeLevel = (level) => {
		this.setState({ level })
	}

	changeFromat = (val) => {
		this.setState({ format: val })
	}

  render() {
		const { classes } = this.props;
		const { colors, paletteName, emoji, id } = this.props.palette;
		const { level, format } = this.state
		const colorBoxes = colors[level].map(color => (
			<ColorBox 
				background={color[format]} 
				name={color.name} 
				key={uuid.v4()} 
				id={color.id}
				paletteId={id}
				showFullPalette={true}
			/>
		));
		


    return (
      <div className={classes.Palette}>
				<Navbar handleChange={this.changeFromat} level={this.state.level} changeLevel={this.changeLevel} showingAllColors={true} />
				<div className={classes.colors}>
					{colorBoxes}
				</div>
				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
    );
  }
}
export default withStyles(styles)(Palette);
