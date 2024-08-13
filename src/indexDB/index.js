import React, { useEffect, useState } from "react";
import {
  openDB,
  addData,
  getData,
  updateData,
  deleteData,
} from "./indexServices";

function IndexApp() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    openDB()
      .then(() => fetchData())
      .catch((error) => console.error(error));
  }, []);

  const fetchData = () => {
    getData().then((data) => setItems(data));
  };

  const handleAddOrUpdate = () => {
    const item = { name, age: parseInt(age) };

    if (editId) {
      item.id = editId;
      updateData(item)
        .then(() => {
          fetchData();
          resetForm();
        })
        .catch((error) => console.error(error));
    } else {
      addData(item)
        .then(() => {
          fetchData();
          resetForm();
        })
        .catch((error) => console.error(error));
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setAge(item.age);
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    deleteData(id)
      .then(() => fetchData())
      .catch((error) => console.error(error));
  };

  const resetForm = () => {
    setName("");
    setAge("");
    setEditId(null);
  };

  return (
    <div>
      <h1>IndexedDB CRUD App</h1>

      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
        />
        <button onClick={handleAddOrUpdate}>{editId ? "Update" : "Add"}</button>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} ({item.age})
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IndexApp;
