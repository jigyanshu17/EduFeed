const express = require('express');
require('dotenv').config();
const router = require('./routes/route');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./DB/connection.js');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
  origin: [process.env.CLIENT_URL],
  credentials: true,  // Allow cookies to be sent with the request
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

// Call connectDB function to establish connection
connectDB().then(() => {
    app.listen(process.env.PORT, () => console.log('Server running successfully'));
});

