import DocLinkUI from './doclinkui';
import DocLinkEditing from './doclinkediting';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class DocLink extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [DocLinkUI, DocLinkEditing];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'DocLink';
	}

  init() {
    console.log( 'DocLink was initialized.' );
  }
}
