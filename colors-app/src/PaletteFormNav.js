import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles';
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";


class PaletteFormNav extends Component {
	state = {
		newPaletteName: ""
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

	

	render() {
		const { open, classes, savePalette } = this.props;
		const { newPaletteName } = this.state;
		return (
			<div>
<CssBaseline />
        <AppBar
					color="default"
          position='fixed'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.props.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              Persistent drawer
            </Typography>
          </Toolbar>
					<PaletteMetaForm classes={classes} savePalette={savePalette} />
        </AppBar>
			</div>
		)
	}
}

export default withStyles(styles)(PaletteFormNav);