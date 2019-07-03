import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withStyles } from '@material-ui/styles';
import styles from './styles/ColorBoxStyles';

class ColorBox extends Component {

	state = {
		copied: false
	}

	changeCopyState = () => {
		this.setState({ copied: true },() => {
			setTimeout(() => this.setState({ copied: false }), 1500);
		})
	}

	render() {
		const { copied } = this.state;
		const { name, background, paletteId, id, showFullPalette, classes } = this.props;
		return (
			<CopyToClipboard text={background} onCopy={this.changeCopyState}>
				<div style={{ background: background }} className={classes.ColorBox}>
				<div style={{ background: background }} className={`${classes.copyOverlay} ${copied && classes.showOverlay}`} ></div>
				<div  className={`${classes.copyMessage} ${copied && classes.showMessage}`}>
					<h1>Copied!</h1>
					<p className={classes.copyText}>{background}</p>
				</div>
					<div>
						<div className={classes.boxContent}>
							<span className={classes.colorName}>
								{name}
							</span>
						</div>
						<button className={classes.copyButton}>Copy</button>
					</div>
					{showFullPalette && (
					<Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
						<span className={classes.seeMore}>More</span>
					</Link>						
					)}
				</div>
			</CopyToClipboard>
		)
	}
}

export default withStyles(styles)(ColorBox);