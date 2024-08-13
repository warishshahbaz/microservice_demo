// src/indexedDBService.js

const DB_NAME = "MyDatabase";
const DB_VERSION = 1;
const STORE_NAME = "MyObjectStore";

let db;

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      reject("Database error: " + event.target.error);
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      const objectStore = db.createObjectStore(STORE_NAME, {
        keyPath: "id",
        autoIncrement: true,
      });
      objectStore.createIndex("name", "name", { unique: false });
      objectStore.createIndex("age", "age", { unique: false });
    };
  });
}

export function addData(data) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.add(data);

    request.onsuccess = () => {
      resolve("Data added successfully!");
    };

    request.onerror = (event) => {
      reject("Error adding data: " + event.target.error);
    };
  });
}

export function getData() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject("Error retrieving data: " + event.target.error);
    };
  });
}

export function updateData(data) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.put(data);

    request.onsuccess = () => {
      resolve("Data updated successfully!");
    };

    request.onerror = (event) => {
      reject("Error updating data: " + event.target.error);
    };
  });
}

export function deleteData(id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.delete(id);

    request.onsuccess = () => {
      resolve("Data deleted successfully!");
    };

    request.onerror = (event) => {
      reject("Error deleting data: " + event.target.error);
    };
  });
}
