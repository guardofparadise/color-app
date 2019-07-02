import React, { Component } from "react";
import ColorBox from "./ColorBox";
import './Palette.css'
import uuid from 'uuid';
import Navbar from './Navbar';
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
		const { colors, paletteName, emoji, id } = this.props.palette;
		const { level, format } = this.state
		const colorBoxes = colors[level].map(color => (
			<ColorBox 
				background={color[format]} 
				name={color.name} 
				key={uuid.v4()} 
				id={color.id}
				paletteId={id}
				showLink={true}
			/>
		));
		


    return (
      <div className="Palette">
				<Navbar handleChange={this.changeFromat} level={this.state.level} changeLevel={this.changeLevel} showingAllColors={true} />
				<div className="Palette-colors">
					{colorBoxes}
				</div>
				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
    );
  }
}
export default Palette;
