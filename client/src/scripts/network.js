const API_URL = 'localhost:8080';

export async function generateShortUrl(longUrl) {
	const data = JSON.stringify({
		url: longUrl,
	});

	let config = {
		method: 'put',
		url: `${API_URL}/api/shorturl/`,
		headers: {
			'Content-Type': 'application/json',
		},
		data: data,
	};

	axios(config)
		.then((response) => {
			console.log(JSON.stringify(response.data));
		})
		.catch((error) => {
			console.log(error);
		});
}
