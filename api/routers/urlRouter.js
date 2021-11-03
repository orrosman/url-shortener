const express = require('express');
const router = express.Router();
const axios = require('axios');
const validator = require('validator');
const database = require('../database/database.js');
const path = require('path');
module.exports = router;

router.put('/', (req, res, next) => {
	const longUrl = req.body.url;

	if (validator.isURL(longUrl)) {
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
