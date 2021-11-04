const express = require('express');
const router = express.Router();
const axios = require('axios');
const validator = require('validator');
const database = require('../database/database.js');
const path = require('path');
module.exports = router;

router.put('/', (req, res, next) => {
	let longUrl = req.body.url;

	if (validator.isURL(longUrl)) {
		longUrl = checkProtocol(longUrl);
		let urlObj = database.isUrlExist(longUrl);

		if (urlObj) {
			res.send(urlObj.shortUrl);
		} else {
			urlObj = database.buildUrlObject(longUrl);
			database.addToDataBase(urlObj);
			res.send(urlObj.shortUrl);
		}
	} else {
		next(400);
	}
});

function checkProtocol(url) {
	const hasProtocol = validator.isURL(url, { require_protocol: true });

	if (hasProtocol) {
		return url;
	} else {
		return `http://${url}`;
	}
}
