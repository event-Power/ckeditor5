import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  toWidget,
  toWidgetEditable,
} from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";
import InsertButtonLinkCommand from "./insertbuttonlinkcommand";

export default class ButtonLinkEditing extends Plugin {
    static get requires() {
      return [Widget];
    }
  init() {
    console.log("ButtonLinkEditing#init() got called");

    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      "insertButtonLink",
      new InsertButtonLinkCommand(this.editor)
    );
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register("buttonLink", {
      isObject: true,
      allowWhere: "$block",
    });
  }
  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for( 'upcast' ).elementToElement( {
      model: 'buttonLink',
      view: {
          name: 'button',
          classes: 'button-link'
      }
  } );
  conversion.for( 'dataDowncast' ).elementToElement( {
      model: 'buttonLink',
      view: {
          name: 'button',
          classes: 'button-link'
      }
  } );
  conversion.for( 'editingDowncast' ).elementToElement( {
      model: 'buttonLink',
      view: ( modelElement, { writer: viewWriter } ) => {
          const section = viewWriter.createContainerElement( 'button', { class: 'button-link' } );

          return toWidget( section, viewWriter, { label: 'simple box widget' } );
      }
  } );
  }
}
