import { ExcelComponent } from '@core/ExcelComponent';
import { changeTitle } from '@/redux/actions';
import { $ } from '@core/dom';
import { defaultTitle } from '@/constants';
import { debounce } from '@core/utils';
import { ActiveRoute } from '../../core/routes/ActiveRoute';

export class Header extends ExcelComponent {
	static className = 'excel__header'

	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input', 'click'],
			...options
		});
	}

	prepare() {
		this.onInput = debounce(this.onInput, 300);
	}

	toHTML() {
		const title = this.store.getState().title || defaultTitle;
		return `
			<input type="text" class="input" value="${title}">

			<div>

				<div class="button">
					<i class="material-icons" data-delete="true">delete</i>
				</div>

				<div class="button">
					<i class="material-icons" data-exit="true">exit_to_app</i>
				</div>

			</div>
		`;
	}

	onInput(event) {
		const $target = $(event.target);
		this.$dispatch(changeTitle($target.text()));
	}

	onClick(event) {
		const $target = $(event.target);
		if ($target.data.delete) {
			const decision = confirm('Удалить таблицу?');
			if (decision) {
				const key = ActiveRoute.module + ': ' + ActiveRoute.param;
				localStorage.removeItem(key);
				ActiveRoute.navigate('');
			}
		} else if ($target.data.exit) {
			ActiveRoute.navigate('');
		}
	}
}