import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import bodyParser from "body-parser";

//config
import { keys } from "./config/keys";
import passportConfig from "./config/passaport";

//route
import users from "./routes/api/user.route";
import profile from "./routes/api/profile.route";

const app = express();

// Body parse midleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//conenct to MongoDB
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("Conexão realizada com sucesso"))
  .catch(err => console.log(err));

//Passport middlewere;
app.use(passport.initialize());

//Passaport Config
passportConfig(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("o servido estar rodando na pota " + port));
