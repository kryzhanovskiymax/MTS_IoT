const express = require('express');
const app = express();

app.use(express.json({ extended: true }));
app.use('/api/test', require('./server/api.js'));