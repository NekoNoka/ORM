const express = require('express');
const routes = require('./routes/index.js');

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(async () => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});