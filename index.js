const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 8080;
const path = require('path');

app.use('/', () => {
	console.log('hi');
});

app.listen(process.env.PORT || port, function () {
	console.log('server running💨💨');
});
