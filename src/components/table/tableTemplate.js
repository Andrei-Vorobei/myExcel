const CODES = {
	A: 65,
	Z: 90
};
// const rows = [];

function toCell(_, col) {
	return `
		<div class="cell" contenteditable data-col="${col}"></div>
	`;
}

function toColumn(col, index) {
	return `
		<div class="column" data-type="resizable" data-col="${index}">
			${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`;
}

function createRow(content, rowIndex = '') {
	const resizer = rowIndex ? `data-resize="row"` : '';
	const resizable = rowIndex ? `data-type="resizable"` : '';
	return `
		<div class="row" ${resizable}>
			<div class="row-info">
				${rowIndex}
				<div class="row-resize" ${resizer}></div>
			</div>
			<div class="row-data">${content}</div>
		</div>
	`;
}

function toChar(_, index) {
	return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];

	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(toColumn)
		.join('');

	rows.push(createRow(cols));

	for (let i = 0; i < rowsCount; i++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(toCell)
			.join('');

		rows.push(createRow(cells, i + 1));
	}

	return rows.join('');
}