import express from "express";
import ejs from "ejs";
import path from "path";
import mainRoutes from "./routes/mainRoutes";


const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

app.use("/", mainRoutes);

app.listen(app.get("port"), () =>
  console.log("[server] http://localhost:" + app.get("port"))
);

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

