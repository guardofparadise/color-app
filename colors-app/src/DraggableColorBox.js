import React from 'react';
import { SortableElement } from "react-sortable-hoc";
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/DraggableColorBoxStyles';

function DraggableColorBox(props) {
	const { classes } = props;
	return (
		<div 
			className={classes.root} 
			style={{ background: props.color }}>
			<div className={classes.boxContent}>
				<span>{props.name}</span>
				<DeleteIcon onClick={props.handleClick} className={classes.deleteIcon} />
			</div>
		</div>
	)
}

export default withStyles(styles)(SortableElement(DraggableColorBox));