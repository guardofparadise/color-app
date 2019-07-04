import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorPickerFormStyles';


class ColorPickerForm extends Component {

	state = {
		currentColor: 'teal',
		newName: "",
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	addNewColor = () => {
		const newColor = {
			color: this.state.currentColor,
			name: this.state.newName
		}
		this.props.addNewColor(newColor);
		this.setState({ newName: '' })
	}

	updateCurrentColor = (newColor) => {
		this.setState({ currentColor: newColor.hex})
	}


	render() {
		const { paletteIsFull, classes } = this.props;
		return (
			<div>
				<ChromePicker 
						color={this.state.currentColor} 
						className={classes.picker}
						onChangeComplete={this.updateCurrentColor} />
					<ValidatorForm 
						ref='form'
						instantValidate={false}
						onSubmit={this.addNewColor}
					>
						<TextValidator 
							value={this.state.newName}
							className={classes.colorNameInput}
							margin="normal"
							name="newName"
							onChange={this.handleChange}
							validators={["required", "isColorUnique", "isColorNameUnique"]}
							errorMessages={["enter color name", "Color already exists", "Color name should be unique"]}
						/>
						<Button 
							variant='contained' 
							className={classes.addColor}
							color='primary' 
							type="submit"
							style={{background: paletteIsFull ? "grey" : this.state.currentColor}}
							disabled={paletteIsFull}
						>
							{paletteIsFull ? 'Palette Full' : 'Add Color'}
					</Button>	
					</ValidatorForm>
			</div>
		)
	}
}

export default withStyles(styles)(ColorPickerForm);