import { defaultStyles, defaultTitle } from '@/constants';

export const defaultState = {
	title: defaultTitle,
	rowState: {},
	colState: {},
	dataState: {},
	stylesState: {},
	currentText: '',
	currentStyles: defaultStyles,
	createDate: new Date().toJSON(),
	openedDate: new Date().toJSON()
};