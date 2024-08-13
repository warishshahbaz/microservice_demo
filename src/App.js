import React, { useEffect, useState } from "react";
import "./App.css";
import SocketApp from "./socketApp";
import { IndexDB } from "./indexDB/indexDb";
import IndexApp from "./indexDB";
import ReactWindow from "./react-window";
import EditableTable from "./editCell";
// import Data from "remoteApp/Button";
const RemoteButton = React.lazy(() => import("remoteApp/App"));

function App() {
  const [options, setOpTions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState("");
  const [textInput, setTextinput] = useState("");
  const [userName, setUserName] = useState("");

  const fetchOption = () => {
    try {
      fetch("http://localhost:7000")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setOpTions(data?.data ?? []);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    let selected = e.target.value;
    setSelectedOptions(selected);
  };

  const sabmitHandler = async () => {
    let data = {
      username: userName,
      title: selectedOptions,
      message: textInput,
    };

    try {
      if (data) {
        let res = await fetch("http://localhost:7000/report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        console.log(res);
        alert(res.message);
      } else {
        alert("kindly pass body");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h2>Assig page</h2>
      <React.Suspense fallback="Loading Button...">
        <RemoteButton />
      </React.Suspense>
      {/* <div className="box">
        <label>Select Crime</label>
        <select onChange={handleChange}>
          {options &&
            options.map((option, i) => (
              <option className="option" key={i} value={option}>
                {option}
              </option>
            ))}
        </select>
      </div>

      <div className="box">
        <label>User Name</label>
        <input
          type="text"
          placeholder="user name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="box">
        <label>Message</label>
        <textarea
          placeholder="Message"
          onChange={(e) => setTextinput(e.target.value)}
          rows={5}
          cols={20}
          id="myText"
        ></textarea>
      </div>

      <button onClick={sabmitHandler}>Submit</button> */}
      {/* <SocketApp /> */}
      {/* <IndexApp /> */}
      {/* <ReactWindow /> */}
      <EditableTable />
    </div>
  );
}

export default App;
