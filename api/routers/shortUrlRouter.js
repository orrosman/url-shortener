const express = require('express');
const router = express.Router();
const database = require('../database/database');
module.exports = router;

router.get('/:id', async (req, res, next) => {
	const id = req.params.id;
	const longUrl = database.getLongUrl(id);

	if (longUrl) {
		res.redirect(longUrl);
	} else {
		next(404);
	}
});
