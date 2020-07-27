import { TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES, APPLY_STYLE, CHANGE_TITLE, } from './types';

export function rootReducer(state, action) {
	let stateValue;
	let stateField;
	let typeResize;
	// console.log('Action:', action);
	switch (action.type) {
		case TABLE_RESIZE:
			typeResize = action.data.typeResize;
			switch (typeResize) {
				case 'col':
					stateValue = state['colState'] || {};
					stateValue[action.data.id] = action.data.value;
					return {
						...state,
						colState: stateValue
					};
				case 'row':
					stateValue = state['rowState'] || {};
					stateValue[action.data.id] = action.data.value;
					return {
						...state,
						rowState: stateValue
					};
			}

		case CHANGE_TEXT:
			stateValue = state['dataState'] || {};
			stateValue[action.data.id] = action.data.value;
			return {
				...state,
				currentText: action.data.value,
				dataState: stateValue
			};

		case CHANGE_STYLES:
			return {
				...state,
				currentStyles: action.data
			};

		case APPLY_STYLE:
			stateField = 'stylesState';
			stateValue = state[stateField] || {};
			action.data.ids.forEach(id => {
				stateValue[id] = {...stateValue[id], ...action.data.value};
			});
			return {
				...state,
				[stateField]: stateValue,
				currentStyles: {
					...state.currentStyles,
					...action.data.value
				}
			};

		case CHANGE_TITLE:
			return {
				...state,
				title: action.data
			};

		default: return state;
	}
}