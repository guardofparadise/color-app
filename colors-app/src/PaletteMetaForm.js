import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Picker } from "emoji-mart";
import 'emoji-mart/css/emoji-mart.css';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class PaletteMetaForm extends Component {

	state = {
		open: false,
		newPaletteName: "",
		stage: "name"
	};

	componentDidMount() {
		ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
			this.props.palettes.every(
				({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
			)
		);
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	}

	handleClose = () => {
		this.setState({ open: false });
	}

	showEmojiPicker = () => {
		this.setState({ stage: "emoji" })
	}

	savePaletteWithEmoji = (emoji) => {
		const newPalette = {
			paletteName: this.state.newPaletteName,
			emoji: emoji.native
		}
		this.props.savePalette(newPalette)
	}
	render() {
		const { open, newPaletteName, stage } = this.state;
		const { savePalette, classes } = this.props;
		return (
			<div>
				<Link className={classes.link} to="/">
					<Button className={classes.button} variant='contained' color='secondary'>
						Go Back
						</Button>
					</Link>
				<Button className={classes.button} variant="outlined" color="primary" onClick={this.handleClickOpen}>
					Open form dialog
				</Button>
				<Dialog open={stage === "emoji"}>
					<Picker onSelect={this.savePaletteWithEmoji} />
				</Dialog>
				<Dialog open={stage === "name" ? open : false} onClose={this.handleClose} aria-labelledby="form-dialog-title">
				<ValidatorForm onSubmit={this.showEmojiPicker}>
					<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
					<DialogContent>
						<DialogContentText>
							To subscribe to this website, please enter your email address here. We will send updates
							occasionally.
						</DialogContentText>
						
						<TextValidator 
								name="newPaletteName" 
								label="Palette Name" 
								onChange={this.handleChange} 
								value={newPaletteName} 
								fullWidth
								validators={["required", "isPaletteNameUnique"]}
								errorMessages={["Enter Palette name", "Palette Name Used"]}
							/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button
								variant="contained"
								color="primary"
								type="submit"
							>
								Save Palette
							</Button>
					</DialogActions>
					</ValidatorForm>
				</Dialog>
			</div>
		)
	}
}

export default PaletteMetaForm;