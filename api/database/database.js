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
function isUserExist(email) {
	const data = getData();
	for (const user of data.users) {
		if (email === user.email) {
			return true;
		}
	}
	return false;
}

function createUser(email, password) {
	const user = {
		email: email,
		password: password,
		urls: [],
	};
	return user;
}

function signUp(email, password) {
	if (isUserExist(email)) {
		return false;
	} else {
		const newUser = createUser(email, password);
		let data = getData();

		data.users.push(newUser);
		fs.writeFileSync('./database/database.json', JSON.stringify(data));
		return true;
	}
}

module.exports = {
	getData,
	isIdExist,
	isUrlExist,
	buildUrlObject,
	addToDataBase,
	signUp,
};
