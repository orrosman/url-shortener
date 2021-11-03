module.exports = errorHandler;

function errorHandler(error, res) {
	console.log('in');
	switch (error) {
		case 400:
			res.status(400);
			res.send('No URL was provided / The URL that was provided is not valid');
			break;

		case 404:
			res.status(404);
			res.send('The URL provided was not found');
			break;

		default:
			res.status(500);
			res.send('Server error, please try again later');
			break;
	}
}
