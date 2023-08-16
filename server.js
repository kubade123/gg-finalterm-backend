require('dotenv').config();
const mongoose = require('mongoose');

const { app, express } = require('./app');
const routes = require('./src/routes/routes');

// connecting to MongoDB
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});
database.once('connected', () => {
  console.log('Database Connected');
});

app.use(express.json());
app.use('/', routes);

const port = process.env.PORT;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at port ${port}`);
});
