const express = require('express');
const error = require('./middleware/error');
const router=require('./Routes/productroute')
const app = express();

app.use(express.json());
app.use('/api/v1',router);
 

// err middleware
app.use(error);

module.exports = app;