import React, { Component } from "react";
import ColorBox from "./ColorBox";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles";
import './Palette.css'
import uuid from 'uuid';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class Palette extends Component {

	state = {
		level: 500
	}

	changeLevel = (level) => {
		this.setState({ level })
	}

  render() {

		const colorBoxes = this.props.palette.colors[this.state.level].map(color => (
			<ColorBox background={color.hex} name={color.name} key={uuid.v4()} />
		));
		


    return (
      <div className="Palette">
				<div className="slider">
					<Slider 
						defaultValue={this.state.level} 
						min={100} 
						max={900} 
						step={100}
						onAfterChange={this.changeLevel} />
				</div>
				<div className="Palette-colors">
					{colorBoxes}
				</div>
				
			</div>
    );
  }
}
export default withStyles(styles)(Palette);
