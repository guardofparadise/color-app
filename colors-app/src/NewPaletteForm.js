import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import PaletteFormNav from './PaletteFormNav';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ValidatorForm } from "react-material-ui-form-validator";
import ColorPickerForm from './ColorPickerForm';
import { arrayMove } from "react-sortable-hoc";
import DraggableColorList from './DraggableColorList';
import styles from './styles/NewPaletteFormStyles';

 const drawerWidth = 400;


 class NewPaletteForm extends Component {	
	static defaultProps = {
		maxColors: 20
	}

  state = {
		open: true,
		colors: this.props.palettes[0].colors,
		
	};
	
	componentDidMount() {
		ValidatorForm.addValidationRule('isColorNameUnique', value => 
			this.state.colors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			)
		);

		ValidatorForm.addValidationRule('isColorUnique', value => 
			this.state.colors.every(
				({ color }) => color !== this.state.currentColor
			)
		);

	}

   handleDrawerOpen = () => {
    this.setState({ open: true });
  };

   handleDrawerClose = () => {
    this.setState({ open: false });
	};
	
	addNewColor = (newColor) => {
		this.setState({colors: [...this.state.colors, newColor], newName: ''})
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	savePalette = (newPaletteName) => {
		newPaletteName.id = newPaletteName.paletteName.toLowerCase().replace(/ /g, "-");
		newPaletteName.colors = this.state.colors;
		
		this.props.savePalette(newPaletteName);
		this.props.history.push('/');
	}

	removeColor = (colorName) => {
		this.setState({ colors: this.state.colors.filter(color => color.name !== colorName)})
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({colors}) => ({
			colors: arrayMove(colors, oldIndex, newIndex),
		}))
	}

	clearColors = () => {
		this.setState({ colors: [] })
	}

	addRandomColor = () => {
		const allColors = this.props.palettes.map(p => p.colors).flat();
		let rand = Math.floor(Math.random() * allColors.length);
		const randomColor = allColors[rand];
		this.setState({ colors: [...this.state.colors, randomColor]})
		console.log(allColors);
	}

   render() {	  
    const { classes, maxColors, palettes } = this.props;
		const { open, colors } = this.state;
		const paletteIsFull = colors.length >= maxColors;

     return (	 
			<div className={classes.root}>
			<PaletteFormNav 
				handleDrawerOpen={this.handleDrawerOpen} 
				savePalette={this.savePalette} 
				palettes={palettes} 
				open={open} 
			/>
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
					<Divider />
					<div>
						<Typography variant="h4">Design your palette</Typography>
						<div className={classes.buttons}>
							<Button 
								variant='contained' 
								color='secondary'
								className={classes.button}
								onClick={this.clearColors}
								>
								Clear Palette
							</Button>
							<Button 
								variant='contained' 
								color='primary'
								className={classes.button}
								onClick={this.addRandomColor}
								disabled={paletteIsFull}
								>Random Color</Button>						
						</div>
					</div>

					<ColorPickerForm addNewColor={this.addNewColor} paletteIsFull={paletteIsFull} />
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
					
					<DraggableColorList 
						axis="xy" 
						colors={this.state.colors} 
						removeColor={this.removeColor} 
						onSortEnd={this.onSortEnd}
					/>
					
        </main>
      </div>	     
    );	    
  }	  
}	

export default withStyles(styles, { withTheme: true })(NewPaletteForm);