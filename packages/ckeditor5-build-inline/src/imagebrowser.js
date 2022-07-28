import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

export default class ImageBrowser extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add( 'imageBrowser', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Insert asset',
                icon: imageIcon,
                tooltip: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', () => {
              const browserUrl = editor.config.get('imageBrowser').browserUrl;
              const galleryElement = editor.config.get('imageBrowser').browserElement;

              // modal(galleryElement);
              // i.e. 'http://localhost:3000/asset/editor_images/21BWI-ANNUAL'
              fetch(browserUrl).then(function (response) {
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
                      if(selected_type == 'image'){
                        const imageElement = writer.createElement( 'imageBlock', {
                            src: selected_image.attr('src')
                        } );

                        // Insert the image in the current selection location.
                        editor.model.insertContent( imageElement, editor.model.document.selection );
                      }
                      else {
                        const insertPosition = editor.model.document.selection.getFirstPosition();
                        writer.insertText( 'Click Here', { linkHref: selected_image.attr('src') }, insertPosition );
                      }
                      $(galleryElement).dialog('close');
                      editor.editing.view.focus();
                  } );
                }


              })

            } );

            return view;
        } );
    }
}
