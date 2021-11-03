const express = require('express');
const router = express.Router();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const validUrl = require('valid-url');
const fs = require('fs');
const path = require('path');
module.exports = router;

const BASE_URL = 'localhost:8080';

router.put('/', (req, res) => {
	try {
		const longUrl = req.body.url;
		if (!longUrl) {
			throw { code: 400, msg: 'No URL was provided' };
		}
		if (!validUrl.isUri(longUrl)) {
			throw { code: 400, msg: 'The URL that was provided is not valid' };
		}
		const urlObj = buildUrlObject(longUrl);
		addToDataBase(urlObj);
		res.send(urlObj.shortUrl);
	} catch {
		next(error);
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const longUrl = await getLongUrl(id);
	return res.redirect(longUrl);
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

function getDataFromDatabase() {
	const data = fs.readFileSync('./api/database.json');
	return JSON.parse(data);
}

async function addToDataBase(urlObject) {
	let dbData = await getDataFromDatabase();

	dbData.urls.push(urlObject);
	fs.writeFileSync('./api/database.json', JSON.stringify(dbData));
}

function getLongUrl(id) {
	let data = getDataFromDatabase();

	for (const urlObj of data.urls) {
		if (id === urlObj.id) {
			return urlObj.longUrl;
		}
	}
}
