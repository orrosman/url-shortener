const express = require('express');
const router = express.Router();
const database = require('../database/database');
module.exports = router;

router.get('/:id', async (req, res, next) => {
	const id = req.params.id;
	const longUrl = getLongUrl(id);
	if (longUrl) {
		res.redirect(longUrl);
	} else {
		next(404);
	}
});

function getLongUrl(id) {
	let data = database.getData();

	for (const urlObj of data.urls) {
		if (id === urlObj.id) {
			return urlObj.longUrl;
		}
	}
	return false;
}
