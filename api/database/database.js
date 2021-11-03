/** Manage the database **/
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const BASE_URL = 'localhost:8080';

function getData() {
	const data = fs.readFileSync('./api/database/database.json');
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
		shortUrl: `${BASE_URL}/${shortUrlId}`,
		id: shortUrlId,
	};

	return urlObject;
}

function addToDataBase(urlObject) {
	let dbData = getData();
	console.log(dbData);

	dbData.urls.push(urlObject);
	fs.writeFileSync('./api/database/database.json', JSON.stringify(dbData));
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
