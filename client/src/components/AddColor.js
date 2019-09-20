import React, { useState } from 'react';

const AddColor = ({ addColor }) => {
const [newColor, setNewColor] = useState({colorname:"", hexcode:""});
const handleChange = event => {
    setNewColor({...newColor, [event.target.name]: event.target.value});
};

const handleSubmit = event => {
    event.preventDefault();
    addColor(newColor);
    };
    
return (
<form onSubmit={handleSubmit}>
<input name='colorname' placeholder="colorname" value={newColor.colorname} onChange={handleChange} />
<input name='hexcode' placeholder="hexcode" value={newColor.hexcode} onChange={handleChange} />
<button type='submit'>Add Color</button>
</form>
);
};

export default AddColor; 