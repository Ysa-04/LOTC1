import express from "express";
import ejs from "ejs";
import loginRouter from "./routers/loginRouter";
import registerRouter from "./routers/registerRouter";
import homeRouter from "./routers/homeRouter";
import tenRoundsRouter from "./routers/10-rounds";
import blacklistRouter from "./routers/blacklist";
import favoriteRouter from "./routers/favorite";
import highscoreRouter from "./routers/highscore";
import mistakesRouter from "./routers/mistakes";
import resultRouter from "./routers/result";
import suddendeathRouter from "./routers/suddendeath";
import indexRouter from "./routers";
import error404Router from "./routers/404";


const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

//Routers
app.use("/login", loginRouter());
app.use("/register", registerRouter());
app.use("/home", homeRouter());
app.use("/10-rounds", tenRoundsRouter());
app.use("/blacklist", blacklistRouter());
app.use("/favorite", favoriteRouter());
app.use("/highscore", highscoreRouter());
app.use("/mistakes", mistakesRouter());
app.use("/result", resultRouter());
app.use("/suddendeath", suddendeathRouter());
app.use("/", indexRouter());
app.use("/404", error404Router());

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

