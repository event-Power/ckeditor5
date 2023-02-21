import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileLinkCommand from './filelinkcommand';

export default class FileLinkEditing extends Plugin {
  init() {
    console.log( 'FileLinkEditing was initialized.' );
    this.__defineSchema();
    this.__defineConverters();

    this.editor.commands.add(
      'insertFileLink', new FileLinkCommand( this.editor )
    );
  }
  __defineSchema() {											// ADDED
    const schema = this.editor.model.schema;

    // Extend the text node's schema to accept the abbreviation attribute.
    schema.extend( '$text', {
        allowAttributes: [ 'filelink' ]
    } );
  }
  __defineConverters() {									// ADDED
    const conversion = this.editor.conversion;

    // Conversion from a model attribute to a view element.
    conversion.for( 'downcast' ).attributeToElement( {
        model: 'filelink',
        // Callback function provides access to the model attribute value
        // and the DowncastWriter.
        view: ( modelAttributeValue, conversionApi ) => {
            const { writer } = conversionApi;

            return writer.createAttributeElement( 'abbr', {
                title: modelAttributeValue
            } );
        }
    } );
    conversion.for( 'upcast' ).elementToAttribute( {
        view: {
            name: 'abbr',
            attributes: [ 'title' ]
        },
        model: {
            key: 'abbreviation',
            // Callback function provides access to the view element.
            value: viewElement => {
                const title = viewElement.getAttribute( 'title' );

                return title;
            }
        }
    } );
  }
}



