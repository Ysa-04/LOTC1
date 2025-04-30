//database (mongodb)
import { Collection, MongoClient } from "mongodb";
import { UserAccount } from "./types";

const CONNECTION_STRING: string = "mongodb+srv://ysaura_va:d2pr0v6BMxfqh6cx@school.qkqtytv.mongodb.net/?retryWrites=true&w=majority&appName=School";
const client: MongoClient = new MongoClient(CONNECTION_STRING);

async function main(){
  try {

  }
  catch (e) {
    console.error(e);
  }
  finally {
    await client.close();
  }
}main();
