import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners);

		this.name = options.name || '';
		this.emitter = options.emitter;
		this.unsubs = [];

		this.prepare();
	}

	// Подготовка компонента к Иниту
	prepare() {}

	// Возвращает HTML шаблон компанента
	toHTML() {
		return '';
	}

	// Уведомление слушателя о событии
	$emit(event, ...args) {
		this.emitter.emit(event, ...args);
	}

	// Подписка на событие
	$on(event, fn) {
		const unsub = this.emitter.subscribe(event, fn);
		this.unsubs.push(unsub);
	}

	init() {
		this.initDomListeners();
	}

	destroy() {
		this.removeDOMListeners();
		this.unsubs.forEach(unsub => unsub());
	}
}