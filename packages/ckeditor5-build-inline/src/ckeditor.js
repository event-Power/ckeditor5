/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import InlineEditorBase from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor';

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage';
import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import HtmlEmbed from '@ckeditor/ckeditor5-html-embed/src/htmlembed';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import Title from '@ckeditor/ckeditor5-heading/src/title';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount';

// Custom plugins
import FontColor from '../../colorpicker/fontcolor';
import BackgroundColor from '../../backgroundcolorpicker/backgroundcolor';
// import DocLink from '../../doc-link/src/doclink';
import FileLink from '../../filelink/src/filelink';

import ImageBrowser from './imagebrowser.js';

class ClassicEditor extends ClassicEditorBase {}
class InlineEditor extends InlineEditorBase {}

const plugins = [
  Alignment,
  Autoformat,
  AutoImage,
  Autosave,
	Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FileLink,
  FontSize,
	UploadAdapter,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
	CKFinder,
	CloudServices,
	Heading,
  HorizontalLine,
  HtmlEmbed,
  GeneralHtmlSupport,
	Image,
	ImageCaption,
  ImageInsert,
  ImageResize,
	ImageStyle,
  ImageToolbar,
	ImageUpload,
  ImageBrowser,
	Indent,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
  RemoveFormat,
  SourceEditing,
  Subscript,
  Superscript,
	Table,
	TableToolbar,
	TextTransformation,
  // Title,
  Underline,
  WordCount,
  FontColor,
	BackgroundColor
];

// Plugins to include in the build.
ClassicEditor.builtinPlugins = plugins;
InlineEditor.builtinPlugins = plugins;

const config = {
  toolbar: {
    items: [
      'heading',
      'fontSize',
      'fontFamily',
      '|',
      'bold',
      'italic',
      'underline',
      'link',
      'bulletedList',
      'numberedList',
      'backgroundColor',
      'fontColor',
      'removeFormat',
      '|',
      'outdent',
      'indent',
      '|',
      '-',
      // 'imageUpload',
      'imageInsert',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
      'horizontalLine',
      'htmlEmbed',
      'sourceEditing',
      'imageBrowser',
      'fileLink',
    ],
    shouldNotGroupWhenFull: true
  },
  language: 'en',
  image: {
    toolbar: [
      'imageStyle:block',
      'imageStyle:inline',
      'imageStyle:side',
      'imageTextAlternative',
      'toggleImageCaption'
    ]
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells'
    ]
  }
};

// Editor configuration.
ClassicEditor.defaultConfig = config
InlineEditor.defaultConfig = config

export default {
    ClassicEditor, InlineEditor
};
