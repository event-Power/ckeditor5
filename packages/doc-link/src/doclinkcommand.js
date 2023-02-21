import Command from '@ckeditor/ckeditor5-core/src/command';
import findAttributeRange from '@ckeditor/ckeditor5-typing/src/utils/findattributerange';
import getRangeText from './utils.js';
import { toMap } from '@ckeditor/ckeditor5-utils';

export default class DocLinkCommand extends Command {
	refresh () {
		const model = this.editor.model;
		const selection = model.document.selection;
		const firstRange = selection.getFirstRange();

		if ( firstRange.isCollapsed ) {
			if ( selection.hasAttribute( 'abbreviation' ) ) {
				const attributeValue = selection.getAttribute( 'abbreviation' );

				const abbreviationRange = findAttributeRange(
					selection.getFirstPosition(), 'abbreviation', attributeValue, model
				);

				this.value = {
					abbr: getRangeText( abbreviationRange ),
					title: attributeValue,
					range: abbreviationRange
				}
			}
			else {
				this.value = null;
			}
		}
		else {
			if ( selection.hasAttribute( 'abbreviation' ) ) {
				const attributeValue = selection.getAttribute( 'abbreviation' );

				const abbreviationRange = findAttributeRange(
					selection.getFirstPosition(), 'abbreviation', attributeValue, model
				);

				if ( abbreviationRange.containsRange( firstRange, true ) ) {
					this.value = {
						abbr: getRangeText( firstRange ),
						title: attributeValue,
						range: firstRange
					};
				}
				else {
					this.value = null;
				}
			}
		}

		this.isEnabled = model.schema.checkAttributeInSelection(
			selection, 'abbreviation'
		);
	}
	execute ( { title, abbr } ) {
		const model = this.editor.model;
		const selection = model.document.selection;

		model.change( writer => {
			if ( selection.isCollapsed ) {
				// model.insertContent(
				// 	writer.createText( abbr, { abbreviation: title } )
				// );
				if ( this.value ) {
					const { end: positionAfter } = model.insertContent(
						writer.createText( abbr, {abbreviation: title} ),
						this.value.range
					)

					writer.setSelection( positionAfter );
				}
				else if ( abbr !== '' ) {
					const firstPosition = selection.getFirstPosition();

					const attributes = toMap( selection.getAttributes() );

					attributes.set( 'abbreviation', title );

					const { end: positionAfter } = model.insertContent(
						writer.createText( abbr, attributes ), firstPosition
					)
					 writer.setSelection( positionAfter );
				}

				writer.removeSelectionAttribute( 'abbreviation' );
			}
			else {
				const ranges = model.schema.getValidRanges(
					selection.getRanges(), 'abbreviation'
				);

				for ( const range of ranges ) {
					writer.setAttribute( 'abbreviation', title, range );
				}
			}
		} )
	}
}
