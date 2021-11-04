/** Manage the database **/
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const BASE_URL = 'http://localhost:3000';

function getData() {
	const data = fs.readFileSync('./database/database.json');
	return JSON.parse(data);
}

function buildUrlObject(longUrl) {
	const shortUrlId = uuidv4();

	//generate new id if id already exist
	while (isIdExist(shortUrlId)) {
		shortUrlId = uuidv4();
	}

	const urlObject = {
		longUrl: longUrl,
		shortUrl: `${BASE_URL}/short/${shortUrlId}`,
		id: shortUrlId,
	};

	return urlObject;
}

function addToDataBase(urlObject) {
	let dbData = getData();

	dbData.urls.push(urlObject);
	fs.writeFileSync('./database/database.json', JSON.stringify(dbData));
}

function isIdExist(id) {
	const data = getData();
	for (const urlObj of data.urls) {
		if (id === urlObj.id) {
			return true;
		}
	}
	return false;
}

function isUrlExist(longUrl) {
	const data = getData();
	for (const urlObj of data.urls) {
		if (longUrl === urlObj.longUrl) {
			return urlObj;
		}
	}
	return false;
}

module.exports = {
	getData,
	isIdExist,
	isUrlExist,
	buildUrlObject,
	addToDataBase,
};
