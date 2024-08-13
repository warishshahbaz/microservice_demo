import React, { useState } from "react";

const initialData = [
  { id: 1, name: "John Doe", age: 28 },
  { id: 2, name: "Jane Smith", age: 34 },
  { id: 3, name: "Alice Johnson", age: 29 },
];

function EditableTable() {
  const [data, setData] = useState(initialData);
  const [editIdx, setEditIdx] = useState(null);
  const [editField, setEditField] = useState({
    rowIdx: null,
    field: "",
    value: "",
  });

  // Handle when a cell is clicked to be edited
  const handleEdit = (rowIdx, field) => {
    console.log(data[rowIdx], field);
    setEditIdx(rowIdx);
    setEditField({ rowIdx, field, value: data[rowIdx][field] });
  };

  // Handle when the input value changes
  const handleChange = (e) => {
    setEditField({ ...editField, value: e.target.value });
  };

  // Handle when the user submits the new value
  const handleSave = () => {
    const updatedData = [...data];
    updatedData[editField.rowIdx][editField.field] = editField.value;
    setData(updatedData);
    setEditIdx(null); // Exit edit mode
  };

  // Handle canceling the edit
  const handleCancel = () => {
    setEditIdx(null); // Exit edit mode without saving
  };

  return (
    <table border="1" cellPadding="5" cellSpacing="0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIdx) => (
          <tr key={row.id}>
            <td>
              {editIdx === rowIdx && editField.field === "name" ? (
                <input
                  type="text"
                  value={editField.value}
                  onChange={handleChange}
                  onBlur={handleSave}
                  autoFocus
                />
              ) : (
                <span onClick={() => handleEdit(rowIdx, "name")}>
                  {row.name}
                </span>
              )}
            </td>
            <td>
              {editIdx === rowIdx && editField.field === "age" ? (
                <input
                  type="number"
                  value={editField.value}
                  onChange={handleChange}
                  onBlur={handleSave}
                  autoFocus
                />
              ) : (
                <span onClick={() => handleEdit(rowIdx, "age")}>{row.age}</span>
              )}
            </td>
            <td>
              {editIdx === rowIdx ? (
                <>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <button onClick={() => setEditIdx(rowIdx)}>Edit</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EditableTable;
