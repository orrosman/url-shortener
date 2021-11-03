const express = require('express');
const router = express.Router();
const axios = require('axios');
const validUrl = require('valid-url');
const database = require('../database/database.js');
const path = require('path');
module.exports = router;

router.put('/', (req, res) => {
	try {
		const longUrl = req.body.url;
		if (!longUrl) {
			throw { code: 400, msg: 'No URL was provided' };
		}
		if (!validUrl.isUri(longUrl)) {
			throw { code: 400, msg: 'The URL that was provided is not valid' };
		}

		let urlObj = database.isUrlExist(longUrl);
		if (urlObj) {
			res.send(urlObj.shortUrl);
		} else {
			urlObj = database.buildUrlObject(longUrl);
			database.addToDataBase(urlObj);
			res.send(urlObj.shortUrl);
		}
	} catch (error) {
		next(error);
	}
});
