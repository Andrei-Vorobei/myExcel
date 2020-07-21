export class Emitter {
	constructor() {
		this.listeners = {};
	}

	emit(event, ...args) {
		if (!Array.isArray(this.listeners[event])) {
			return false;
		}
		this.listeners[event].forEach(listener => {
			listener(...args);
		});
		return true;
	}

	subscribe(event, fn) {
		this.listeners[event] = this.listeners[event] = [];
		this.listeners[event].push(fn);
		return () => {
			this.listeners[event] = this.listeners[event].filter(listener => listener !== fn);
		};
	}
}

// const emitter = new Emitter();

// const unsub = emitter.subscribe('Test', data => console.log('Sub', data));

// unsub();
// emitter.emit('Test', 42);
