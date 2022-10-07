import Command from "@ckeditor/ckeditor5-core/src/command";
import { BACKGROUND_COLOR } from "./constants";

export default class BackgroundColorCommand extends Command {
  constructor(editor) {
    super(editor);
  }

  refresh() {
    const model = this.editor.model;
    const doc = model.document;
    this.value = doc.selection.getAttribute(BACKGROUND_COLOR);
    this.isEnabled = model.schema.checkAttributeInSelection(
      doc.selection,
      BACKGROUND_COLOR
    );
  }

  execute({ paletteKey, color }) {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;
    const value = paletteKey || color;

    model.change((writer) => {
      if (selection.isCollapsed) {
        if (value) {
          writer.setSelectionAttribute(BACKGROUND_COLOR, value);
        } else {
          writer.removeSelectionAttribute(BACKGROUND_COLOR);
        }
      } else {
        const ranges = model.schema.getValidRanges(
          selection.getRanges(),
          BACKGROUND_COLOR
        );

        for (const range of ranges) {
          if (value) {
            writer.setAttribute(BACKGROUND_COLOR, value, range);
          } else {
            writer.removeAttribute(BACKGROUND_COLOR, range);
          }
        }
      }
    });
  }
}
