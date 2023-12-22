const path = require('path');
const express = require('express');
const serverConfig = require('./config/serverConfig');
require('dotenv').config();

const app = express();

const { PORT } = process.env || 4000;

serverConfig(app);
app.use(express.static(path.join(__dirname, '../client/build')));

const indexRouter = require('./routes/index.routes');

app.use('/', indexRouter);
app.get('*', (req, res) => res.sendFile(path.resolve('../client/build/index.html')));

app.listen(PORT, () => {
  console.log(`Наш прекрасный сервер трудиться на  ${PORT} порту`);
});