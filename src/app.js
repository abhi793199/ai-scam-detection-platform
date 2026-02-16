const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
const reportRoutes = require('./routes/report.routes');
app.use('/api/reports', reportRoutes);


module.exports = app;
