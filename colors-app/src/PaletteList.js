import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { Link } from 'react-router-dom';

class PaletteList extends Component {
	render() {
		const { palettes } = this.props;
		return (
			<div>
				<MiniPalette />
				{palettes.map((palette) =>(
					<Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
				))}
			</div>
		)
	}
}

export default PaletteList;