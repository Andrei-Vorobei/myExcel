import { Page } from '@core/Page';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { createStore } from '@core/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { storage, debounce, clone } from '@core/utils';
import { defaultState } from '@/redux/initialState';
// import { ActiveRoute } from '@core/routes/ActiveRoute';

function storageName(params) {
	return 'excel: ' + params;
}


export class ExcelPage extends Page {
	getRoot() {
		const params = this.params;
		const initialState = storage(storageName(params)) ?
			storage(storageName(params)) :
			clone(defaultState);
		const store = createStore(rootReducer, initialState);
		const stateListener = debounce(state => {
			storage(storageName(params), state);
		}, 300);

		store.subscribe(stateListener);

		this.excel = new Excel({
			components: [Header, Toolbar, Formula, Table],
			store
		});

		return this.excel.getRoot();
	}

	afterRender() {
		this.excel.init();
	}

	destroy() {
		this.excel.destroy();
	}
}