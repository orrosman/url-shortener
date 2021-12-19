(() => {
	'use strict';
	document.getElementById('url-button').addEventListener('click', async () => {
		const t = document.getElementById('url-input').value,
			e = await (async function (t) {
				const e = JSON.stringify({ url: t }),
					n = await axios({
						method: 'PUT',
						url: 'http://localhost:3000/api/shorturl/',
						data: e,
						headers: { 'Content-Type': 'application/json' },
					});
				return n.data;
			})(t);
		var n;
		(n = e), console.log(n), (document.getElementById('push').innerText = n);
	});
})();
