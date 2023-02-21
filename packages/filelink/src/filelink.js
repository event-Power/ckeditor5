import FileLinkUI from './filelinkui';
// import FileLinkEditing from './filelinkediting';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class FileLink extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [FileLinkUI];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'FileLink';
	}

  init() {
    console.log( 'FileLink was initialized.' );
  }
}
