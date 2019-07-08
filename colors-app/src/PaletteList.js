import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close'
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {

	state = {
		openDialog: false,
		deleteId: ""
	}

	toggleDialog = (id) => {
		this.setState((state) => ({
			openDialog: !state.openDialog,
			deleteId: id
		}))
	}

	handleDelete = () => {
		this.props.deletePalette(this.state.deleteId);
		this.setState((state) => ({
			openDialog: !state.openDialog,
			deleteId: ""
		}))
	}

	goToPalette = (id) => {
		console.log(id)
		this.props.history.push(`/palette/${id}`)
	}

	render() {
		const { palettes,classes } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1>React Colors</h1>
						<Link to="/palette/new">New Palette</Link>
					</nav>
					<TransitionGroup className={classes.palettes}>
						{palettes.map((palette) =>(
							<CSSTransition key={palette.id} classNames="fade" timeout={300}>
								<Link key={palette.id} to={`/palette/${palette.id}`}>
									<MiniPalette 
										//deletePalette={this.props.deletePalette} 
										deletePalette={this.toggleDialog}
										{...palette} 
										handleClick={this.goToPalette}
										key={palette.id}
										id={palette.id}
									/>							
								</Link>
							</CSSTransition>
						))}		
							
					</TransitionGroup>			
				</div>
				<Dialog open={this.state.openDialog} onClose={this.toggleDialog}>
						<DialogTitle>Delete this palette</DialogTitle>
						<List>
							<ListItem button onClick={this.handleDelete}>
								<ListItemAvatar>
									<Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
										<Check />
									</Avatar>
								</ListItemAvatar>
								<ListItemText>Delete</ListItemText>
							</ListItem>
							<ListItem button onClick={this.toggleDialog}>
								<ListItemAvatar>
									<Avatar style={{backgroundColor: red[100], color: red[600]}}>
										<Close />
									</Avatar>
								</ListItemAvatar>
								<ListItemText>Cancel</ListItemText>
							</ListItem>
						</List>
				</Dialog>
			</div>
		)
	}
}

export default withStyles(styles)(PaletteList);