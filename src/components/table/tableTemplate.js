import { toInlineStyles } from '@core/utils';
import {defaultStyles} from '@/constants';
import { parse } from '@core/parse';

const CODES = {
	A: 65,
	Z: 90
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
	// return !state ? DEFAULT_WIDTH + 'px' :
	return (state[index] || DEFAULT_WIDTH) + 'px';
}

function toCell(row, state) {
	return function({index, width}) {
		const id = `${row}:${index}`;
		const data = state.dataState[id];
		const styles = toInlineStyles({
			...defaultStyles,
			...state.stylesState[id]});
		return `
			<div
				class="cell"
				contenteditable
				data-col="${index}"
				data-id="${id}"
				data-value="${data || ''}"
				style=" width: ${width}; ${styles};"
				>${parse(data) || ''}
			</div>
		`;
	};
}

function toColumn({col, index, width}) {
	return `
		<div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
			${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`;
}

function getHeight(rowIndex, state) {
	// return !state.rowState ? DEFAULT_HEIGHT + 'px' :
	return rowIndex ? (state.rowState[rowIndex] || DEFAULT_HEIGHT) + 'px' : '';
}

function createRow(content, rowIndex = '', state = {}) {
	const height = getHeight(rowIndex, state);

	const resizer = rowIndex ? `<div class="row-resize" data-resize="row"></div>` : '';
	const resizable = rowIndex ? `data-type="resizable"` : '';

	return `
		<div class="row" ${resizable} data-row="${rowIndex}" style="height: ${height}">
			<div class="row-info">
				${rowIndex}
				${resizer}
			</div>
			<div class="row-data">${content}</div>
		</div>
	`;
}

function toChar(_, index) {
	return String.fromCharCode(CODES.A + index);
}

function withWidthFrom(state) {
	return function(col, index) {
		return {
			col, index, width: getWidth(state.colState, index)
		};
	};
}

export function createTable(rowsCount = 15, state = {}) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];

	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(withWidthFrom(state))
		.map(toColumn)
		.join('');

	rows.push(createRow(cols));

	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(withWidthFrom(state))
			.map(toCell(row, state))
			.join('');

		rows.push(createRow(cells, row + 1, state));
	}

	return rows.join('');
}