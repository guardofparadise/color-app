import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import uuid from 'uuid';
import DraggableColorBox from "./DraggableColorBox";

function DraggableColorList({ colors, removeColor }) {
	return (
		<div style={{height: "100%"}}>
			{colors.map((color, i) => (
				<DraggableColorBox 
					index={i}
					key={uuid.v4()} 
					color={color.color} 
					name={color.name} 
					handleClick={() => removeColor(color.name)} />
			))}
		</div>
	)
}

export default SortableContainer(DraggableColorList);