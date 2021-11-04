const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 8080;
const path = require('path');
const urlRouter = require('./routers/urlRouter.js');
const shortUrlRouter = require('./routers/shortUrlRouter.js');
const errorHandler = require('./middleware/errorHandler.js');

app.use(express.json());
app.use('/api/shorturl/', urlRouter);
app.use('/', shortUrlRouter);
app.get('/', function (req, res) {
	res.sendFile(path.resolve('./dist/index.html'));
});
app.use(errorHandler);

app.listen(process.env.PORT || port, function () {
	console.log('server running💨💨');
});
