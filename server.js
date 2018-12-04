import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

//config
import { keys } from "./config/keys";

//route
import users from "./routes/api/user.route";

const app = express();

// Body parse midleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//conenct to MongoDB
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("Conexão realizada com sucesso"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hello"));

// Use Routes
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("o servido estar rodando na pota " + port));
