/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module ui/dropdown/helpers/addtoolbartodropdown
 */

import ToolbarView from '../../toolbar/toolbarview';

import '../../../theme/components/dropdown/toolbardropdown.css';

/**
 * Creates an instance of {@link module:ui/dropdown/button/buttondropdownview~ButtonDropdownView} class using
 * a provided {@link module:ui/dropdown/button/buttondropdownmodel~ButtonDropdownModel}.
 *
 *		const buttons = [];
 *
 *		buttons.push( new ButtonView() );
 *		buttons.push( editor.ui.componentFactory.get( 'someButton' ) );
 *
 *		const model = new Model( {
 *			label: 'A button dropdown',
 *			isVertical: true,
 *			buttons
 *		} );
 *
 *		const dropdown = createButtonDropdown( model, locale );
 *
 *		// Will render a vertical button dropdown labeled "A button dropdown"
 *		// with a button group in the panel containing two buttons.
 *		dropdown.render()
 *		document.body.appendChild( dropdown.element );
 *
 * The model instance remains in control of the dropdown after it has been created. E.g. changes to the
 * {@link module:ui/dropdown/dropdownmodel~DropdownModel#label `model.label`} will be reflected in the
 * dropdown button's {@link module:ui/button/buttonview~ButtonView#label} attribute and in DOM.
 *
 * See {@link module:ui/dropdown/createdropdown~createDropdown}.
 *
 * @param {module:ui/dropdown/button/buttondropdownmodel~ButtonDropdownModel} model Model of the list dropdown.
 * @param {module:utils/locale~Locale} locale The locale instance.
 * @returns {module:ui/dropdown/button/buttondropdownview~ButtonDropdownView} The button dropdown view instance.
 * @returns {module:ui/dropdown/dropdownview~DropdownView}
 */
export default function addToolbarToDropdown( dropdownView, model ) {
	const toolbarView = dropdownView.toolbarView = new ToolbarView();

	toolbarView.bind( 'isVertical' ).to( model, 'isVertical' );

	dropdownView.extendTemplate( {
		attributes: {
			class: [ 'ck-toolbar-dropdown' ]
		}
	} );

	dropdownView.panelView.children.add( toolbarView );

	// TODO: make it as 'items', 'views' or pass them as parameter???
	model.buttons.map( view => toolbarView.items.add( view ) );

	return toolbarView;
}
