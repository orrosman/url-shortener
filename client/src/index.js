import * as network from './scripts/network';

const urlButton = document.getElementById('url-button');
console.log(urlButton);

document.addEventListener('click', () => {
	console.log('click');
});

async function getUrl() {
	console.log('click');
	const urlInput = document.getElementById('url-input');

	const longUrl = urlInput.value;
	const shortUrl = await network.generateShortUrl(longUrl);
	alert(shortUrl);
}
