// src/App.js

import React from "react";
import { FixedSizeList as List } from "react-window";

// Generate a list of 10,000 items
const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`);

// Define a row component that will be rendered for each item
const Row = ({ index, style }) => {
  console.log(index, style);
  return <div style={style}>{items[index]}</div>;
};

function ReactWindow() {
  return (
    <div style={{ margin: "50px" }}>
      <h1>Large List with react-window</h1>
      {/* Render the list using FixedSizeList */}
      <List
        height={400} // Height of the window
        itemCount={items.length} // Total number of items
        itemSize={25} // Height of each item in the list
        width={400} // Width of the window
      >
        {Row}
      </List>
    </div>
  );
}

export default ReactWindow;
