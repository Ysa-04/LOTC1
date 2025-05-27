import { MongoClient, Collection } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const CONNECTION_STRING = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(CONNECTION_STRING);
const dbName = "lotr";
export let db: any;

export let usersCollection: Collection;
export let quotesCollection: Collection;
export let filmsCollection: Collection;
export let charactersCollection: Collection;

export async function connectToDb() {
  await client.connect();
  db = client.db(dbName);

  usersCollection = db.collection("users");
  quotesCollection = db.collection("quotes");
  filmsCollection = db.collection("films");
  charactersCollection = db.collection("characters");
}

export function getDb() {
  return db;
}