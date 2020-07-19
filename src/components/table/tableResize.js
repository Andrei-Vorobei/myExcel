import {$} from '@core/dom';

export const resizeTable = ($root, event) => {
	const $resizer = $(event.target);
	const $parent = $resizer.closest('[data-type="resizable"]');
	const coords = $parent.getCoords();
	let value;

	if (event.target.dataset.resize === 'col') {
		$resizer.css({
			opacity: 1,
			bottom: '-5000px',
			width: '2px'
		});

		document.onmousemove = (e) => {
			const delta = e.pageX - coords.right;
			value = coords.width + delta;

			$resizer.css({
				left: value + 'px',
			});
		};

		document.onmouseup = () => {
			document.onmousemove = null;
			$root.findAll(`[data-col="${$parent.data.col}"]`)
				.forEach(cell => $(cell).css({
					'width': `${value}px`
				})
			);
			$resizer.css({
				opacity: '',
				bottom: '',
				left: '',
				width: ''
			});
		};
	} else if (event.target.dataset.resize === 'row') {
		$resizer.css({
			opacity: 1,
			right: '-5000px',
			height: '2px'
		});
		document.onmousemove = (e) => {
			const delta = e.pageY - coords.bottom;
			value = coords.height + delta;
			$resizer.css({
				top: value + 'px',
			});
		};
		document.onmouseup = () => {
			document.onmousemove = null;
			$parent.css({
				'height': `${value}px`,
			});
			$resizer.css({
				opacity: '',
				right: '',
				height: '',
				bottom: ''
			});
		};
	}
};