import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from "@material-ui/icons/Delete";

class MiniPalette extends PureComponent {

	delete = (e) => {
		e.stopPropagation();
		e.preventDefault();
		this.props.deletePalette(this.props.id)
	}

	render() {

		const { classes, paletteName, emoji, colors, deletePalette, handleClick, id } = this.props;
		console.log("RENDERING: ", paletteName);
		console.log(this.props)
		const miniColorBoxes = colors.map(color => (
			<div 
				className={classes.miniColor} 
				style={{backgroundColor: color.color}} 
				key={color.name}
			/>
		))

		return (
			<div className={classes.root} onClick={() => handleClick(id)}>
			<div className={classes.delete}>
				<DeleteIcon 
					style={{transition: "all .3s ease"}} 
					className={classes.deleteIcon} 
					onClick={this.delete}
					/>
			</div>
				<div className={classes.colors}>
					{miniColorBoxes}
				</div>
				<h5 className={classes.title}>
					{paletteName} <span className={classes.emoji}>{emoji}</span>
				</h5>
			</div>
		)
	}
}

export default withStyles(styles)(MiniPalette);