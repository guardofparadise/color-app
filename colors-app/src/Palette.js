import React, { Component } from "react";
import ColorBox from "./ColorBox";
import './Palette.css'
import uuid from 'uuid';
import Navbar from './Navbar';
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
		const { colors, paletteName, emoji } = this.props.palette;
		const { level, format } = this.state
		const colorBoxes = colors[level].map(color => (
			<ColorBox background={color[format]} name={color.name} key={uuid.v4()} />
		));
		


    return (
      <div className="Palette">
				<Navbar handleChange={this.changeFromat} level={this.state.level} changeLevel={this.changeLevel} />
				<div className="Palette-colors">
					{colorBoxes}
				</div>
				<footer className="Palette-footer">
					{paletteName}
					<span className="emoji">{emoji}</span>
				</footer>
			</div>
    );
  }
}
export default Palette;
