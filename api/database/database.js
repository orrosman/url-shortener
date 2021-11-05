/** Manage the database **/
const fs = require('fs');
const { get } = require('http');
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
	while (isUrlIdExist(shortUrlId)) {
		shortUrlId = uuidv4();
	}

	const urlObject = {
		longUrl: longUrl,
		shortUrl: `${BASE_URL}/short/${shortUrlId}`,
		id: shortUrlId,
		redirects: 0,
		dateCreated: new Date().toUTCString(),
	};

	return urlObject;
}

function addUrlToDataBase(urlObject, email) {
	let data = getData();
	if (isUserExist(email)) {
		for (const user of data.users) {
			if (email === user.email) {
				user.urls.push(urlObject);
				fs.writeFileSync('./database/database.json', JSON.stringify(data));
			}
		}
	} else {
		data.guests.push(urlObject);
		fs.writeFileSync('./database/database.json', JSON.stringify(data));
	}
}

function isUrlIdExist(id) {
	const data = getData();
	//check in guests list
	for (const urlObj of data.guests) {
		if (id === urlObj.id) {
			return true;
		}
	}

	//check in users list
	for (const user of data.users) {
		for (const urlObj of user.urls) {
			if (id === urlObj.id) {
				return true;
			}
		}
	}

	return false;
}

function isUrlExist(longUrl, email) {
	const data = getData();

	if (email != 'guest') {
		const user = getUser(email);

		for (const urlObj of user.urls) {
			if (longUrl === urlObj.longUrl) {
				return urlObj;
			}
		}
	} else {
		for (const urlObj of data.guests) {
			if (longUrl === urlObj.longUrl) {
				return urlObj;
			}
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
		return email;
	}
}

function login(email, password) {
	const data = getData();

	for (const user of data.users) {
		if (email === user.email && password === user.password) {
			return email;
		}
	}
	return false;
}
function getUser(email) {
	const data = getData();
	for (const user of data.users) {
		if (email === user.email) {
			return user;
		}
	}
	return false;
}

function getLongUrl(id) {
	let data = getData();
	//check in guests
	for (const urlObj of data.guests) {
		if (id === urlObj.id) {
			urlObj.redirects++;
			fs.writeFileSync('./database/database.json', JSON.stringify(data));
			return urlObj.longUrl;
		}
	}

	//check in users
	for (const user of data.users) {
		for (const urlObj of user.urls) {
			if (id === urlObj.id) {
				urlObj.redirects++;
				fs.writeFileSync('./database/database.json', JSON.stringify(data));
				return urlObj.longUrl;
			}
		}
	}
	return false;
}
module.exports = {
	signUp,
	login,
	getUser,
	getData,
	isUrlIdExist,
	isUrlExist,
	buildUrlObject,
	addUrlToDataBase,
	getLongUrl,
};
