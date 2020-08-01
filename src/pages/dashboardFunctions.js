function toHTML(key, index) {
	return `
		<li class="db__record">
			<a href="#${getHref(key)}">${index + 1}. ${getTitle(key)}</a>
			<strong>${createDate(key)}</strong>
		</li>
	`;
}

function getAllkeys() {
	const keys = [];
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (!key.startsWith('excel')) {
			continue;
		}
		keys.push(key);
	}

	return keys;
}

function getTitle(key) {
	return JSON.parse(localStorage.getItem(key)).title;
}

function getHref(key) {
	return `${key.split(': ')[0]}/${key.split(': ')[1]}`;
}

function createDate(key) {
	// const date = new Date(JSON.parse(localStorage.getItem(key)).date);

	const date = new Date(JSON.parse(localStorage.getItem(key)).openedDate);

	return new Date(date).toLocaleString();
}

export function createRecordsTable() {
	const keys = getAllkeys();

	if (!keys.length) {
		return `
			<p>ВЫ пока не создали ни одной таблицы</p>
		`;
	}

	return `
		<div class="db__list-header">
			<span>Название</span>
			<span>Дата открытия</span>
		</div>

		<ul class="db__list">
			${keys.map(toHTML).join('')}
		</ul>
	`;
}