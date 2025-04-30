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


