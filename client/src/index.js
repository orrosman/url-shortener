import * as network from './scripts/network.js';

const urlButton = document.getElementById('url-button');

urlButton.addEventListener('click', async () => {
	const urlInput = document.getElementById('url-input');

	const longUrl = urlInput.value;
	const shortUrl = await network.generateShortUrl(longUrl);
	showUrl(shortUrl);
});

function showUrl(url) {
	const div = document.getElementById('url-answer');
	div.innerText = url;
}
