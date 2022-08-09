const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

var route = require('./routes/routing');


mongoose.connect('mongodb+srv://blogadmin:admin123@cluster0.melvstw.mongodb.net/Blog?retryWrites=true&w=majority')
.then(()=> console.log('DB is connected'));

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api', route);

const port = process.env.PORT || 5000;
app.listen(port, (req,res) => {
  console.log(`App is running at port ${port}`)
})
