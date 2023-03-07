import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import fileIcon from '../theme/icons/browse-files.svg';
// import { ContextualBalloon, clickOutsideHandler} from '@ckeditor/ckeditor5-ui';
// import FormView from './doclinkview'
// import './styles.css';
// import getRangeText from './utils.js';

export default class FileLinkUI extends Plugin {
  static get requires() {
    return [];
  }

  init() {
    console.log( 'FileLinkUI was initialized.' );
    const editor = this.editor;

    // this._balloon = this.editor.plugins.get( ContextualBalloon );
    // this.formView = this._createFormView();

    editor.ui.componentFactory.add( 'fileLink', () => {
      const button = new ButtonView();

      button.set( {
        label: 'Insert file asset',
        tooltip: true,
        icon: fileIcon
      })

      this.listenTo( button, 'execute', () => {
        // this._showUI();
        const browserUrl = editor.config.get('fileBrowser').browserUrl;
        const galleryElement = editor.config.get('fileBrowser').browserElement;

        // modal(galleryElement);
        // i.e. 'http://localhost:3000/asset/editor_images/21BWI-ANNUAL'
        var processedUrl = '';
        if(browserUrl.includes('?')) {
          processedUrl = browserUrl + '&' + new URLSearchParams({browser_mode: 'file'});
        }
        else {
          processedUrl = browserUrl + '?' + new URLSearchParams({browser_mode: 'file'});
        }
        fetch(processedUrl).then(function (response) {
          // The API call was successful!
          return response.text();
        }).then(function (data) {
          // This is the JSON from our response
          // console.log(data);
          $(galleryElement).html(data);
          $(galleryElement).dialog({
            width: 800,
            height: 400
          });
        }).catch(function (err) {
          // There was an error
          console.warn('Something went wrong.', err);
        });

        $(document).off('click', '.open_button').on('click', '.open_button', function(e) {
          var selected_image = $('.editor_image_container.selected > .editor_image');

          console.log('Selected URL:', selected_image.attr('src'));
          if(selected_image.length == 0){
            $('.error').html('Please select an image');
            $('.error').show();
            setTimeout(function() { $('.error').fadeOut(500)}, 3000);
          }
          else {
            var selected_type = 'image';
            if (selected_image.data('file-type') != undefined && selected_image.data('file-type') != 'image') {
              selected_type = selected_image.data('file-type');
            }

            editor.model.change( writer => {
                if(selected_type == 'image' && asset_mode == 'image'){
                  const imageElement = writer.createElement( 'imageBlock', {
                      src: selected_image.attr('src')
                  } );

                  // Insert the image in the current selection location.
                  editor.model.insertContent( imageElement, editor.model.document.selection );
                }
                else {
                  const insertPosition = editor.model.document.selection.getFirstPosition();
                  // Remove height and width transformations
                  var new_url = selected_image.attr('src');
                  new_url = new_url.replace(/h_150/, '');
                  new_url = new_url.replace(/w_150/, '');
                  writer.insertText( ' ', insertPosition );
                  writer.insertText( 'File', { linkHref: new_url }, insertPosition );
                  writer.insertText( ' ', insertPosition );
                }
                $(galleryElement).dialog('close');
                editor.editing.view.focus();
            } );
          }


        })


        
      } )


        return button;
    } );
  }
}
