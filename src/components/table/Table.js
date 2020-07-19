import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './tableTemplate';
import {resizeTable} from './resizeTable';
// import {$} from '@core/dom';

export class Table extends ExcelComponent {
	static className = 'excel__table'

	constructor($root) {
		super($root, {
			listeners: ['mousedown']
		});
	}

	toHTML() {
		return createTable(20);
	}

	onMousedown(event) {
		resizeTable(event);
	}
}