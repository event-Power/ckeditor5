import { BACKGROUND_COLOR } from './constants';
import fontBackgroundColorIcon from './theme/icons/font-background.svg';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ColorTableView from './ui/colortableview';
import { removeWhitespaceFromColor } from './utils';
import { createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

export default class BackgroundColorUI extends Plugin {
	constructor(editor) {
		super(editor);
		this.commandName = BACKGROUND_COLOR;
		this.componentName = BACKGROUND_COLOR;
	}

	static get pluginName() {
		return 'BackgroundColorUI';
	}

	init() {
		const editor = this.editor;
		//It is important for this function to be called t() - otherwise translations wont be added during build
		const t = editor.t;
		const backgroundColorCommand = editor.commands.get(this.commandName);
		const columns = editor.config.get(this.componentName).columns;
		const themeColors = editor.config
			.get(this.componentName)
			.themeColors.map(removeWhitespaceFromColor);
		const exactColors = editor.config
			.get(this.componentName)
			.exactColors.map(removeWhitespaceFromColor)
			.filter((ec) => !themeColors.find((tc) => tc.color === ec.color)); //Remove theme colors from exactColors array

		// Register the UI component.
		editor.ui.componentFactory.add(this.componentName, (locale) => {
			const dropdownView = createDropdown(locale);

			this.colorTableView = new ColorTableView(locale, {
				exactColors,
				themeColors,
				columns,
				closeButtonLabel: t('Select color'),
				removeButtonLabel: t('Remove color'),
				themeColorsLabel: t('Theme colors'),
				customColorLabel: t('Custom color'),
				exactColorsLabel: t('Exact colors'),
			});

			dropdownView.panelView.children.add(this.colorTableView);

			this.colorTableView.delegate('execute').to(dropdownView);
			this.colorTableView
				.bind('selectedColor')
				.to(backgroundColorCommand, 'value');

			dropdownView.buttonView.set({
				label: t('Background Color'),
				icon: fontBackgroundColorIcon,
				tooltip: true,
				// withText: true,
			});

			dropdownView.extendTemplate({
				attributes: {
					class: 'ck-color-ui-dropdown',
				},
			});

			dropdownView.bind('isEnabled').to(backgroundColorCommand);

			dropdownView.on('execute', (evt, data) => {
				const color = data.value;
				const themeColor = themeColors.find(
					(item) => item.color === color
				);
				const paletteKey = themeColor ? themeColor.paletteKey : null;
				editor.execute(this.commandName, { paletteKey, color });
				editor.editing.view.focus();
			});

			dropdownView.on('change:isOpen', (evt, name, isVisible) => {
				if (isVisible) {
					this.colorTableView.updateSelectedColors();
				}
			});

			return dropdownView;
		});
	}
}
