const express = require('express');
const router = express.Router();
const axios = require('axios');
const validator = require('validator');
const database = require('../database/database.js');
const path = require('path');
module.exports = router;

router.post('/signUp', (req, res) => {
	const { email, password } = req.body;
	const hasSucceeded = database.signUp(email, password);
	res.send(hasSucceeded);
});

router.post('/login', (req, res) => {
	const { email, password } = req.body;
	const hasSucceeded = database.login(email, password);
	res.send(hasSucceeded);
});

router.put('/', (req, res, next) => {
	let longUrl = req.body.url;
	const email = req.body.email;

	if (validator.isURL(longUrl)) {
		longUrl = checkProtocol(longUrl);
		let urlObj = database.isUrlExist(longUrl, email);

		if (urlObj) {
			res.send(urlObj.shortUrl);
		} else {
			urlObj = database.buildUrlObject(longUrl);
			database.addUrlToDataBase(urlObj, email);
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
