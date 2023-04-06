// imports
import { MongoClient } from "mongodb";
import "../loadEnvironment.js";


// get mongo client
const connectionString = process.env.MONGO || "";
const client = new MongoClient(connectionString);

// try connection
let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

// get databases
let MenuDb = conn.db(process.env.DBMENU);

export default MenuDb;