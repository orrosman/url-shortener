import * as network from './scripts/network.js';

const urlButton = document.getElementById('url-button');
const shortUrlCard = document.getElementById('short-url-card');
const copyUrlButton = document.getElementById('copy-button');
const signupButton = document.getElementById('signup-button');
const loginButton = document.getElementById('login-button');

urlButton.addEventListener('click', async () => {
	event.preventDefault();
	const urlInput = document.getElementById('url-input');

	const longUrl = urlInput.value;
	const shortUrl = await network.generateShortUrl(longUrl);
	showUrl(shortUrl);
});

copyUrlButton.addEventListener('click', async () => {
	const url = document.getElementById('short-url-link').innerText;
	copyUrl(url);
});

signupButton.addEventListener('click', async () => {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	const hasSucceeded = await network.signUp(email, password);
	if (hasSucceeded) {
		login(hasSucceeded);
	} else {
		console.log(hasSucceeded);
	}
});
loginButton.addEventListener('click', async () => {
	const email = document.getElementById('email-login').value;
	const password = document.getElementById('password-login').value;

	const hasSucceeded = await network.login(email, password);
	if (hasSucceeded) {
		login(hasSucceeded);
	} else {
		console.log(hasSucceeded);
	}
});

function showUrl(url) {
	const cardVisibility = shortUrlCard.classList;
	const link = document.getElementById('short-url-link');

	link.setAttribute('href', url);
	link.innerText = url;

	if (!cardVisibility.contains('d-flex')) {
		cardVisibility.replace('d-none', 'd-flex'); //change card visibility
	}
}

async function copyUrl(url) {
	navigator.clipboard.writeText(url);
}

function login(email) {
	localStorage.setItem('current_user', email);
}
