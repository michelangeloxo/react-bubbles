import React, { useState } from "react";
import axiosWithAuth from '../utilities/axiosWithAuth';
import AddColor from "./AddColor";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [friendsList, setFriendsList] = useState([]);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();

    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log(res.data);
      axiosWithAuth().get('http://localhost:5000/api/colors')
      .then(res => {updateColors(res.data);
  })
  .catch(err => console.log(err.response));
      // this.colors.history.push('/');
    })
    .catch(err => console.log(err.response));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => {
      console.log(res.data);
      axiosWithAuth().get('http://localhost:5000/api/colors')
      .then(res => {updateColors(res.data);
  })
  .catch(err => console.log(err.response));
    
    })
    .catch(err => console.log(err.response));
  
  };

  const addColor = huh => {
    axiosWithAuth().post('http://localhost:5000/api/colors', huh)
    .then(res => setFriendsList(res.data))
    .catch(err => console.log(err.response));
}

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      

      
<AddColor addColor={addColor} />
{/* // {friendsList.map( => {return <div key={huh.id}>{huh.name}</div>
// })} */}


     
    </div>
  );
};

export default ColorList;
