import React, { Component } from 'react';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import Close from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import 'rc-slider/assets/index.css';
import './Navbar.css'

class Navbar extends Component {
	
	state = {
		format: 'hex',
		open: false
	}

	handleChange = (e) => {
		this.setState({ format: e.target.value, open: true });
		this.props.handleChange(e.target.value);
	}

	closeSnackbar = () => {
		this.setState({ open: false })
	}

	render() {
		const { format } = this.state
		const { level, changeLevel, showingAllColors } = this.props;
		return (
			<header className="Navbar">
				<div className="logo">
					<Link to="/">reactcolorcontrol</Link>
				</div>
				{ showingAllColors && (
				<div className="slider-container">
				<span>Level: {level}</span>
					<div className="slider">
						<Slider 
							defaultValue={this.props.level} 
							min={100} 
							max={900} 
							step={100}
							onAfterChange={changeLevel} />
					</div>
				</div>
				)}
				<div className="select-container">
					<Select value={this.state.format} onChange={this.handleChange}>
							<MenuItem value="hex">HEX - #ffffff</MenuItem>
							<MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
							<MenuItem value="rgba">RGBA - rgb(255,255,255,.1)</MenuItem>
					</Select>
				</div>
				<Snackbar 
					anchorOrigin={{vertical:'bottom', horizontal: 'left'}} 
					open={this.state.open} 
					autoHideDuration={3000}
					message={<span id="message-id">Format changed to {format}!</span>}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					onClose={this.closeSnackbar}
					action={[
						<IconButton>
							<Close onClick={this.closeSnackbar} color='inherit' key='close' aria-label='close' />
						</IconButton>
					]}
				/>
			</header>
		)
	}
}

export default Navbar;