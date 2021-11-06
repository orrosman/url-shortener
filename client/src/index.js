import * as network from './scripts/network.js';

const urlButton = document.getElementById('url-button');
const shortUrlCard = document.getElementById('short-url-card');
const copyUrlButton = document.getElementById('copy-button');
const signupButton = document.getElementById('signup-button');
const loginButton = document.getElementById('login-button');
const statsButton = document.getElementById('stats-nav-link');

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

signupButton.addEventListener('click', async () => {
	const email = document.getElementById('email-signup').value;
	const password = document.getElementById('password-signup').value;

	const hasSucceeded = await network.signUp(email, password);
	if (hasSucceeded) {
		login(hasSucceeded);
	} else {
		console.log(hasSucceeded);
	}
});

statsButton.addEventListener('click', async () => {
	const user = localStorage.getItem('current_user');
	const data = await network.getUserStats(user);
	const dataTable = newStatsTable(data);

	const modalBody = document
		.getElementById('stats-modal')
		.querySelector('.modal-body');
	modalBody.appendChild(dataTable);
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

function newStatsTable(data) {
	if (data) {
		//build table
		const statsTable = document.createElement('table');
		statsTable.setAttribute('class', 'table table-striped table-responsive');
		const titles = document.createElement('thead');

		const numberInTable = document.createElement('th');
		numberInTable.setAttribute('scope', 'col');
		numberInTable.innerText = '#';
		titles.appendChild(numberInTable);

		const longInTable = document.createElement('th');
		longInTable.setAttribute('scope', 'col');
		longInTable.innerText = 'Original URL';
		titles.appendChild(longInTable);

		const shortInTable = document.createElement('th');
		shortInTable.setAttribute('scope', 'col');
		shortInTable.innerText = 'Short URL';
		titles.appendChild(shortInTable);

		const redirectsInTable = document.createElement('th');
		redirectsInTable.setAttribute('scope', 'col');
		redirectsInTable.innerText = '# of redirects';
		titles.appendChild(redirectsInTable);

		const dateInTable = document.createElement('th');
		dateInTable.setAttribute('scope', 'col');
		dateInTable.innerText = 'Date created';
		titles.appendChild(dateInTable);

		statsTable.appendChild(titles);

		const tableBody = document.createElement('tbody');

		for (let i = 0; i < data.length; i++) {
			const newUrlRow = createUrlRow(data[i], i + 1);
			tableBody.appendChild(newUrlRow);
		}
		statsTable.appendChild(tableBody);
		return statsTable;
	}
}

function createUrlRow(urlObj, index) {
	const newUrlRow = document.createElement('tr');
	const indexRow = document.createElement('th');
	indexRow.setAttribute('scope', 'row');
	indexRow.innerText = index;
	newUrlRow.appendChild(indexRow);

	for (const key of Object.keys(urlObj)) {
		if (key === 'id') {
			continue;
		} else {
			const newRowData = document.createElement('td');
			newRowData.setAttribute('class', 'text-truncate');
			newRowData.innerText = urlObj[key];
			newUrlRow.appendChild(newRowData);
		}
	}
	return newUrlRow;
}
