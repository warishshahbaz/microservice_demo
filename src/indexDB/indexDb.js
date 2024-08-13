import React, { useEffect } from "react";

export const IndexDB = () => {
  /**********************************iNDEX DB ******************************** */

  let idb =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;

  const createCollectionInIndexDB = async () => {
    let db;
    if (!idb) {
      console.log("createCollectionInIndexDB");
      return;
    }
    const request = idb.open("test_db", 2);

    request.onerror = (event) => {
      console.error("Failed to create database", event.target.error);
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;

      const objectStore = db.createObjectStore("test_store", {
        keyPath: "id",
        autoIncrement: true,
      });
      objectStore.createIndex("name", "name", { unique: false });
      objectStore.createIndex("email", "email", { unique: true });
      console.log("Database created");
    };

    request.onsuccess = (event) => {
      const db = request.result;

      addData(db);
      getData(db);
    };
  };

  const addData = (db) => {
    const transaction = db.transaction(["test_store"], "readwrite");
    transaction.oncomplete = (event) => {
      console.log("Transaction completed");
    };
    transaction.onerror = (event) => {
      console.log("Transaction error", event.target.error);
    };
    const objectStore = transaction.objectStore("test_store");
    objectStore.add({ id: 4, name: "Mark", email: "shah@gmail.com" });
    objectStore.add({ id: 5, name: "warish", email: "warish@gmail.com" });
    console.log("Data inserted successfully");
  };

  function getData(db) {
    const transaction = db.transaction(["test_store"]);
    const objectStore = transaction.objectStore("test_store");

    const request = objectStore.getAll(); // Retrieves all records

    request.onerror = function (event) {
      console.error("Unable to retrieve data from database!");
    };

    request.onsuccess = function (event) {
      if (request.result) {
        console.log("Data retrieved:", request.result);
      } else {
        console.log("No data found in the database!");
      }
    };
  }

  useEffect(() => {
    createCollectionInIndexDB();
    // fetchOption();
  }, []);
  return <div>IndexDB</div>;
};
