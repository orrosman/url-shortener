const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
module.exports = router;

const BASE_URL = 'localhost:8080';

router.put('/', (req, res) => {
	const longUrl = req.body.url;
	const urlObj = buildUrlObject(longUrl);

	res.send(urlObj.shortUrl);
});

function buildUrlObject(longUrl) {
	const shortUrlId = uuidv4();

	const urlObject = {
		longUrl: longUrl,
		shortUrl: `${BASE_URL}/${shortUrlId}`,
		id: shortUrlId,
	};

	return urlObject;
}
