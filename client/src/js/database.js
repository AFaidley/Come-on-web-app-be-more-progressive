import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('PUT from DB');

  // Create connection to DB
  const jateDB = await openDB('jate', 1);

  // Create new transaction and state the DB and data privileges
  const tx = jateDB.transaction('jate', 'readwrite');

  // Open objectstore
  const store = tx.objectStore('jate');

  // Update
  const request = store.put({ jate: content });

  // Confirm req
  const result = await request;
  console.log('Data has been saved in the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('GET from DB');

  // Create connection to DB
  const jateDB = await openDB("jate", 1);

// Create new transaction and state the DB and data privileges
  const tx = jateDB.transaction("jate", "readonly");

  // Open objectstore
  const store = tx.objectStore("jate");

  // Get all data
  const request = store.getAll();

  // Confirm req
  const result = await request;
  console.log(result);
};

initdb();
