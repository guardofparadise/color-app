import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
	main: {
		backgroundColor: "purple",
		border: "3px solid teal"
	}
}

function MiniPalette(props) {
	const { classes } = props;
	console.log(classes)
	return (
		<div className={classes.main}>
			<h2>Mini</h2>
		</div>
	)
}

export default withStyles(styles)(MiniPalette);