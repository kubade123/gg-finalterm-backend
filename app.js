const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');

const app = express();
app.use(cors());

module.exports = { express, app };
