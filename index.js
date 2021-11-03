const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 8080;
const path = require('path');
const urlRouter = require('./api/routers/urlRouter');
const shortUrlRouter = require('./api/routers/shortUrlRouter');

app.use(express.json());
app.use('/api/shorturl/', urlRouter);
app.use('/', shortUrlRouter);

app.listen(process.env.PORT || port, function () {
	console.log('server running💨💨');
});
