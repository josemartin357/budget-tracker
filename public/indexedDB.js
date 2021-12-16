let database;

const request = indexedDB.open("transaction", 1);

request.onupgradeneeded = (event) => {
  let db = event.target.result;
  db.createObjectStore("pending", {
    autoincrement: true,
  });
};

// onsuccess

// request on error

// write function saveRecord

// create function so when back online, all those transactions on indexedDB are sent to the database
