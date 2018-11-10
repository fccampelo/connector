import express from 'express';
import mongoose from 'mongoose';

import { keys } from './config/keys';

const app = express();

//conenct to MongoDB
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log('Conexão realizada com sucesso'))
  .catch((err) => console.log(err))

app.get('/', (req, res) => res.send('hello'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('o servido estar rodando na pota ' + port));

