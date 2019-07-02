import React, { Component } from 'react';
import './ColorBox.css';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
		const { name, background, paletteId, id, showLink } = this.props;
		return (
			<CopyToClipboard text={background} onCopy={this.changeCopyState}>
				<div style={{ background: background }} className="ColorBox">
				<div style={{ background: background }} className={`copy-overlay ${this.state.copied ? "show" : ""}`} ></div>
				<div  className={`copy-msg ${this.state.copied ? "show" : ""}`}>
					<h1>Copied!</h1>
					<p>{background}</p>
				</div>
					<div className="copy-container">
						<div className="box-content">
							<span>
								{name}
							</span>
						</div>
						<button className="copy-button">Copy</button>
					</div>
					{showLink && (
					<Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
						<span className="see-more">More</span>
					</Link>						
					)}
				</div>
			</CopyToClipboard>
		)
	}
}

export default ColorBox;