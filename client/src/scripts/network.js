const API_URL = 'http://localhost:3000';

export async function generateShortUrl(longUrl) {
	const data = JSON.stringify({
		url: longUrl,
		email: localStorage.getItem('current_user'),
	});
	const response = await axios({
		method: 'PUT',
		url: `${API_URL}/api/shorturl/`,
		data: data,
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.data;
}

export async function signUp(email, password) {
	const data = JSON.stringify({
		email: email,
		password: password,
	});
	const response = await axios({
		method: 'POST',
		url: `${API_URL}/api/shorturl/signUp`,
		data: data,
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.data;
}
export async function login(email, password) {
	const data = JSON.stringify({
		email: email,
		password: password,
	});
	const response = await axios({
		method: 'POST',
		url: `${API_URL}/api/shorturl/login`,
		data: data,
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.data;
}

export async function getUserStats(user) {
	const response = await axios({
		method: 'GET',
		url: `${API_URL}/api/shorturl/stats`,
		headers: {
			'Content-Type': 'application/json',
			user: user,
		},
	});
	return response.data;
}
